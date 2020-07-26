import Telegram from "./lib/telegram.ts";
import requestCache from "./cache.ts";
import { Adaptor } from "./interfaces.ts";
import { path } from "./deps.ts";

async function main() {
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
}

await main();
