import "https://deno.land/x/dotenv/load.ts";
import { Fetch } from "../interfaces.ts";
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_GID = Deno.env.get("TELEGRAM_CHAT_GID");

export default class Telegram {
  private fetch: Fetch;
  constructor(fetch: Fetch) {
    this.fetch = fetch;
  }

  static build(fetch: Fetch) {
    return new Telegram(fetch);
  }

  sendNotification(text?: string) {
    if (!text || text == "") {
      return;
    }
    return this.fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_GID,
          parse_mode: "MarkdownV2",
          text,
        }),
      },
    );
  }
}
