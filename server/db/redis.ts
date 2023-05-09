import chalk from "chalk";
import Redis from "ioredis";

import { Post } from "@prisma/client";

const redisClient = new Redis();

redisClient.on("error", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.log(
      chalk.red("💾 [redis][startup]: is the redis server not running?")
    );
    process.exit(1);
  }
});

export async function getRedisCache() {
  const cache = await redisClient.get("posts_published");

  return cache;
}

export async function initializePublishedPostCache(posts: Post[]) {
  const publishedPosts = posts.filter((p) => p.published);

  await redisClient.set("posts_published", JSON.stringify(publishedPosts));

  console.log(chalk.green(`💾 [redis][startup]: posts cached in redis`));
}

export { redisClient };
