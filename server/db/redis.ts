import { createClient } from "redis";
import { Post } from "@prisma/client";

const redisClient = createClient();

export async function getRedisCache() {
  await redisClient.connect();

  const cache = await redisClient.get("posts_published");

  await redisClient.disconnect();

  return cache;
}

export async function initializePublishedPostCache(posts: Post[]) {
  await redisClient.connect();

  const publishedPosts = posts.filter((p) => p.published);

  await redisClient.set("posts_published", JSON.stringify(publishedPosts));

  console.log(`💾 startup: posts cached in redis`);

  await redisClient.disconnect();
}

export { redisClient };
