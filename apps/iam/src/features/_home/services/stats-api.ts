import { BaseApiClient } from "@workspace/shared";
import { IamStatsDto } from "../types/stats.types";

class StatsApi extends BaseApiClient {
  constructor() {
    super("http://localhost:9080/api/iam/v1");
  }

  getStats() {
    return this.get<IamStatsDto>("/iam/stats");
  }
}

export const statsApi = new StatsApi();
