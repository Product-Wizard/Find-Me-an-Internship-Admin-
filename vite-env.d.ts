/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_BASE_URL: string;
  // add other variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}