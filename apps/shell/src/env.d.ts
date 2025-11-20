export { };

declare global {
  interface ImportMetaEnv {
    readonly ADMIN_APP_URL?: string;
    readonly DATA_GOVERNANCE_APP_URL?: string;
    readonly [key: string]: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

