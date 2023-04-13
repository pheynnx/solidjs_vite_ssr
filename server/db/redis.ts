import { createClient } from "redis";

const redisClient = createClient();

export async function getRedisCache() {
  await redisClient.connect();

  const cache = await redisClient.get("cache");

  await redisClient.disconnect();

  return cache;
}

export { redisClient };
