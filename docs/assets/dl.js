// ============================================================
// ของเล่นโต้ตอบในบทเรียน Digital Literacy (ทำงานในเบราว์เซอร์ล้วน ๆ ไม่ส่งข้อมูลไปไหน)
//   .mcq        คำถามตัวเลือกแบบกดแล้วรู้ผลทันที (data-ans = ตัวเลือกที่ถูก)
//   .w-pass     ทดสอบความแข็งแรงของรหัสผ่าน
//   .w-search   ตัวช่วยสร้างคำค้น Google แบบขั้นสูง
//   .w-crap     เช็กลิสต์ CRAP Test
//   .w-ifs      ลองสูตร IFS ตัดเกรดแบบ Google Sheets
// ============================================================

// ---------- คำถามกดตอบ (.mcq) ----------
(function () {
  document.querySelectorAll(".mcq").forEach(function (box) {
    var ans = box.getAttribute("data-ans");
    var why = box.querySelector(".mcq-why");
    box.querySelectorAll("button[data-k]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (box.classList.contains("done")) return;
        box.classList.add("done");
        box.querySelectorAll("button[data-k]").forEach(function (x) {
          if (x.getAttribute("data-k") === ans) x.classList.add("right");
        });
        if (b.getAttribute("data-k") !== ans) b.classList.add("wrong");
        box.classList.add(b.getAttribute("data-k") === ans ? "is-right" : "is-wrong");
        if (why) why.hidden = false;
      });
    });
    var again = document.createElement("button");
    again.type = "button"; again.className = "mcq-again"; again.textContent = "↺ ลองใหม่";
    again.addEventListener("click", function () {
      box.classList.remove("done", "is-right", "is-wrong");
      box.querySelectorAll("button[data-k]").forEach(function (x) { x.classList.remove("right", "wrong"); });
      if (why) why.hidden = true;
    });
    if (why) { why.hidden = true; why.insertAdjacentElement("afterend", again); }
  });
})();

// ---------- ทดสอบรหัสผ่าน (.w-pass) ----------
(function () {
  var COMMON = ["123456", "12345678", "123456789", "password", "qwerty", "abc123", "111111", "000000", "iloveyou",
    "admin", "welcome", "abcd1234", "asdf", "1q2w3e", "zxcvbn", "football", "monkey", "dragon", "letmein", "sunshine",
    "princess", "666666", "121212", "654321", "112233", "password1", "qwertyuiop", "aaaaaa"];
  function fmtTime(sec) {
    if (sec < 1) return "ไม่ถึง 1 วินาที";
    var u = [["ปี", 31536000], ["วัน", 86400], ["ชั่วโมง", 3600], ["นาที", 60], ["วินาที", 1]];
    for (var i = 0; i < u.length; i++) {
      if (sec >= u[i][1]) {
        var v = sec / u[i][1];
        if (u[i][0] === "ปี" && v >= 1e6) {
          if (v >= 1e12) return "นานกว่าอายุจักรวาล 🌌";
          return "ประมาณ " + Math.round(v / 1e6).toLocaleString("th-TH") + " ล้านปี";
        }
        return "ประมาณ " + Math.round(v).toLocaleString("th-TH") + " " + u[i][0];
      }
    }
  }
  document.querySelectorAll(".w-pass").forEach(function (w) {
    var inp = w.querySelector("input"), bar = w.querySelector(".wp-bar i"), out = w.querySelector(".wp-out"),
      tips = w.querySelector(".wp-tips"), show = w.querySelector(".wp-show");
    if (show) show.addEventListener("change", function () { inp.type = show.checked ? "text" : "password"; });
    function run() {
      var p = inp.value, notes = [];
      if (!p) { bar.style.width = "0"; bar.className = ""; out.textContent = "ลองพิมพ์รหัสผ่านสมมุติดู (อย่าใช้รหัสจริง!)"; tips.innerHTML = ""; return; }
      var pool = 0;
      if (/[a-z]/.test(p)) pool += 26; else notes.push("เพิ่มตัวพิมพ์เล็ก");
      if (/[A-Z]/.test(p)) pool += 26; else notes.push("เพิ่มตัวพิมพ์ใหญ่");
      if (/[0-9]/.test(p)) pool += 10; else notes.push("เพิ่มตัวเลข");
      if (/[^A-Za-z0-9]/.test(p)) pool += 33; else notes.push("เพิ่มอักขระพิเศษ เช่น ! @ # _");
      if (p.length < 12) notes.push("ยาวอีกนิด (แนะนำ 12 ตัวขึ้นไป)");
      var bits = p.length * Math.log2(Math.max(pool, 1));
      var low = p.toLowerCase(), weak = false;
      if (COMMON.some(function (c) { return low.indexOf(c) !== -1; })) { weak = true; notes.unshift("มีรหัสยอดฮิต/แป้นพิมพ์เรียงกัน แฮกเกอร์ลองอันนี้ก่อนเลย"); }
      if (/(.)\1{2,}/.test(p)) { bits -= 10; notes.push("มีตัวซ้ำติดกันหลายตัว"); }
      if (/(19|20)\d\d/.test(p) || /(25[0-9]{2})/.test(p)) { bits -= 8; notes.push("มีปี ค.ศ./พ.ศ. (มักเป็นปีเกิด เดาง่าย)"); }
      if (weak) bits = Math.min(bits, 12);
      bits = Math.max(bits, 1);
      var sec = Math.pow(2, bits) / 1e10 / 2;   // สมมุติเครื่องแฮกเดาได้ 10,000 ล้านครั้ง/วินาที (เฉลี่ยเจอครึ่งทาง)
      var lv = bits < 36 ? 0 : bits < 60 ? 1 : bits < 80 ? 2 : 3;
      var name = ["อ่อนมาก 😱", "พอใช้ 😐", "แข็งแรง 💪", "แข็งแรงมาก 🛡️"][lv];
      bar.style.width = Math.min(100, Math.max(8, bits / 100 * 100)) + "%";
      bar.className = "lv" + lv;
      out.innerHTML = "<b>" + name + "</b> · ถ้าโดนเดาแบบสุ่มทุกแบบ ใช้เวลา <b>" + fmtTime(sec) + "</b>";
      tips.innerHTML = notes.length ? notes.map(function (n) { return "<li>" + n + "</li>"; }).join("") : "<li>เยี่ยม! อย่าลืมเปิด 2FA และไม่ใช้รหัสนี้ซ้ำกับเว็บอื่น</li>";
    }
    inp.addEventListener("input", run); run();
  });
})();

