export interface Notifier {
  (message?: string): void;
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
  run(opts: AdaptorOptions): Promise<string | undefined>;
}
