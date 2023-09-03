import { writeFileSync } from "fs";

const PAYLOAD_FOLDER = `${process.cwd()}/src/shared/payload`;

const sdk = await fetch(`${process.env.PAYLOAD_API_URL}/sdk`);
const sdkFile = await sdk.text();
writeFileSync(`${PAYLOAD_FOLDER}/payload-sdk.ts`, sdkFile, {
  encoding: "utf-8",
});
