import { NextRequest, NextResponse } from "next/server";
import { deleteVoice, ElevenLabsError } from "@/lib/elevenlabs";

export async function DELETE(request: NextRequest) {
  try {
    const voiceId = request.nextUrl.searchParams.get("voice_id");

    if (!voiceId || voiceId.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing 'voice_id' query parameter." },
        { status: 400 }
      );
    }

    await deleteVoice(voiceId);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ElevenLabsError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode === 429 ? 429 : 502 }
      );
    }

    console.error("Voice delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
