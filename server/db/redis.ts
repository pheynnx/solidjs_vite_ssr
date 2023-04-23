import { createClient } from "redis";
import { Post } from "@prisma/client";

const redisClient = createClient();

redisClient.on("error", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.log("💾[redis][startup]: is the redis server not running?");
    process.exit(1);
  }
});

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

  console.log(`💾[redis][startup]: posts cached in redis`);

  await redisClient.disconnect();
}

export { redisClient };
