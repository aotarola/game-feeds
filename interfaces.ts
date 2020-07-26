export interface Notifier {
  (text?: string): undefined;
}

export interface Cache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<string>;
}

interface AdaptorOptions {
  notify?: Notifier;
  cache?: Cache;
}

export interface Adaptor {
  (opts: AdaptorOptions): Promise<string | undefined>;
}
