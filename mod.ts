import Telegram from "./lib/telegram.ts";
import requestCache from "./cache.ts";
import { Adaptor } from "./interfaces.ts";

const adaptors: Array<Adaptor> = [];

for await (
  const key of Deno.readDir("/Users/aotarola/dev/games-feed/adaptors")
) {
  if (key.isDirectory) {
    adaptors.push(
      (await import(
        `/Users/aotarola/dev/games-feed/adaptors/${key.name}/mod.ts`
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
