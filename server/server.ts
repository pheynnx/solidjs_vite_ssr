import express, { Router } from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr/server";
import { root } from "./root.ts";
import { prisma } from "./db/prisma.ts";
import { redisClient } from "./db/redis.ts";
import adminApiRouter from "./routers/api/admin.ts";

const isProduction = process.env.NODE_ENV === "production";

async function startServer() {
  const posts = await prisma.post.findMany();
  await redisClient.connect();
  await redisClient.set("cache", JSON.stringify(posts));
  console.log(`💾 startup: posts cached in redis`);
  await redisClient.disconnect();

  const app = express();

  app.use(compression());

  app.use("/api/admin", adminApiRouter);

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    // pass custom http values to renderPage()
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headers: req.headers,
    };

    const pageContext = await renderPage(pageContextInit);

    // if (pageContext.redirectTo) {
    //   return res.redirect(307, pageContext.redirectTo);
    // }

    const { httpResponse } = pageContext;

    if (!httpResponse) return next();

    const { statusCode, contentType } = httpResponse;

    res.status(statusCode).type(contentType);

    httpResponse.pipe(res);
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`🔶 startup: listening on http://localhost:${port}`);
}

startServer();
