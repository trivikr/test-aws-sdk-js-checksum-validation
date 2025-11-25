import { S3 } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentity } from "@aws-sdk/client-cognito-identity";

const region = import.meta.env.VITE_REGION;
const client = new S3({
  region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentity({ region }),
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
  }),
});

const Bucket = import.meta.env.VITE_BUCKET;
const Key = import.meta.env.VITE_KEY;
await client.getObject({ Bucket, Key });

document.querySelector("#app").innerHTML = `
  <h1>Open Browser Console</h1>

  <p>In the network tab, examine the second request with name '/foo?x-id=GetObject'</p>
  <p>Note that the value for 'access-control-expose-headers' is 'ETag'</p>
  <p>Although 'x-amz-checksum-crc32' is present, it's not available to AWS SDK for JavaScript as it's blocked by CORS</p>
`;
