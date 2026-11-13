// สร้างโดย build/build.py — อย่าแก้ไฟล์นี้ตรง ๆ
// เปิดเว็บได้แม้ไม่มีเน็ต: มีเน็ต = โหลดของใหม่เสมอ (แล้วเก็บสำเนา) · ไม่มีเน็ต = ใช้สำเนาในเครื่อง
var CACHE = "dl-2df9f03abb";
var CORE = ["./", "index.html", "01-intro.html", "02-docs.html", "03-forms.html", "04-sheets.html", "05-presentation.html", "06-media.html", "07-ai.html", "08-search.html", "09-security.html", "10-law.html", "11-social.html", "appendix-a-cheatsheet.html", "appendix-b-course.html", "appendix-c-pen.html", "appendix-d-stats.html", "assets/style.css", "assets/dl.css", "assets/nav.js", "assets/dl.js", "assets/ink.js", "icon/awesome.png", "icon/me_cat.png", "icon/prymania.jpg", "icon/thinking.png", "icon/well-done2.png", "icon/you-did-it.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  if (/goatcounter\.com|gc\.zgo\.at/.test(e.request.url)) return;   // สถิติผู้เข้าชม: ไม่เก็บลง cache
  e.respondWith(fetch(e.request).then(function (res) {
    if (res && (res.ok || res.type === "opaque")) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      return hit || (e.request.mode === "navigate" ? caches.match("index.html") : undefined);
    });
  }));
});
