declare module 'web-vitals' {
  export function onCLS(callback: (metric: any) => void): void;
  export function onFID(callback: (metric: any) => void): void;
  export function onFCP(callback: (metric: any) => void): void;
  export function onLCP(callback: (metric: any) => void): void;
  export function onTTFB(callback: (metric: any) => void): void;
}
