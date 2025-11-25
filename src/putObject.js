import { S3 } from "@aws-sdk/client-s3"; // v3.939.0

const region = process.env.VITE_REGION;
const client = new S3({ region });

const Bucket = process.env.VITE_BUCKET;
const Key = process.env.VITE_KEY;
const Body = Array(1024 * 1024) // 1 MB file
  .fill(0)
  .map(() => String.fromCharCode(65 + Math.random() * 26))
  .join("");

await client.putObject({ Bucket, Key, Body });
