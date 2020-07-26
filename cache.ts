import { connect, Redis } from "https://denopkg.com/keroxp/deno-redis/mod.ts";
import { Cache } from "./interfaces.ts";

let REDIS_HOST = Deno.env.get("REDIS_HOST") || "127.0.0.1";
let REDIS_PORT = Deno.env.get("REDIS_PORT") || 6379;
let REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD");
const REDIS_URL = Deno.env.get("REDIS_URL");

if (REDIS_URL) {
  const { hostname, port, password } = new URL(REDIS_URL);
  REDIS_HOST = hostname;
  REDIS_PORT = port;
  REDIS_PASSWORD = password;
}

class RedisCache implements Cache {
  private client: Redis;
  constructor(client: Redis) {
    this.client = client;
  }

  static async build() {
    const client = await connect({
      hostname: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    });
    return new RedisCache(client);
  }

  get(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: string) {
    return this.client.set(key, value);
  }
}

export default async function () {
  try {
    return await RedisCache.build();
  } catch (err) {
    console.log("Could not connect to redis", err);
  }
}
