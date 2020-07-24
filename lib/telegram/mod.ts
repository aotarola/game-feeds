import { config } from "https://deno.land/x/dotenv/mod.ts";

const TELEGRAM_BOT_TOKEN = config()["TELEGRAM_BOT_TOKEN"];
const TELEGRAM_CHAT_GID = config()["TELEGRAM_CHAT_GID"];

export function sendNotification(message: string | undefined) {
  if (!message || message == "") {
    return;
  }
  return fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_GID,
        parse_mode: "MarkdownV2",
        text: message,
      }),
    },
  );
}
