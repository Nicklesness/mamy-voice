import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;

export async function uploadAudio(
  key: string,
  body: Uint8Array,
  contentType = "audio/mpeg"
): Promise<void> {
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function getSignedAudioUrl(
  key: string,
  expiresIn = 86400 // 24 hours
): Promise<string> {
  return getSignedUrl(
    r2,
    new GetObjectCommand({ Bucket: BUCKET, Key: key }),
    { expiresIn }
  );
}

// Key helpers
export function generationKey(userId: string, bookId: string, voiceId: string) {
  return `generations/${userId}/${bookId}-${voiceId}.mp3`;
}

export function voiceSampleKey(userId: string, voiceId: string) {
  return `voice-samples/${userId}/${voiceId}.webm`;
}
