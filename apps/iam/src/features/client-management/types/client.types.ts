export interface ClientDto {
  id: string;
  clientId: string;
  name: string;
  description: string;
  enabled: boolean;
  publicClient: boolean;
  protocol: string;
  rootUrl: string;
  redirectUris: string[];
  webOrigins: string[];
  standardFlowEnabled: boolean;
  directAccessGrantsEnabled: boolean;
  activeSessionCount?: number;
}
