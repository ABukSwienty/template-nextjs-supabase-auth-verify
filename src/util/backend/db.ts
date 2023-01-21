import { PrismaClient } from "@prisma/client";

let client: PrismaClient;

export const getDBClient = () => {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
};
