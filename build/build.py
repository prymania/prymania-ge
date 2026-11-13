# -*- coding: utf-8 -*-
"""
สร้างเว็บคู่มือวิชา ทักษะและชีวิตดิจิทัล (Digital Literacy) จาก src/*.html  →  docs/*.html

  python build/build.py

วิชานี้ไม่มีเฉลยลับ จึงไม่ต้องเข้ารหัส ไม่ต้องติดตั้งแพ็กเกจเพิ่ม (Python 3 เปล่า ๆ ก็พอ)

แท็กพิเศษที่ใช้ในไฟล์ src:
  <h2 id="s1">ชื่อหัวข้อ</h2>            → ใส่เลขหัวข้อ (เช่น 2.1) + สร้างเมนูย่อยอัตโนมัติ
  <ex t="ชื่อ" lv="1">โจทย์<ans>แนวคำตอบ</ans></ex>
                                         → การ์ด "กิจกรรม" + ปุ่มดูแนวคำตอบ (lv 1–3 = ความยาก ไม่ใส่ก็ได้)
  <review><part>หัวข้อ</part><q>คำถาม<sol>แนวคำตอบ</sol></q></review>
                                         → คำถามชวนคิดท้ายบท (ไม่มีคะแนน) ปุ่มเดียวเปิดแนวคำตอบทั้งหมด
  <assign no="1" pts="5" kind="งานเดี่ยว" t="ชื่องาน">รายละเอียด</assign>
  <figure class="fig"><svg …>…</svg><figcaption>คำบรรยาย</figcaption></figure>
                                         → ภาพประกอบ build ใส่ "ภาพที่ บท.ลำดับ" ให้เอง
                                           (ภาพจำลองหน้าจอ/แผนภาพเป็น SVG ใช้ตัวแปรสีจาก CSS → โหมดมืดเปลี่ยนสีตาม)
                                         → การ์ดงานที่มอบหมาย (Assignment) + เพิ่ม "📌 Assignment" ในเมนูย่อย
"""
import html, json, os, re, sys, hashlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "src")
OUT = os.path.join(ROOT, "docs")

COURSE = "ทักษะและชีวิตดิจิทัล (Digital Literacy)"

