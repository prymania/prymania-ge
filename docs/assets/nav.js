// ---------- เมนูด้านซ้าย: คลิกชื่อบทเพื่อเปิดหน้าบทนั้น และกางหัวข้อย่อยของบทที่อ่านอยู่ ----------
// (ดัดแปลงจากเว็บ Calculus by Prymania — ตัดส่วน KaTeX/ถอดรหัสเฉลยออก เพราะวิชานี้ไม่ใช้)
(function () {
  var nav = document.querySelector(".course-nav");
  if (!nav) return;
  var aside = nav.closest("aside");
  var toggle = aside.querySelector(".nav-toggle");

  // จอเล็ก: ปุ่มเปิด/ปิดสารบัญ
  if (toggle) toggle.addEventListener("click", function () {
    var open = aside.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest(".nav-topics a, a.nav-title") && aside.classList.contains("nav-open")) {
      aside.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });

  // จอกว้าง: ปุ่ม « ซ่อนเมนู / ☰ เมนู แสดงกลับ (จำค่าไว้ทุกหน้า)
  function side(collapsed) {
    document.documentElement.classList.toggle("side-collapsed", collapsed);
    try { localStorage.setItem("side-collapsed", collapsed ? "1" : "0"); } catch (e) {}
  }
  var hideBtn = document.querySelector(".side-hide"), showBtn = document.querySelector(".side-show");
  if (hideBtn) hideBtn.addEventListener("click", function () { side(true); });
  if (showBtn) showBtn.addEventListener("click", function () { side(false); });

  // คงตำแหน่งเลื่อนของเมนูไว้เมื่อคลิกไปหน้าอื่น
  var KEY = "course-nav-scroll";
  function save() { try { sessionStorage.setItem(KEY, String(aside.scrollTop)); } catch (e) {} }
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) save(); });
  addEventListener("pagehide", save);
  var current = nav.querySelector(".nav-chapter[open]"), saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  if (saved !== null) aside.scrollTop = Number(saved);
  else if (current && aside.scrollHeight > aside.clientHeight) aside.scrollTop = current.offsetTop - 90;

  // ไฮไลต์หัวข้อย่อยที่กำลังอ่านอยู่
  if (!current || !("IntersectionObserver" in window)) return;
  var links = [];
  current.querySelectorAll('.nav-topics a[href^="#"]').forEach(function (a) {
    var t = document.getElementById(a.getAttribute("href").slice(1));
    if (t && t.id !== "lesson-content") links.push([t, a]);
  });
  var visible = new Set();
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
    var first = links.find(function (l) { return visible.has(l[0]); });
    links.forEach(function (l) { l[1].classList.toggle("is-active", !!first && l === first); });
  }, { rootMargin: "0px 0px -60% 0px" });
  links.forEach(function (l) { obs.observe(l[0]); });
})();

// ---------- คัดลอกข้อความ ----------
window.__copyText = function (text, done) {
  if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done); return; }
  var ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select(); document.execCommand("copy");
  document.body.removeChild(ta); done();
};

// ---------- ปุ่มดูแนวคำตอบ (กิจกรรมในเนื้อหา — ไม่ล็อกรหัส) ----------
(function () {
  document.querySelectorAll(".ans-btn").forEach(function (btn) {
    var ans = btn.nextElementSibling;
    if (!ans || !ans.classList.contains("answer")) return;
    btn.addEventListener("click", function () {
      var open = !ans.classList.contains("show");
      ans.classList.toggle("show", open);
      btn.classList.toggle("open", open);
      btn.textContent = open ? "ซ่อนแนวคำตอบ" : "ดูแนวคำตอบ";
    });
  });
})();

// ---------- คำถามชวนคิดท้ายบท: เปิด/ปิดแนวคำตอบทั้งหมด + คัดลอกคำถาม ----------
(function () {
  document.querySelectorAll(".review").forEach(function (box) {
    var key = box.querySelector(".review-key");
    if (key) {
      if (!box.querySelector(".rv-ans")) key.hidden = true;
      key.addEventListener("click", function () {
        var on = box.classList.toggle("unlocked");
        key.textContent = on ? "ซ่อนแนวคำตอบ" : "ดูแนวคำตอบ";
      });
    }
    var btn = box.querySelector(".review-copy");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var lines = [], n = 0;
      box.querySelectorAll("ol > li").forEach(function (li) {
        var c = li.cloneNode(true);
        c.querySelectorAll(".rv-ans").forEach(function (x) { x.remove(); });
        var txt = c.textContent.replace(/\s+/g, " ").trim();
        if (li.classList.contains("part")) { lines.push("", "[" + txt + "]"); return; }
        n += 1; lines.push(n + ". " + txt);
      });
      var text = "คำถามชวนคิด — " + document.title.split(" — ")[0] + "\n" + lines.join("\n").replace(/^\n/, "");
      window.__copyText(text, function () {
        btn.textContent = "คัดลอกแล้ว ✓"; btn.classList.add("copied");
        setTimeout(function () { btn.textContent = "คัดลอกคำถามทั้งหมด"; btn.classList.remove("copied"); }, 1600);
      });
    });
  });
})();

// ---------- เปิดเว็บได้แม้ไม่มีเน็ต (service worker: docs/sw.js สร้างโดย build.py) ----------
(function () {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  if (!/(^|\/)[^\/]*\.html$|\/$/.test(location.pathname) || /\/assets\//.test(location.pathname)) return;
  addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
})();
