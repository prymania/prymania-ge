/**
 * ฟอร์มตัวอย่างสำหรับสอน Google Forms — วิชาทักษะและชีวิตดิจิทัล (Digital Literacy)
 *
 * วิธีใช้ (ครั้งเดียว ประมาณ 2 นาที):
 *   1. เปิด https://script.google.com → โปรเจกต์ใหม่
 *   2. ลบโค้ดเดิม แล้ววางโค้ดทั้งไฟล์นี้ → กด 💾 บันทึก
 *   3. เลือกฟังก์ชัน  createAllSamples  ที่แถบด้านบน → กด ▶ เรียกใช้
 *   4. ครั้งแรก Google จะขอสิทธิ์ → ตรวจสอบสิทธิ์ → เลือกบัญชี → อนุญาต
 *      (ถ้าขึ้น "Google ยังไม่ได้ยืนยันแอปนี้" → ขั้นสูง → ไปที่โปรเจกต์ (ไม่ปลอดภัย) — เพราะเป็นสคริปต์ที่เราเขียนเอง)
 *   5. ดูลิงก์ในแท็บ "บันทึกการดำเนินการ" (Execution log) หรือเปิด Google Drive จะเห็นฟอร์ม 2 ไฟล์
 *
 * ได้ฟอร์ม 2 แบบ:
 *   (ก) แบบสำรวจ "ชีวิตดิจิทัลของนิสิต" — ครบทุกประเภทคำถาม, Section, ไปยังส่วนตามคำตอบ, การตรวจสอบคำตอบ, คำชี้แจง PDPA
 *       (ใช้เป็นตัวอย่าง Assignment 2 และคำถามตรงกับชีต "ผลแบบสำรวจ" ในไฟล์ฝึก Sheets)
 *   (ข) แบบทดสอบ "Quiz ตัวอย่าง: รู้ทันภัยออนไลน์" — โหมดแบบทดสอบ มีคีย์คำตอบ คะแนน และคำอธิบาย
 * แก้ข้อความ/ตัวเลือกได้ตามสบาย แล้วรันใหม่จะได้ฟอร์มชุดใหม่ (ฟอร์มเดิมไม่ถูกลบ)
 */

function createAllSamples() {
  var a = createSurveySample();
  var b = createQuizSample();
  Logger.log('แบบสำรวจ (แก้ไข): ' + a.getEditUrl());
  Logger.log('แบบสำรวจ (ลิงก์ให้นิสิตตอบ): ' + a.getPublishedUrl());
  Logger.log('แบบทดสอบ (แก้ไข): ' + b.getEditUrl());
  Logger.log('แบบทดสอบ (ลิงก์ให้นิสิตตอบ): ' + b.getPublishedUrl());
}

