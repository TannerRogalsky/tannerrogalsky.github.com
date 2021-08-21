/* tslint:disable */
/* eslint-disable */
/**
* @param {string} src
* @param {string} root
* @returns {any}
*/
export function load_script(src: string, root: string): any;
/**
*/
export class FutureWrapper {
  free(): void;
}
/**
*/
export class Wrapper {
  free(): void;
/**
* @param {HTMLCanvasElement} canvas
*/
  constructor(canvas: HTMLCanvasElement);
/**
* @param {number} t_ms
*/
  draw(t_ms: number): void;
/**
* @param {FutureWrapper} loader
* @returns {number}
*/
  finish_load(loader: FutureWrapper): number;
/**
* @param {number} index
* @returns {boolean}
*/
  set_current(index: number): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_wrapper_free: (a: number) => void;
  readonly wrapper_new: (a: number) => number;
  readonly wrapper_draw: (a: number, b: number) => void;
  readonly wrapper_finish_load: (a: number, b: number) => number;
  readonly wrapper_set_current: (a: number, b: number) => number;
  readonly __wbg_futurewrapper_free: (a: number) => void;
  readonly load_script: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3a542ef2b53d8d39: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__hbf5fe6544d349186: (a: number, b: number, c: number, d: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
