import { BaseApiClient } from "@workspace/shared";
import { SessionDto } from "../types/session.types";

class SessionApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  listSessions() {
    return this.get<SessionDto[]>("/sessions");
  }

  terminateSession(sessionId: string) {
    return this.delete(`/sessions/${sessionId}`);
  }
}

export const sessionApi = new SessionApi();
