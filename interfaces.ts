interface sendNotification {
  (text?: string): Promise<Response | undefined>;
}

export interface Cache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<string>;
}

interface AdaptorOptions {
  notify?: sendNotification;
  cache?: Cache;
}

export interface Fetch {
  (
    input: string | Request | URL,
    init?: RequestInit | undefined,
  ): Promise<Response>;
}

export interface Adaptor {
  (opts: AdaptorOptions): Promise<Response | undefined>;
}
