import { BaseApiClient } from "@workspace/shared";
import { ClientDto } from "../types/client.types";

class ClientApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  listClients() {
    return this.get<ClientDto[]>("/clients");
  }

  getClient(id: string) {
    return this.get<ClientDto>(`/clients/${id}`);
  }
}

export const clientApi = new ClientApi();
