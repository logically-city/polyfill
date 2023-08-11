import { AbortSignalPolyfill, AbortControllerPolyfill } from './AbortController';
import { FormDataPolyfill } from './FormData';
import { HeadersPolyfill } from './Headers';
import { URLSearchParamsPolyfill } from './URLSearchParams';

export const polyfill = {
  Headers: typeof Headers !== 'undefined' ? Headers : HeadersPolyfill,
  FormData: typeof FormData !== 'undefined' ? FormData : FormDataPolyfill,
  AbortSignal: typeof AbortSignal !== 'undefined' ? AbortSignal : AbortSignalPolyfill,
  AbortController: typeof AbortController !== 'undefined' ? AbortController : AbortControllerPolyfill,
  URLSearchParams: typeof URLSearchParams !== 'undefined' ? URLSearchParams : URLSearchParamsPolyfill
};

export const mountPolyfill = () => {
  if (!globalThis.Headers) (globalThis as any).Headers = polyfill.Headers;
  if (!globalThis.FormData) (globalThis as any).FormData = polyfill.FormData;
  if (!globalThis.AbortSignal) (globalThis as any).AbortSignal = polyfill.AbortSignal;
  if (!globalThis.AbortController) (globalThis as any).AbortController = polyfill.AbortController;
  if (!globalThis.URLSearchParams) (globalThis as any).URLSearchParams = polyfill.URLSearchParams;
};