// ---------------------------------------------------------------- (ก) แบบสำรวจ
function createSurveySample() {
  var form = FormApp.create('ตัวอย่าง: แบบสำรวจชีวิตดิจิทัลของนิสิต');
  form.setDescription(
    'แบบสำรวจนี้เป็นส่วนหนึ่งของรายวิชาทักษะและชีวิตดิจิทัล ใช้เวลาประมาณ 3 นาที\n\n' +
    '🔒 คำชี้แจงเรื่องข้อมูลส่วนบุคคล (PDPA)\n' +
    '• ไม่เก็บชื่อ เลขบัตร หรือเบอร์โทร คำตอบไม่ระบุตัวตน\n' +
    '• ใช้เพื่อการเรียนการสอนในรายวิชานี้เท่านั้น ผู้เห็นข้อมูลคือผู้สร้างฟอร์มและอาจารย์ผู้สอน\n' +
    '• ลบข้อมูลเมื่อสิ้นภาคการศึกษา · ไม่สะดวกตอบข้อใด ข้ามได้ (ยกเว้นข้อที่มี *)');
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setConfirmationMessage('ขอบคุณที่ช่วยตอบ 🙏 ผลสรุปจะนำเสนอในห้องเรียน');

  // ส่วนที่ 1: ข้อมูลทั่วไป
  form.addSectionHeaderItem().setTitle('ส่วนที่ 1 · ข้อมูลทั่วไป');
  form.addMultipleChoiceItem().setTitle('ชั้นปี')                                   // หลายตัวเลือก
    .setChoiceValues(['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4 ขึ้นไป']).setRequired(true);
  form.addListItem().setTitle('คณะ')                                                 // เลื่อนลง
    .setChoiceValues(['วิทยาศาสตร์', 'บัญชีและการจัดการ', 'ศึกษาศาสตร์', 'วิศวกรรมศาสตร์',
                      'มนุษยศาสตร์และสังคมศาสตร์', 'อื่น ๆ']);
  form.addTextItem().setTitle('ในหนึ่งวัน ใช้หน้าจอ (มือถือ/คอม) ประมาณกี่ชั่วโมง')          // คำตอบสั้น + ตรวจสอบตัวเลข
    .setHelpText('ดูได้จาก Screen Time / Digital Wellbeing · ตอบเป็นตัวเลข 0–24')
    .setValidation(FormApp.createTextValidation()
      .setHelpText('กรุณาตอบเป็นตัวเลข 0 ถึง 24').requireNumberBetween(0, 24).build())
    .setRequired(true);
  form.addTextItem().setTitle('ในหนึ่งวัน นอนประมาณกี่ชั่วโมง')
    .setValidation(FormApp.createTextValidation()
      .setHelpText('กรุณาตอบเป็นตัวเลข 0 ถึง 24').requireNumberBetween(0, 24).build());
  form.addCheckboxItem().setTitle('แอปที่ใช้ทุกวัน (เลือกได้หลายข้อ)')                     // ช่องทำเครื่องหมาย + อื่นๆ
    .setChoiceValues(['LINE', 'Facebook', 'TikTok', 'Instagram', 'YouTube', 'X', 'Discord'])
    .showOtherOption(true);
  var aiQ = form.addMultipleChoiceItem().setTitle('ใช้ AI ช่วยเรียนไหม').setRequired(true);

  // ส่วนที่ 2: คนที่ใช้ AI
  var secAI = form.addPageBreakItem().setTitle('ส่วนที่ 2 · การใช้ AI ช่วยเรียน');
  form.addCheckboxItem().setTitle('เครื่องมือ AI ที่ใช้')
    .setChoiceValues(['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'NotebookLM', 'Perplexity']).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('ใช้ AI บ่อยแค่ไหน')
    .setChoiceValues(['ทุกวัน', '2–3 ครั้ง/สัปดาห์', 'สัปดาห์ละครั้ง', 'นาน ๆ ครั้ง']);
  form.addScaleItem().setTitle('มั่นใจว่าตรวจได้ว่าคำตอบของ AI ถูกหรือผิด')                 // สเกลเชิงเส้น
    .setBounds(1, 5).setLabels('ไม่มั่นใจเลย', 'มั่นใจมาก');
  form.addGridItem().setTitle('ใช้ AI ทำสิ่งเหล่านี้บ่อยแค่ไหน')                            // ตารางกริด
    .setRows(['อธิบายเนื้อหาที่ไม่เข้าใจ', 'สรุปเอกสาร', 'ช่วยเขียน/ตรวจภาษา', 'ทำแบบฝึกทบทวน'])
    .setColumns(['ไม่เคย', 'บางครั้ง', 'บ่อย']);

  // ส่วนที่ 3: คนที่ไม่ใช้ AI
  var secNoAI = form.addPageBreakItem().setTitle('ส่วนที่ 3 · ทำไมยังไม่ใช้ AI');
  form.addParagraphTextItem().setTitle('เหตุผลที่ยังไม่ใช้ AI ช่วยเรียน');                   // ย่อหน้า

  // ส่วนที่ 4: ความปลอดภัย
  var secSafe = form.addPageBreakItem().setTitle('ส่วนที่ 4 · ความปลอดภัยออนไลน์');
  form.addMultipleChoiceItem().setTitle('เคยได้ SMS หรือสายหลอกลวงไหม')
    .setChoiceValues(['เคย', 'ไม่เคย', 'ไม่แน่ใจ']);
  form.addDateItem().setTitle('ครั้งล่าสุดที่เปลี่ยนรหัสผ่านอีเมล (ประมาณ)').setHelpText('จำไม่ได้ ข้ามได้');   // วันที่
  form.addScaleItem().setTitle('ความพึงพอใจต่อ Wi-Fi มหาวิทยาลัย').setBounds(1, 5)
    .setLabels('ไม่พอใจมาก', 'พอใจมาก');

  // ไปยังส่วนตามคำตอบ: ใช้ AI → ส่วนที่ 2, ไม่ใช้ → ส่วนที่ 3
  aiQ.setChoices([aiQ.createChoice('ใช้', secAI), aiQ.createChoice('ไม่ใช้', secNoAI)]);
  // จบส่วนที่ 2 แล้วข้ามส่วนที่ 3 ไปส่วนที่ 4 (setGoToPage ของตัวแบ่งส่วนที่ 3 = หลังจบหน้าก่อนหน้า ให้ไปที่ส่วนที่ 4)
  secNoAI.setGoToPage(secSafe);
  return form;
}

// ---------------------------------------------------------------- (ข) แบบทดสอบ
function createQuizSample() {
  var form = FormApp.create('ตัวอย่าง: Quiz รู้ทันภัยออนไลน์');
  form.setIsQuiz(true);
  form.setDescription('แบบทดสอบตัวอย่าง 5 ข้อ ข้อละ 1 คะแนน · ดูคะแนนและคำอธิบายได้ทันทีหลังส่ง');
  var Q = [
    ['ข้อใดของ CIA Triad ถูกกระทบเมื่อเว็บล่มเพราะถูกยิงข้อมูลถล่ม (DoS)', ['Confidentiality', 'Integrity', 'Availability', 'Authentication'], 2,
     'ข้อมูลไม่ได้รั่วหรือถูกแก้ แต่ใช้งานไม่ได้เมื่อต้องการ = Availability'],
    ['SMS แจ้งพัสดุตกค้าง ให้กดลิงก์จ่ายค่าส่ง 15 บาทภายในวันนี้ ควรทำอย่างไร', ['กดลิงก์จ่ายเลย เงินน้อย', 'ส่งต่อให้เพื่อนช่วยดู', 'ไม่กดลิงก์ ตรวจสถานะเองจากแอป/เว็บทางการ', 'ตอบกลับ SMS ถามรายละเอียด'], 2,
     'เร่งรีบ + เงินจำนวนน้อย + ลิงก์แปลก = สัญญาณ Phishing'],
    ['รหัสผ่านใดแข็งแรงที่สุด', ['12345678', 'Somchai2005', 'qwerty123', 'kh@wNiew-SomTum-7tad!'], 3,
     'ยาว ผสมหลายชนิดตัวอักษร และไม่ใช่คำ/ข้อมูลส่วนตัวที่เดาง่าย'],
    ['2FA ช่วยป้องกันอะไรได้ดีที่สุด', ['ไวรัสในแฟลชไดรฟ์', 'คนร้ายที่ได้รหัสผ่านเราไปแล้ว', 'ข่าวปลอม', 'เน็ตช้า'], 1,
     'ต้องมีปัจจัยที่สอง (เช่น รหัสในมือถือเรา) จึงเข้าได้ แม้รหัสผ่านจะหลุด'],
    ['โดนหลอกโอนเงินแล้ว ควรติดต่อสายด่วนใดเพื่อขอคำปรึกษาและประสานอายัดบัญชี', ['1441', '1323', '1669', '191'], 0,
     'AOC 1441 ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์ (1323 = สุขภาพจิต, 1669 = เจ็บป่วยฉุกเฉิน)']
  ];
  Q.forEach(function (q) {
    var item = form.addMultipleChoiceItem().setTitle(q[0]).setPoints(1).setRequired(true);
    item.setChoices(q[1].map(function (c, i) { return item.createChoice(c, i === q[2]); }));
    item.setFeedbackForCorrect(FormApp.createFeedback().setText('ถูกต้อง! ' + q[3]).build());
    item.setFeedbackForIncorrect(FormApp.createFeedback().setText(q[3]).build());
  });
  return form;
}
