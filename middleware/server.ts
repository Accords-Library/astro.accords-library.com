import { Hono } from "hono";
import { cachePurgeHandler, cacheResponseHandler } from "./cache";
import { langRewriteHandler } from "./lang";

const app = new Hono();

const USE_CACHE = false;

app.use("*", langRewriteHandler);

if (USE_CACHE) {
  app.on("PURGE", "*", cachePurgeHandler);
  app.on("GET", "*", cacheResponseHandler);
} else {
  app.use("*", async (c) => {
    const url = new URL(c.get("REWRITE" as never));
    const rewriteUrl = `http://${Bun.env.ASTRO_HOST}:${Bun.env.ASTRO_PORT}${url.pathname}${url.search}`;
    console.log("🔵 Rewrote", c.req.url, "to", rewriteUrl);
    return await fetch(rewriteUrl);
  });
}

const server = Bun.serve({
  port: parseInt(Bun.env.MIDDLEWARE_PORT ?? "8000"),
  fetch: app.fetch,
});
console.log(`👂 Listening on http://${server.hostname}:${server.port}`);
