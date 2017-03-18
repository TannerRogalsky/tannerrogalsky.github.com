function loadASM(name) { // eslint-disable-line no-unused-vars
  const supported = (typeof WebAssembly === 'object');
  if (supported) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `//cdn.rawgit.com/tannerrogalsky/tannerrogalsky.github.com/master/demoloops/${name}.wasm`, true);
    xhr.responseType = 'arraybuffer';
    xhr.overrideMimeType('application/javascript');
    xhr.onload = function onWASMLoad() {
      Module.wasmBinary = xhr.response;
      const script = document.createElement('script');
      script.src = `//cdn.rawgit.com/tannerrogalsky/tannerrogalsky.github.com/master/demoloops/${name}.js`;
      document.body.appendChild(script);
    };
    xhr.send(null);
  } else {
    const script = document.createElement('script');
    script.src = `//cdn.rawgit.com/tannerrogalsky/tannerrogalsky.github.com/master/demoloops/${name}_asm.js`;
    document.body.appendChild(script);
  }
}
