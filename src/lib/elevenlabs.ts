const API_BASE = "https://api.elevenlabs.io/v1";

function getApiKey(): string {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new Error("ELEVENLABS_API_KEY is not set");
  }
  return key;
}

function headers(): Record<string, string> {
  return {
    "xi-api-key": getApiKey(),
  };
}

export interface CloneVoiceResult {
  voice_id: string;
}

export interface VoiceInfo {
  voice_id: string;
  name: string;
}

/**
 * Clone a voice using ElevenLabs Instant Voice Cloning.
 * Accepts an audio Blob (from FormData upload).
 */
export async function cloneVoice(
  audioFile: File | Blob,
  name: string
): Promise<CloneVoiceResult> {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("files", audioFile);

  const response = await fetch(`${API_BASE}/voices/add`, {
    method: "POST",
    headers: {
      "xi-api-key": getApiKey(),
    },
    body: formData,
  });

  if (response.status === 429) {
    throw new ElevenLabsError("Rate limit exceeded. Please try again later.", 429);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ElevenLabsError(
      `Voice cloning failed: ${errorBody}`,
      response.status
    );
  }

  const data = await response.json();
  return { voice_id: data.voice_id };
}

/**
 * Check if a voice exists in ElevenLabs.
 */
export async function checkVoice(
  voiceId: string
): Promise<VoiceInfo | null> {
  const response = await fetch(`${API_BASE}/voices/${voiceId}`, {
    method: "GET",
    headers: headers(),
  });

  if (response.status === 404) {
    return null;
  }

  if (response.status === 429) {
    throw new ElevenLabsError("Rate limit exceeded. Please try again later.", 429);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ElevenLabsError(
      `Voice check failed: ${errorBody}`,
      response.status
    );
  }

  const data = await response.json();
  return {
    voice_id: data.voice_id,
    name: data.name,
  };
}

/**
 * Generate speech from text using a cloned voice.
 * Returns the audio as an ArrayBuffer (MP3).
 */
export async function generateSpeech(
  text: string,
  voiceId: string
): Promise<ArrayBuffer> {
  const response = await fetch(`${API_BASE}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      ...headers(),
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
    }),
  });

  if (response.status === 429) {
    throw new ElevenLabsError("Rate limit exceeded. Please try again later.", 429);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ElevenLabsError(
      `Speech generation failed: ${errorBody}`,
      response.status
    );
  }

  return response.arrayBuffer();
}

/**
 * Delete a voice from ElevenLabs.
 */
export async function deleteVoice(voiceId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/voices/${voiceId}`, {
    method: "DELETE",
    headers: headers(),
  });

  if (response.status === 429) {
    throw new ElevenLabsError("Rate limit exceeded. Please try again later.", 429);
  }

  if (!response.ok && response.status !== 404) {
    const errorBody = await response.text();
    throw new ElevenLabsError(
      `Voice deletion failed: ${errorBody}`,
      response.status
    );
  }
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

    // Find the last sentence boundary within maxLength
    const slice = remaining.slice(0, maxLength);
    let splitIndex = -1;

    // Try to split at period, exclamation, or question mark followed by space/newline
    for (let i = slice.length - 1; i >= maxLength / 2; i--) {
      if (
        (slice[i] === "." || slice[i] === "!" || slice[i] === "?") &&
        (i + 1 >= slice.length || slice[i + 1] === " " || slice[i + 1] === "\n")
      ) {
        splitIndex = i + 1;
        break;
      }
    }

    // Fall back to splitting at newline
    if (splitIndex === -1) {
      const lastNewline = slice.lastIndexOf("\n");
      if (lastNewline > maxLength / 2) {
        splitIndex = lastNewline + 1;
      }
    }

    // Fall back to splitting at space
    if (splitIndex === -1) {
      const lastSpace = slice.lastIndexOf(" ");
      if (lastSpace > maxLength / 2) {
        splitIndex = lastSpace + 1;
      }
    }

    // Last resort: hard split
    if (splitIndex === -1) {
      splitIndex = maxLength;
    }

    chunks.push(remaining.slice(0, splitIndex).trim());
    remaining = remaining.slice(splitIndex).trim();
  }

  return chunks;
}

export class ElevenLabsError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ElevenLabsError";
    this.statusCode = statusCode;
  }
}
