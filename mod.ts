// import adaptor from "./adaptors/gfn/mod.ts";
import { sendNotification as notify } from "./lib/telegram.ts";
import requestCache from "./cache.ts";

const adaptors = [];
for await (
  const key of Deno.readDir("/Users/aotarola/dev/games-feed/adaptors")
) {
  if (key.isDirectory) {
    adaptors.push(
      await import(
        `/Users/aotarola/dev/games-feed/adaptors/${key.name}/mod.ts`
      ),
    );
  }
}

await Promise.allSettled(
  adaptors.map(async (adaptor) => {
    adaptor.run({ notify, cache: await requestCache() });
  }),
);
