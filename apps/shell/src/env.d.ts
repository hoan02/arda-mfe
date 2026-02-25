export { };

declare global {
  interface ImportMetaEnv {
    readonly IAM_APP_URL?: string;
    readonly [key: string]: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

