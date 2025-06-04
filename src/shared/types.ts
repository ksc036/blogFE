export interface urlParams {
  params: Promise<{ id: string; subdomain: string }>;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
