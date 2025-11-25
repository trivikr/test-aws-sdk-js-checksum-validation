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
const response = await client.getObject({ Bucket, Key });
await response.Body.transformToString();

document.querySelector("#app").innerHTML = `
  <h1>Open Browser Console</h1>

  <p>Open console tab, and look for 'Data size'</p>
`;
