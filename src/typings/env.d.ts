/// <reference path="../../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // ASTRO
  ASTRO_HOST: string;
  ASTRO_PORT: number;

  // PAYLOAD
  PAYLOAD_API_URL: string;
  PAYLOAD_USER: string;
  PAYLOAD_PASSWORD: string;

  // MIDDLEWARE
  MIDDLEWARE_PORT: number;
  PURGE_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
