# Digital Literacy (ทักษะและชีวิตดิจิทัล) — เว็บคู่มือการสอน

วิชาศึกษาทั่วไป ม.มหาสารคาม · อาจารย์: Prymania (อ. พราย) · ผู้ใช้สื่อสารภาษาไทย
template มาจากเว็บ Calculus (`D:\_claudeCalculus`, ดู `PORTING-GUIDE.md` ที่นั่น) แต่ตัดฟีเจอร์หนัก ๆ ออก: ไม่มี KaTeX, กราฟ, เข้ารหัสเฉลย, private/

## แก้ที่ต้นฉบับ แล้ว build

- เนื้อหาอยู่ที่ `src/*.html` → รัน `python build/build.py` (Python 3 เปล่า ไม่ต้องลงแพ็กเกจ) → ได้ `docs/*.html` (ห้ามแก้ `docs/*.html` ตรง ๆ)
- รายการบท ชื่อบท สัปดาห์ เมนู อยู่ใน `PAGES` ของ build.py
- แท็กพิเศษ (`<ex>`, `<review>`, `<assign>`) อธิบายใน docstring ต้น build.py
- `docs/assets/`: `style.css` + `ink.js` คัดลอกจากเว็บ Calculus (อย่าแก้พฤติกรรมปากกา) · `dl.css` `dl.js` `nav.js` เป็นของวิชานี้ แก้ด้วยมือ
- ของเล่นโต้ตอบใน `dl.js`: `.mcq` (ควิซกดตอบ), `.w-pass` (ทดสอบรหัสผ่าน), `.w-search` (สร้างคำค้น), `.w-crap` (CRAP Test), `.w-ifs` (สูตร IFS)

## รูปแบบเนื้อหา

- เน้นชิล ๆ ลงมือทำ ทุกบทมี 🎬 คำถามเปิดบท + กลับมาตอบท้ายบท, 🎯 วัตถุประสงค์, กิจกรรม (`<ex>`), ควิซกดตอบ (`.mcq`), คำถามชวนคิดท้ายบท (`<review>`, ไม่มีคะแนน)
- บทที่ 2–6 มีการ์ด Assignment (`<assign>`) — คะแนนต้องตรงกับ มคอ.3 และภาคผนวก B
- บทที่ 7–11 มี "เก็บคะแนนท้ายชั่วโมง" สร้างโดย build: ใส่ id ฟอร์มใน `QUIZ_FORMS` (ไม่มีการ์ดเช็คชื่อ) (ใช้ลิงก์ `/viewform` ห้ามใช้ `/edit`)
- ห้ามติดป้ายชื่อการสอบในเมนู/หัวบท
- ภาพประกอบเป็น SVG ฝังในหน้า `<figure class="fig">` (คลาสสีอยู่ท้าย `dl.css`) build ใส่ “ภาพที่ บท.n” ให้ · การ์ตูนอาจารย์ (`icon/*.png`) อยู่ในกล่องคำถามเปิดบท/ปิดบท

## คะแนน (มคอ.3)

Assignment 50 (A1 Docs 5 · A2 Forms 5 (ทุก Assignment เป็นงานเดี่ยว · A5 = คลิปสั้นหัวข้ออิสระ เน้นตัดต่อ+ข้อความบนจอ) · A3 Sheets 15 · A4 Presentation 10 · A5 Media 15) · สอบย่อยในคลาส 10 · มีส่วนร่วม 10 · ปลายภาค 30
เกรด: A 80 · B+ 75 · B 70 · C+ 65 · C 60 · D+ 55 · D 50 · F < 50 — ถ้าเปลี่ยน ต้องแก้ทั้ง `src/index.html`, `src/appendix-b-course.html` (ทั้งช่องเกรดและอาร์เรย์ `cuts`) และ `cuts` ใน `docs/assets/dl.js` (widget IFS)

## ตรวจหลังแก้

`python build/build.py` → `cd docs && python -m http.server` → เปิดดู ไม่มี error ใน console, จอ 375px ไม่ล้น, ลองโหมดมืด 🌙

## ไฟล์ฝึก (`docs/files/`)

- `docs-practice-fix-me.docx` (รายงานจัดรูปแบบมั่ว + ภารกิจ 10 ข้อ) · `docs-example-finished.docx` (ฉบับจัดเสร็จ) · `sheets-practice-student-data.xlsx` (ข้อมูลสมมุติ 5 ชีต) · `forms-sample-script.gs` (Apps Script สร้างแบบสำรวจ + Quiz ตัวอย่าง)
- สคริปต์สร้างอยู่ใน `build/samples/` (`node finished.js`, `node messy.js` ต้องมีแพ็กเกจ npm `docx` · `python mkxlsx.py` ต้องมี openpyxl) — ข้อมูลสมมุติทั้งหมด ลิงก์ดาวน์โหลดอยู่ในบทที่ 2–4

## สถิติผู้เข้าชม (ภาคผนวก D · GoatCounter)

- site code `prymania-ge` อยู่ใน `GOATCOUNTER` ของ build.py ("" = ปิดการนับ) · สคริปต์นับใส่ทุกหน้าผ่าน `{analytics}` · sw.js ไม่ cache request ของ goatcounter
- หน้า `src/appendix-d-stats.html` (ตารางรายบทใช้ `data-gc-path` ต้องตรงกับไฟล์ใน PAGES) · ตัวดึงสถิติ = ฟังก์ชัน `stats` ท้าย `dl.js` · CSS บล็อก "ภาคผนวก D: สถิติผู้เข้าชม" ท้าย style.css
- ตั้งค่า site บน GoatCounter: ☑ Allow adding visitor counts on your website · Dashboard ดูได้ทุกคน · เปิดจาก localhost จะไม่ถูกนับ (เห็น 0 เป็นปกติ)
- ภาคผนวก B มีหัวข้อแรก "คะแนนนิสิต" ลิงก์ไปตาราง Google Sheets ของอาจารย์
