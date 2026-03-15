import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSignedAudioUrl } from "@/lib/r2";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing 'key' parameter" }, { status: 400 });
  }

  // Verify the key belongs to this user
  if (!key.startsWith(`generations/${session.user.id}/`) && !key.startsWith(`voice-samples/${session.user.id}/`)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const signedUrl = await getSignedAudioUrl(key);
    return NextResponse.redirect(signedUrl);
  } catch {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }
}
