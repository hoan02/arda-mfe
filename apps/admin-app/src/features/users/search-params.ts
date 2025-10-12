import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

const USER_STATUSES = ["ACTIVE", "INACTIVE", "PENDING", "SUSPENDED"] as const;
const USER_ROLES = ["USER", "MANAGER", "ADMIN", "SUPER_ADMIN"] as const;

export const searchParamsParser = {
  search: parseAsString,
  status: parseAsArrayOf(parseAsStringLiteral(USER_STATUSES), ","),
  role: parseAsArrayOf(parseAsStringLiteral(USER_ROLES), ","),
  emailVerified: parseAsArrayOf(parseAsBoolean, ","),
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
  live: parseAsBoolean.withDefault(false),
};