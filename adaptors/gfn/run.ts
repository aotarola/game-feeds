import "https://deno.land/x/dotenv/load.ts";
import jsdom from "https://dev.jspm.io/jsdom";
import { extractData, getNewestData } from "./extractor.ts";
import { formatMessage } from "./utils.ts";
import { Adaptor } from "../../interfaces.ts";

const GFN_URL = "https://geforcenow-games.com/en/changelog";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

export const run: Adaptor = async (
  { cache, notify },
): Promise<string | undefined> => {
  const response = await fetch(
    GFN_URL,
    {
      headers: {
        "User-Agent": UA,
      },
    },
  );
  const body = await response.text();
  const RE = /(<img.*?\/>)/sg;

  // @ts-ignore
  const { document } = new jsdom.JSDOM(
    body.replaceAll(RE, ""),
    { url: GFN_URL },
  ).window;

  const newFeed = await getNewestData(extractData(document), cache);
  if (notify) {
    return notify(formatMessage(newFeed));
  }
};
