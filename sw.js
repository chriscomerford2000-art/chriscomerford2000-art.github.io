importScripts("/baremux/index.js");
importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts(__uv$config.sw || "/uv/uv.sw.js");

const uv = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const routed = typeof uv.route === "function"
      ? uv.route(event)
      : event.request.url.startsWith(location.origin + __uv$config.prefix);
    return routed ? await uv.fetch(event) : await fetch(event.request);
  })());
});