PAGES = [
    dict(file="index.html", title="หน้าแรก / ภาพรวม", group=0),
    dict(file="01-intro.html", no=1, group=1, sym="👋", wk="1", title="รู้จัก Digital Literacy",
         kicker="WEEK 01 · เริ่มต้น", sub="Digital Literacy คืออะไร ทำไมต้องเรียน คอมพิวเตอร์พื้นฐาน และใช้ Web Browser ให้คล่องมือ"),
    dict(file="02-docs.html", no=2, group=1, sym="📄", wk="2", title="Google Docs",
         kicker="WEEK 02 · ทำงานร่วมกันออนไลน์", sub="พิมพ์งานให้สวยแบบมืออาชีพ: Styles สารบัญอัตโนมัติ คอมเมนต์ แชร์ และทำงานพร้อมกันทั้งกลุ่ม"),
    dict(file="03-forms.html", no=3, group=1, sym="📋", wk="3", title="Google Forms",
         kicker="WEEK 03 · ทำงานร่วมกันออนไลน์", sub="ประเภทคำถามพื้นฐานและขั้นสูง ทำแบบสอบถามที่ดี และสร้างเกม Escape Room ด้วย Section"),
    dict(file="04-sheets.html", no=4, group=1, sym="📊", wk="4", title="Google Sheets",
         kicker="WEEK 04 · ข้อมูลและตัวเลข", sub="ตาราง สูตร ฟังก์ชันสำคัญ จัดการข้อมูลนิสิต และสร้างกราฟเล่าเรื่องจากตัวเลข"),
    dict(file="05-presentation.html", no=5, group=1, sym="🖼️", wk="5", title="Presentation",
         kicker="WEEK 05 · สื่อสารให้ปัง", sub="ออกแบบสไลด์ให้คนอยากดู: 1 สไลด์ 1 ไอเดีย ตัวอักษร สี ภาพ และเทคนิคพูดนำเสนอ"),
    dict(file="06-media.html", no=6, group=1, sym="🎬", wk="6", title="Media",
         kicker="WEEK 06 · สร้างสรรค์สื่อ", sub="ภาพ เสียง วิดีโอสั้น การเล่าเรื่อง เครื่องมือตัดต่อ และลิขสิทธิ์ที่ต้องรู้ก่อนโพสต์"),
    dict(file="07-ai.html", no=7, group=2, sym="🤖", wk="9", title="AI for Students",
         kicker="WEEK 09 · ผู้ช่วยอัจฉริยะ", sub="เครื่องมือ AI ช่วยเรียน เขียน ค้นคว้า และจัดการเวลา เลือกใช้อย่างไร และใช้อย่างมีจริยธรรม"),
    dict(file="08-search.html", no=8, group=2, sym="🔎", wk="10", title="ค้นหาเก่ง & เช็กก่อนเชื่อ",
         kicker="WEEK 10 · รู้เท่าทันข้อมูล", sub="เทคนิคค้นหาขั้นสูง ค้นด้วยภาพ แหล่งข้อมูลวิชาการ ค้นด้วย AI และประเมินความน่าเชื่อถือด้วย CRAP Test"),
    dict(file="09-security.html", no=9, group=2, sym="🔐", wk="11", title="Internet Security",
         kicker="WEEK 11 · ปลอดภัยไว้ก่อน", sub="CIA Triad ภัยคุกคามออนไลน์ กรณีศึกษาจริง รหัสผ่านที่ดี 2FA และพฤติกรรมออนไลน์ที่ปลอดภัย"),
    dict(file="10-law.html", no=10, group=2, sym="⚖️", wk="12", title="กฎหมายและจริยธรรมดิจิทัล",
         kicker="WEEK 12 · พลเมืองดิจิทัล", sub="พ.ร.บ.คอมพิวเตอร์ PDPA GDPR ลิขสิทธิ์ และจริยธรรมในโลกออนไลน์"),
    dict(file="11-social.html", no=11, group=2, sym="💬", wk="13", title="Social Media Literacy",
         kicker="WEEK 13 · ใช้โซเชียลอย่างมีสติ", sub="ประเภทของโซเชียลมีเดีย ประโยชน์และผลกระทบ Cyberbullying และวิธีรับมือ"),
    dict(file="appendix-a-cheatsheet.html", group=3, letter="A", sym="⚡", title="Cheat Sheet ทางลัด",
         kicker="APPENDIX A", sub="คีย์ลัด สูตร Sheets ตัวช่วยค้นหา และเช็กลิสต์ความปลอดภัย รวมไว้ในหน้าเดียว"),
    dict(file="appendix-b-course.html", group=3, letter="B", sym="A+", title="เกณฑ์คะแนนและคะแนนนิสิต",
         kicker="APPENDIX B · COURSE GUIDE", sub="ดูคะแนนของตัวเอง คะแนนมาจากไหน ตัดเกรดอย่างไร ตารางเรียน และข้อตกลงที่เราใช้ร่วมกันตลอดเทอม"),
    dict(file="appendix-c-pen.html", group=3, letter="C", sym="✏️", title="วิธีใช้ปากกาเขียนบนหน้าเว็บ",
         kicker="APPENDIX C · HOW TO", sub="เขียน ไฮไลต์ และจดโน้ตทับบทเรียนด้วย Apple Pencil หรือเมาส์ พร้อมวิธีบันทึกและสำรองหมึก"),
    dict(file="appendix-d-stats.html", group=3, letter="D", sym="📊", title="สถิติผู้เข้าชม",
         kicker="APPENDIX D · VISITORS", sub="จำนวนคนเปิดเว็บรายวันและแยกรายบท นับแบบไม่ใช้คุกกี้และไม่ระบุตัวตน (GoatCounter)"),
]
GROUPS = {1: "ครึ่งแรก · เครื่องมือดิจิทัล", 2: "ครึ่งหลัง · ฉลาดรู้ดิจิทัล", 3: "ภาคผนวก"}

