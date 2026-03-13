import { NextRequest, NextResponse } from "next/server";
import { checkVoice, ElevenLabsError } from "@/lib/elevenlabs";

export async function GET(request: NextRequest) {
  try {
    const voiceId = request.nextUrl.searchParams.get("voice_id");

    if (!voiceId || voiceId.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing 'voice_id' query parameter." },
        { status: 400 }
      );
    }

    const voiceInfo = await checkVoice(voiceId);

    if (!voiceInfo) {
      return NextResponse.json({ exists: false, name: null });
    }

    return NextResponse.json({ exists: true, name: voiceInfo.name });
  } catch (error) {
    if (error instanceof ElevenLabsError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode === 429 ? 429 : 502 }
      );
    }

    console.error("Voice status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
