import runGFN, { formatMessage } from "./adaptors/gfn/mod.ts";
import { sendNotification } from "./lib/telegram/mod.ts";

async function main() {
  const json = await runGFN();
  const message = formatMessage(json);
  try {
    await sendNotification(message);
  } catch (error) {
    console.log(error);
  }
  return message;
}

await main();