# ---------------------------------------------------------------- เก็บคะแนนท้ายชั่วโมง (สัปดาห์ 9–13)
# ใส่ id ของ Google Form (ส่วน /forms/d/<id>/ ของลิงก์) ตามเลขบท — ห้ามใช้ลิงก์ /edit
# ยังไม่ใส่ = หน้าเว็บขึ้นว่า "อาจารย์จะแจ้งลิงก์ในห้องเรียน"
QUIZ_BOOKS = [7, 8, 9, 10, 11]          # บทที่มีเก็บคะแนนท้ายชั่วโมง
QUIZ_FORMS = {
    # 7: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}
QUIZ_POINTS = "2"                        # สอบย่อยในคลาส 10 คะแนน ÷ 5 ครั้ง

# สถิติผู้เข้าชม (GoatCounter) — code ของ site วิชานี้ (= ส่วนหน้า .goatcounter.com) · "" = ปิดการนับ
# (ยกมาจากเว็บ Calculus ดู PORTING-GUIDE ข้อ 12)
GOATCOUNTER = "prymania-ge"
GC_URL = "https://%s.goatcounter.com" % GOATCOUNTER if GOATCOUNTER else ""
# นับ /index.html กับ / เป็นหน้าเดียวกัน
ANALYTICS = (r'<script>window.goatcounter={path:function(p){return p.replace(/\/index\.html$/,"/")}}</script>' "\n"
             '<script data-goatcounter="%s/count" async src="//gc.zgo.at/count.js"></script>\n' % GC_URL) if GC_URL else ""


def esc(s):
    return html.escape(str(s), quote=True)


def quiz_block(no):
    if no not in QUIZ_BOOKS:
        return ""
    fid = QUIZ_FORMS.get(no)
    if fid:
        body = ('<p>ใช้ <b>รหัส Quiz</b> ที่อาจารย์บอกในห้องเรียน จึงจะทำส่วนถัดไปได้</p>'
                '<a class="quiz-btn" href="https://docs.google.com/forms/d/%s/viewform" target="_blank" rel="noopener">เปิด Quiz สัปดาห์นี้ ↗</a>' % esc(fid))
    else:
        body = '<p>อาจารย์จะแจ้งลิงก์ Quiz (Google Form) ในห้องเรียนช่วงท้ายคาบ ทำได้ครั้งเดียว</p>'
    return ('<section class="quiz-score" id="quiz"><h2>เก็บคะแนนท้ายชั่วโมง <span class="chip">มีคะแนน</span></h2>'
            '<p class="quiz-login">🔐 Login ด้วยอีเมลมหาวิทยาลัย <b>@msu.ac.th</b> เท่านั้น</p>'
            '<p class="quiz-lead">สอบย่อยในคลาส · %s คะแนน</p>'
            '<ol class="quiz-steps">'
            '<li class="quiz-card"><div class="quiz-ico" aria-hidden="true">📝</div><div>'
            '<h4>Quiz ท้ายชั่วโมง (Google Form)</h4>%s</div></li>'
            '</ol>'
            '<p class="quiz-note">ดูกติกาคะแนนทั้งหมดที่ <a href="appendix-b-course.html">เกณฑ์คะแนน</a></p>'
            '</section>') % (QUIZ_POINTS, body)


LEVEL = {"1": "⭐ ชิล", "2": "⭐⭐ กำลังดี", "3": "⭐⭐⭐ ท้าทาย"}


# ============================================================ page transforms
def transform(src, chap):
    counters = {"ex": 0}
    prefix = str(chap) + "." if chap else ""

    def ex_block(m):
        attrs = dict(re.findall(r'(\w+)="([^"]*)"', m.group(1)))
        body = m.group(2)
        counters["ex"] += 1
        no = "%s%d" % (prefix, counters["ex"])
        if "<ans>" in body:
            q, a = body.split("<ans>", 1)
            a = a.replace("</ans>", "")
            ans = ('<button type="button" class="ans-btn">ดูแนวคำตอบ</button>'
                   '<div class="answer"><div class="answer-t">แนวคำตอบ</div>%s</div>' % a)
        else:
            q, ans = body, ""
        lv = LEVEL.get(attrs.get("lv", ""), "")
        return ('<div class="ex" id="ex%s"><div class="ex-head"><span class="ex-badge">กิจกรรม %s</span>'
                '<span class="ex-title">%s</span><span class="ex-level">%s</span></div><div class="ex-body">%s%s</div></div>') % (
            no, no, attrs.get("t", ""), lv, q, ans)
    src = re.sub(r"<ex((?:\s+\w+=\"[^\"]*\")*)>(.*?)</ex>", ex_block, src, flags=re.S)

    fig_no = [0]

    def fig_cap(m):
        fig_no[0] += 1
        return m.group(1) + '<figcaption><b>ภาพที่ %s%d</b> ' % (prefix, fig_no[0])
    src = re.sub(r'(<figure class="fig[^"]*">(?:(?!</figure>).)*?)<figcaption>', fig_cap, src, flags=re.S)

    def assign_block(m):
        a = dict(re.findall(r'(\w+)="([^"]*)"', m.group(1)))
        return ('<section class="assign" id="assign"><div class="assign-head"><span class="assign-no">📌 Assignment %s</span>'
                '<span class="assign-pts">%s คะแนน</span><span class="assign-kind">%s</span></div>'
                '<h3>%s</h3>%s</section>') % (a.get("no", ""), a.get("pts", ""), a.get("kind", "งานเดี่ยว"), a.get("t", ""), m.group(2))
    src = re.sub(r"<assign((?:\s+\w+=\"[^\"]*\")*)>(.*?)</assign>", assign_block, src, flags=re.S)

    def review_block(m):
        body = m.group(1)

        def q(mm):
            group = (body[:mm.start()].count("<part>") - 1) % 4 + 1
            inner = re.sub(r"<sol>(.*?)</sol>", r'<div class="rv-ans">\1</div>', mm.group(1), flags=re.S)
            return '<li class="g%d">%s</li>' % (group, inner)
        body = re.sub(r'<q>(.*?)</q>', q, body, flags=re.S)
        parts = iter(range(10 ** 6))
        body = re.sub(r"<part>(.*?)</part>",
                      lambda pm: '<li class="part g%d">%s</li>' % (next(parts) % 4 + 1, pm.group(1)), body, flags=re.S)
        return ('<section class="review" id="review"><h2>คำถามชวนคิดท้ายบท <span class="chip o">ไม่มีคะแนน</span></h2>'
                '<p class="review-note">คุยกับเพื่อนข้าง ๆ หรือคิดในใจก่อน แล้วค่อยกด “ดูแนวคำตอบ” — คำตอบของเราอาจดีกว่าแนวคำตอบก็ได้</p>'
                '<div class="review-actions"><button type="button" class="review-key">ดูแนวคำตอบ</button>'
                '<button type="button" class="review-copy">คัดลอกคำถามทั้งหมด</button></div>'
                '<ol>%s</ol></section>') % body
    src = re.sub(r"<review>(.*?)</review>", review_block, src, flags=re.S)

    heads = []
    n_sec = [0]

    def h2(m):
        hid, text = m.group(1), m.group(2)
        n_sec[0] += 1
        sec = "%s%d" % (prefix, n_sec[0]) if chap else ""
        heads.append((hid, sec, re.sub(r"<[^>]+>", "", text)))
        badge = '<span class="sec">%s</span> ' % sec if sec else ""
        return '<h2 id="%s">%s%s</h2>' % (hid, badge, text)
    src = re.sub(r'<h2 id="([^"]+)">(.*?)</h2>', h2, src)
    if 'id="assign"' in src:
        heads.append(("assign", "📌", "Assignment"))
    return src, heads


# ============================================================ page template
def tag(p):
    return "%02d" % p["no"] if p.get("no") else p["letter"]


def sidebar(cur, toc):
    o = ['<button class="nav-toggle" type="button" aria-expanded="false">☰ สารบัญทุกบท</button>',
         '<nav class="course-nav" aria-label="สารบัญรายวิชา">']
    for gk, gname in GROUPS.items():
        o.append('<p class="nav-label">%s</p>' % gname)
        for p in PAGES:
            if p["group"] != gk:
                continue
            here = p is cur
            base = "" if here else p["file"]
            links = ['<a href="%s#%s"><span class="toc-number">%s</span>%s</a>' % (base, h, s or "•", t)
                     for h, s, t in toc.get(p["file"], [])]
            o.append('<details class="nav-chapter" name="course-nav"%s><summary%s><span class="nav-number">%s</span>'
                     '%s</summary><div class="nav-topics">%s</div></details>' % (
                         " open" if here else "", ' aria-current="page"' if here else "", tag(p),
                         '<a class="nav-title" href="%s">%s</a>' % ("#lesson-content" if here else p["file"], p["title"]),
                         "".join(links)))
    o.append("</nav>")
    return "\n".join(o)


TEMPLATE = """<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Digital Literacy by Prymania</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=Bai+Jamjuree:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="assets/style.css">
<link rel="stylesheet" href="assets/dl.css">
<script>document.documentElement.classList.add("js");try{{if(localStorage.getItem("side-collapsed")==="1")document.documentElement.classList.add("side-collapsed");if(localStorage.getItem("big-text")==="1")document.documentElement.classList.add("big-text");if(localStorage.getItem("dark")==="1")document.documentElement.classList.add("dark")}}catch(e){{}}</script>
</head>
<body>
<a class="skip-link" href="#lesson-content">ข้ามไปเนื้อหา</a>
<div class="lesson-shell">
<button class="side-show" type="button" aria-label="แสดงเมนูบทเรียน">☰ เมนู</button>
<aside class="lesson-sidebar" aria-label="เมนูบทเรียน">
  <button class="side-hide" type="button" aria-label="ซ่อนเมนู" title="ซ่อนเมนู">«</button>
  <a class="lesson-brand" href="index.html"><span class="brand-mark" aria-hidden="true">D</span><span><span class="brand-title">Digital Literacy<br>by Prymania</span><span class="brand-caption">ทักษะและชีวิตดิจิทัล · GE</span></span></a>
{nav}
  <figure class="side-photo"><img src="icon/prymania.jpg" alt="อ. พรทิวา ปะวะระ (อ. พราย)" width="360" height="480" loading="lazy"><figcaption>อ. พรทิวา ปะวะระ (อ. พราย)</figcaption></figure>
  <div class="sidebar-bottom">ทักษะและชีวิตดิจิทัล (Digital Literacy) · วิชาศึกษาทั่วไป</div>
</aside>
<main class="lesson-main pastel" id="lesson-content">
{utility}
{head}
{body}
{pager}
<footer class="lesson-footer">{course} · Digital Literacy by Prymania · มหาวิทยาลัยมหาสารคาม</footer>
</main>
</div>
<script defer src="assets/nav.js"></script>
<script defer src="assets/dl.js"></script>
<script defer src="assets/ink.js"></script>
{analytics}</body>
</html>
"""


SW = """// สร้างโดย build/build.py — อย่าแก้ไฟล์นี้ตรง ๆ
// เปิดเว็บได้แม้ไม่มีเน็ต: มีเน็ต = โหลดของใหม่เสมอ (แล้วเก็บสำเนา) · ไม่มีเน็ต = ใช้สำเนาในเครื่อง
var CACHE = "dl-{version}";
var CORE = {core};
self.addEventListener("install", function (e) {{
  e.waitUntil(caches.open(CACHE).then(function (c) {{ return c.addAll(CORE); }}).then(function () {{ return self.skipWaiting(); }}));
}});
self.addEventListener("activate", function (e) {{
  e.waitUntil(caches.keys().then(function (ks) {{
    return Promise.all(ks.filter(function (k) {{ return k !== CACHE; }}).map(function (k) {{ return caches.delete(k); }}));
  }}).then(function () {{ return self.clients.claim(); }}));
}});
self.addEventListener("fetch", function (e) {{
  if (e.request.method !== "GET") return;
  if (/goatcounter\.com|gc\.zgo\.at/.test(e.request.url)) return;   // สถิติผู้เข้าชม: ไม่เก็บลง cache
  e.respondWith(fetch(e.request).then(function (res) {{
    if (res && (res.ok || res.type === "opaque")) {{
      var copy = res.clone();
      caches.open(CACHE).then(function (c) {{ c.put(e.request, copy); }});
    }}
    return res;
  }}).catch(function () {{
    return caches.match(e.request, {{ ignoreSearch: true }}).then(function (hit) {{
      return hit || (e.request.mode === "navigate" ? caches.match("index.html") : undefined);
    }});
  }}));
}});
"""


def write_service_worker():
    core = ["./"] + [p["file"] for p in PAGES] + [
        "assets/style.css", "assets/dl.css", "assets/nav.js", "assets/dl.js", "assets/ink.js"]
    icon_dir = os.path.join(OUT, "icon")
    core += ["icon/" + f for f in sorted(os.listdir(icon_dir)) if f.lower().endswith((".png", ".jpg", ".jpeg", ".svg", ".webp"))]
    h = hashlib.sha1()
    for f in core[1:]:
        with open(os.path.join(OUT, f), "rb") as fh:
            h.update(fh.read())
    with open(os.path.join(OUT, "sw.js"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(SW.format(version=h.hexdigest()[:10], core=json.dumps(core, ensure_ascii=False)))
    print("✓ sw.js (offline)               files=%d" % len(core))


def build():
    bodies, toc = {}, {}
    for p in PAGES:
        path = os.path.join(SRC, p["file"])
        if not os.path.exists(path):
            print("skip (no source):", p["file"])
            continue
        with open(path, encoding="utf-8") as fh:
            raw = fh.read()
        raw = raw.replace("GOATCOUNTER_URL", GC_URL)   # ลิงก์/ตัวดึงสถิติในภาคผนวก D
        body, heads = transform(raw, p.get("no"))
        body = body.replace("<!--TOC-->", "")
        if 'id="review"' in body:
            heads.append(("review", "💭", "คำถามชวนคิดท้ายบท"))
        q = quiz_block(p.get("no"))
        if q:
            body += q
            heads.append(("quiz", "📝", "เก็บคะแนนท้ายชั่วโมง"))
        bodies[p["file"]], toc[p["file"]] = body, heads

    for i, p in enumerate(PAGES):
        if p["file"] not in bodies:
            continue
        body = bodies[p["file"]]
        if p.get("no") or p.get("letter"):
            label = "บทที่ %d · สัปดาห์ที่ %s" % (p["no"], p["wk"]) if p.get("no") else "ภาคผนวก %s" % p["letter"]
            utility = '<div class="utility-row"><a href="index.html">← สารบัญรายวิชา</a><span class="utility-code">%s</span></div>' % label
            head = ('<header class="lesson-header"><p class="lesson-kicker">%s</p><h1>%s</h1><p>%s</p></header>' % (
                p["kicker"], p["title"], p["sub"]))
        else:
            utility = head = ""
        prev_p = PAGES[i - 1] if i > 0 else None
        next_p = PAGES[i + 1] if i + 1 < len(PAGES) else None
        pager = '<nav class="lesson-pager" aria-label="บทก่อนหน้าและถัดไป">%s%s</nav>' % (
            '<a class="pager-link secondary" href="%s">← %s</a>' % (prev_p["file"], prev_p["title"]) if prev_p else "<span></span>",
            '<a class="pager-link" href="%s">%s →</a>' % (next_p["file"], next_p["title"]) if next_p else "")
        title = ("บทที่ %d · %s" % (p["no"], p["title"])) if p.get("no") else p["title"]
        out = TEMPLATE.format(title=title, nav=sidebar(p, toc), utility=utility, head=head, body=body,
                              pager=pager, course=COURSE, analytics=ANALYTICS)
        with open(os.path.join(OUT, p["file"]), "w", encoding="utf-8", newline="\n") as fh:
            fh.write(out)
        print("✓ %-28s  sections=%-2d activities=%d" % (p["file"], len(toc[p["file"]]), body.count('class="ex"')))
    write_service_worker()


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    build()
