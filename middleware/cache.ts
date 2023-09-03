import type { BunFile } from "bun";
import fs from "fs/promises";
import type { Handler } from "hono";

type SerializableResponse = {
  body: string;
  headers: Record<string, string>;
  status: number;
  statusText: string;
};

// TODO: Use c.get("REWRITE")

export const cachePurgeHandler: Handler = async ({ req }) => {
  if (req.headers.get("Authorization") !== `Bearer ${Bun.env.PURGE_TOKEN}`) {
    console.log("🛑 Purge request rejected for", req.url);
    return new Response(null, { status: 403 });
  }
  console.log("🔥 Purge request accepted for", req.url);
  await purgeCache(req.raw);
  return new Response(null, { status: 200 });
};

export const cacheResponseHandler: Handler = async ({ req }) =>
  await getResponse(req.raw);

const purgeCache = async (request: Request): Promise<void> => {
  const url = new URL(request.url);
  if (url.pathname.endsWith("/*")) {
    const pathnameWithoutWildcard = url.pathname.slice(0, -2);
    await fs.rm(getFolderPath(pathnameWithoutWildcard), {
      recursive: true,
      force: true,
    });
  } else {
    await fs.rm(getFilePath(url.pathname), { force: true });
  }
};

const getResponse = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const file = Bun.file(getFilePath(url.pathname));
  let serializableResponse;
  if (fileExists(file)) {
    serializableResponse = await file.json<SerializableResponse>();
    console.log("🟢 Retrieved response from cache for", request.url);
  } else {
    serializableResponse = await createCache(request);
    console.log("🟠 Generated response for", request.url);
  }
  const { body, headers, status, statusText } = serializableResponse;
  return new Response(body, { headers, status, statusText });
};

const createCache = async (request: Request): Promise<SerializableResponse> => {
  const url = new URL(request.url);
  const response = await fetch(
    `http://${Bun.env.ASTRO_HOST}:${Bun.env.ASTRO_PORT}${url.pathname}${url.search}`
  );
  const serializableReponse: SerializableResponse = {
    body: await response.text(),
    headers: Object.fromEntries(response.headers.entries()),
    status: response.status,
    statusText: response.statusText,
  };
  // Only save cache is status is ok
  if (response.ok) {
    await fs.mkdir(getFolderPath(url.pathname), { recursive: true });
    await Bun.write(
      getFilePath(url.pathname),
      JSON.stringify(serializableReponse)
    );
  }
  return serializableReponse;
};

const fileExists = (file: BunFile): boolean => file.size > 0;

const getFolderPath = (pathname: string): string => `./cache${pathname}`;

const getFilePath = (pathname: string): string =>
  `${getFolderPath(pathname)}/index.res`;
