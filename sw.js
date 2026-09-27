// Service Worker – macht die App installierbar und offline nutzbar (Vorführung)
const CACHE="svj-demo-v4";
const FILES=["./app.html","./index.html","./forst.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const cp=r.clone();if(r.ok&&e.request.url.startsWith(self.location.origin))caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>hit)));
});