// ---------- ตัวช่วยสร้างคำค้น (.w-search) ----------
(function () {
  document.querySelectorAll(".w-search").forEach(function (w) {
    var f = {};
    w.querySelectorAll("[data-f]").forEach(function (el) { f[el.getAttribute("data-f")] = el; });
    var out = w.querySelector(".ws-out"), go = w.querySelector(".ws-go");
    function q() {
      var parts = [];
      if (f.kw.value.trim()) parts.push(f.kw.value.trim());
      if (f.exact.value.trim()) parts.push('"' + f.exact.value.trim().replace(/"/g, "") + '"');
      f.ex.value.trim().split(/[\s,]+/).forEach(function (x) { if (x) parts.push("-" + x.replace(/^-/, "")); });
      if (f.site.value.trim()) parts.push("site:" + f.site.value.trim().replace(/^site:/, ""));
      if (f.ft.value) parts.push("filetype:" + f.ft.value);
      if (f.title.value.trim()) parts.push("intitle:" + f.title.value.trim().replace(/^intitle:/, ""));
      return parts.join(" ");
    }
    function draw() {
      var s = q();
      out.textContent = s || "(พิมพ์อะไรสักช่องด้านบน)";
      go.href = s ? "https://www.google.com/search?q=" + encodeURIComponent(s) : "#";
      go.classList.toggle("off", !s);
    }
    w.addEventListener("input", draw); w.addEventListener("change", draw); draw();
  });
})();

// ---------- เช็กลิสต์ CRAP Test (.w-crap) ----------
(function () {
  document.querySelectorAll(".w-crap").forEach(function (w) {
    var boxes = w.querySelectorAll("input[type=checkbox]"), out = w.querySelector(".wc-out");
    function draw() {
      var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
      var msg = n === boxes.length ? ["ok", "✅ ผ่านครบ — น่าเชื่อถือ ใช้อ้างอิงได้ (แต่ยังควรเทียบกับแหล่งอื่นอีก 1 แหล่ง)"]
        : n >= boxes.length - 2 ? ["mid", "🤔 พอใช้ — ใช้ประกอบได้ แต่หาแหล่งที่ดีกว่ามายืนยันก่อน"]
        : ["bad", "🚩 ไม่ผ่าน — อย่าเพิ่งเชื่อ อย่าเพิ่งแชร์ อย่าใช้อ้างอิงในรายงาน"];
      out.className = "wc-out " + msg[0];
      out.innerHTML = "<b>" + n + "/" + boxes.length + "</b> " + msg[1];
    }
    boxes.forEach(function (b) { b.addEventListener("change", draw); }); draw();
  });
})();

// ---------- ลองสูตร IFS ตัดเกรด (.w-ifs) ----------
(function () {
  var cuts = [["A", 80], ["B+", 75], ["B", 70], ["C+", 65], ["C", 60], ["D+", 55], ["D", 50], ["F", 0]];
  document.querySelectorAll(".w-ifs").forEach(function (w) {
    var inp = w.querySelector("input"), out = w.querySelector(".wi-out"), rows = w.querySelectorAll(".wi-row");
    function draw() {
      var v = parseFloat(inp.value);
      if (isNaN(v)) { out.textContent = "#VALUE!"; return; }
      var hit = -1;
      for (var i = 0; i < cuts.length; i++) if (v >= cuts[i][1]) { hit = i; break; }
      out.textContent = hit < 0 ? "#N/A" : cuts[hit][0];
      rows.forEach(function (r, i) { r.classList.toggle("hit", i === hit); });
    }
    inp.addEventListener("input", draw); draw();
  });
})();

// ---------- สถิติผู้เข้าชม (ภาคผนวก D) — คัดลอกฟังก์ชัน stats จาก widgets.js ของเว็บ Calculus ----------
(function () {
  // ---------- สถิติผู้เข้าชม (ภาคผนวก D) · <div class="widget" data-w="stats" data-gc="https://CODE.goatcounter.com"> ----------
  // ใช้ตัวนับสาธารณะของ GoatCounter (/counter/PATH.json, server cache ~4 ชม., วันตามเวลา UTC)
  // ?start=D&end=D รวมชั่วโมง 00:00 ของวันถัดไปด้วย → ดึงยอดสะสม "ตั้งแต่วัน D" แล้วลบกันทีละวันแทน
  function stats(box) {
    var base = box.dataset.gc, dir = location.pathname.replace(/[^\/]*$/, ""), DAYS = 14;
    var TH_M = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    function get(path, start) {
      return fetch(base + "/counter/" + encodeURIComponent(path) + ".json" + (start ? "?start=" + start : ""))
        .then(function (r) {
          if (r.status === 404) return 0;   // หน้านี้ยังไม่มีคนเข้า
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json().then(function (j) { return parseInt(String(j.count).replace(/\D/g, ""), 10) || 0; });
        });
    }
    function fmt(n) { return n.toLocaleString("en-US"); }
    var now = new Date(), days = [];
    for (var i = DAYS - 1; i >= 0; i--) days.push(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i)));
    box.innerHTML = '<div class="widget-head">📊 ผู้เข้าชมเว็บ <span class="tag">' + DAYS + ' วันล่าสุด</span></div>' +
      '<div class="widget-body"><p class="gc-msg">กำลังโหลดสถิติ…</p></div>';
    var body = box.querySelector(".widget-body");
    Promise.all([get("TOTAL")].concat(days.map(function (d) { return get("TOTAL", d.toISOString().slice(0, 10)); })))
      .then(function (r) {
        var total = r[0], cum = r.slice(1), daily = cum.map(function (c, k) { return c - (k + 1 < cum.length ? cum[k + 1] : 0); });
        var max = Math.max.apply(null, daily.concat([1]));
        var tiles = [["วันนี้", daily[DAYS - 1]], ["7 วันล่าสุด", cum[DAYS - 7]], ["ทั้งหมด", total]];
        body.innerHTML = '<div class="gc-tiles">' + tiles.map(function (t) {
            return '<div class="gc-tile"><span>' + t[0] + '</span><b>' + fmt(t[1]) + '</b></div>';
          }).join("") + '</div>' +
          '<div class="gc-chart" role="img" aria-label="จำนวนผู้เข้าชมรายวัน ' + DAYS + ' วันล่าสุด">' + daily.map(function (n, k) {
            return '<div class="gc-col' + (k === DAYS - 1 ? " today" : "") + '" title="' + days[k].getUTCDate() + " " + TH_M[days[k].getUTCMonth()] + ": " + fmt(n) + ' คน">' +
              '<span class="gc-v">' + (n ? fmt(n) : "") + '</span><i style="height:' + (n / max * 100).toFixed(1) + '%"></i></div>';
          }).join("") + '</div>' +
          '<div class="gc-days">' + days.map(function (d, k) {
            return '<span>' + (k === DAYS - 1 ? "วันนี้" : d.getUTCDate() + (k === 0 || d.getUTCDate() === 1 ? " " + TH_M[d.getUTCMonth()] : "")) + '</span>';
          }).join("") + '</div>';
      })
      .catch(function () {
        body.innerHTML = '<p class="gc-msg">⚠ โหลดสถิติไม่ได้ — ต้องต่ออินเทอร์เน็ต และบางครั้ง ad blocker บล็อกไว้</p>';
      });
    // ตารางแยกรายบท: <tr data-gc-path="01-function.html"> … <td class="gc-n"></td>
    document.querySelectorAll("[data-gc-path]").forEach(function (tr) {
      var cell = tr.querySelector(".gc-n"), f = tr.dataset.gcPath;
      get(dir + (f === "index.html" ? "" : f)).then(function (n) { cell.textContent = fmt(n); }, function () { cell.textContent = "–"; });
    });
  }
  document.querySelectorAll('.widget[data-w="stats"]').forEach(function (box) {
    try { stats(box); } catch (e) { box.innerHTML = '<div class="widget-body">⚠ widget error: ' + e.message + "</div>"; }
  });
})();
