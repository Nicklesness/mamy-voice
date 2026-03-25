const API_BASE = "https://api.voicv.com/v1";

function getApiKey(): string {
  const key = process.env.VOICV_API_KEY;
  if (!key) {
    throw new Error("VOICV_API_KEY is not set");
  }
  return key;
}

export interface CloneVoiceResult {
  voice_id: string;
}

export interface VoiceInfo {
  voice_id: string;
}

/**
 * Clone a voice using Voicv API.
 * Accepts audio file(s) (MP3, WAV).
 */
export async function cloneVoice(
  audioFiles: (File | Blob)[] | File | Blob,
): Promise<CloneVoiceResult> {
  const files = Array.isArray(audioFiles) ? audioFiles : [audioFiles];

  // Voicv accepts single file — use the first one
  const formData = new FormData();
  formData.append("voice", files[0]);

  const response = await fetch(`${API_BASE}/voice-clone`, {
    method: "POST",
    headers: {
      "x-api-key": getApiKey(),
    },
    body: formData,
  });

  if (response.status === 429) {
    throw new VoicvError("Rate limit exceeded. Please try again later.", 429);
  }

  const json = await response.json().catch(() => null);

  if (!response.ok || (json && json.code !== 200)) {
    const code = json?.code || response.status;
    if (code === 402) {
      throw new VoicvError("Voice service temporarily unavailable. Please try again later.", 402);
    }
    const message = json?.message || `Voice cloning failed (${code})`;
    throw new VoicvError(message, code);
  }

  if (!json?.data?.voiceId) {
    throw new VoicvError("Unexpected response from voice service", 502);
  }

  return { voice_id: json.data.voiceId };
}

/**
 * Generate speech from text using a cloned voice.
 * Downloads the audio and returns it as an ArrayBuffer (MP3).
 */
export async function generateSpeech(
  text: string,
  voiceId: string
): Promise<ArrayBuffer> {
  const response = await fetch(`${API_BASE}/tts`, {
    method: "POST",
    headers: {
      "x-api-key": getApiKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      voiceId,
      text,
      format: "mp3",
    }),
  });

  if (response.status === 429) {
    throw new VoicvError("Rate limit exceeded. Please try again later.", 429);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new VoicvError(
      `Speech generation failed: ${errorBody}`,
      response.status
    );
  }

  const json = await response.json();
  if (json.code !== 200) {
    throw new VoicvError(json.message || "Speech generation failed", json.code);
  }

  // Download the audio file from the returned URL
  const audioResponse = await fetch(json.data.audioUrl);
  if (!audioResponse.ok) {
    throw new VoicvError("Failed to download generated audio", 502);
  }

  return audioResponse.arrayBuffer();
}

/**
 * Split text into chunks of max `maxLength` characters,
 * trying to break at sentence boundaries.
 */
export function splitText(text: string, maxLength: number = 5000): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }

    const slice = remaining.slice(0, maxLength);
    let splitIndex = -1;

    for (let i = slice.length - 1; i >= maxLength / 2; i--) {
      if (
        (slice[i] === "." || slice[i] === "!" || slice[i] === "?") &&
        (i + 1 >= slice.length || slice[i + 1] === " " || slice[i + 1] === "\n")
      ) {
        splitIndex = i + 1;
        break;
      }
    }

    if (splitIndex === -1) {
      const lastNewline = slice.lastIndexOf("\n");
      if (lastNewline > maxLength / 2) {
        splitIndex = lastNewline + 1;
      }
    }

    if (splitIndex === -1) {
      const lastSpace = slice.lastIndexOf(" ");
      if (lastSpace > maxLength / 2) {
        splitIndex = lastSpace + 1;
      }
    }

    if (splitIndex === -1) {
      splitIndex = maxLength;
    }

    chunks.push(remaining.slice(0, splitIndex).trim());
    remaining = remaining.slice(splitIndex).trim();
  }

  return chunks;
}

export class VoicvError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "VoicvError";
    this.statusCode = statusCode;
  }
}
