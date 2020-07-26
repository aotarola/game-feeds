import Telegram from "./lib/telegram.ts";
import requestCache from "./cache.ts";
import { Adaptor } from "./interfaces.ts";
import * as path from "https://deno.land/std@0.62.0/path/mod.ts";

const __filename = path.fromFileUrl(import.meta.url);

const adaptors: Array<Adaptor> = [];
const ADAPTOR_PATH = path.join(`${__filename}`, "..", "adaptors");
for await (
  const key of Deno.readDir(ADAPTOR_PATH)
) {
  if (key.isDirectory) {
    adaptors.push(
      (await import(
        path.join(ADAPTOR_PATH, key.name, "mod.ts")
      )).run,
    );
  }
}

await Promise.allSettled(
  adaptors.map(async (run) => {
    const telegram = Telegram.build(fetch);
    run(
      {
        notify: telegram.sendNotification.bind(telegram),
        cache: await requestCache(),
      },
    );
  }),
);
