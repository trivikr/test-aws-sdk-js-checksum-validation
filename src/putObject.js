import { S3 } from "@aws-sdk/client-s3"; // v3.939.0

const region = process.env.VITE_REGION;
const client = new S3({ region });

const Bucket = process.env.VITE_BUCKET;
const Key = process.env.VITE_KEY;
const Body = "bar";

await client.putObject({ Bucket, Key, Body });
