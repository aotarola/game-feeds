import adaptor from "./adaptors/gfn/mod.ts";
import { sendNotification as notify } from "./lib/telegram.ts";
import requestCache from "./cache.ts";

await Promise.allSettled(
  [adaptor].map(async (adaptor) =>
    adaptor.run({ notify, cache: await requestCache() })
  ),
);
