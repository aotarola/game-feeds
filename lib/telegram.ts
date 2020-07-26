import { Fetch } from "../interfaces.ts";

export default class Telegram {
  private fetch: Fetch;
  constructor(fetch: Fetch) {
    this.fetch = fetch;
  }

  static build(fetch: Fetch) {
    return new Telegram(fetch);
  }

  async sendNotification(text?: string) {
    if (!text || text == "") {
      return;
    }
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_GID = Deno.env.get("TELEGRAM_CHAT_GID");
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_GID) {
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
