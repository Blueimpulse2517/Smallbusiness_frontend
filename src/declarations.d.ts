// src/declarations.d.ts
declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.svg';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}