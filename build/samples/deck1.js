const pptxgen=require('pptxgenjs'); const icon=require('./icons.js');
const {applyTheme}=require('/root/.claude/skills/synced/bb756478-0139-4914-b848-ef84efc18b2e_016288cf-8eee-4cf1-9bbc-8199cb51631a/pptx/scripts/apply_theme.js');
const F=require('react-icons/fa6');
const THEME={name:"Midnight Study",headFontFace:"Kanit",bodyFontFace:"Sarabun",colors:{dk1:"15172B",lt1:"FFFFFF",dk2:"2A2D4A",lt2:"F1F2F8",accent1:"C6F432",accent2:"A78BFA",accent3:"FF7A6B",accent4:"5EEAD4",accent5:"FBBF24",accent6:"64748B",hlink:"7C5CFA",folHlink:"A78BFA"}};
const K=THEME.colors;
(async()=>{
const pres=new pptxgen(); pres.layout="LAYOUT_16x9"; pres.title="ติวสอบคืนเดียวกับ NotebookLM"; pres.author="Digital Literacy by Prymania";
pres.theme={headFontFace:THEME.headFontFace,bodyFontFace:THEME.bodyFontFace};
const C=pres.SchemeColor;
pres.defineSlideMaster({title:"DARK",background:{color:K.dk1},objects:[{text:{text:"Digital Literacy · ตัวอย่าง Assignment 4",options:{x:0.5,y:5.2,w:5,h:0.3,fontSize:10,color:"8B8FB5",isTextBox:true,margin:0}}}],slideNumber:{x:9.1,y:5.2,w:0.4,h:0.3,fontSize:10,color:"8B8FB5"}});
pres.defineSlideMaster({title:"LIGHT",background:{color:K.lt2},objects:[{text:{text:"Digital Literacy · ตัวอย่าง Assignment 4",options:{x:0.5,y:5.2,w:5,h:0.3,fontSize:10,color:"64748B",isTextBox:true,margin:0}}}],slideNumber:{x:9.1,y:5.2,w:0.4,h:0.3,fontSize:10,color:"64748B"},
 });
const T=(s,t,o={})=>s.addText(t,{isTextBox:true,margin:0,...o});
const title=(s,t,dark)=>T(s,t,{x:0.5,y:0.35,w:9,h:0.7,fontFace:"Kanit",fontSize:32,bold:true,color:dark?"FFFFFF":K.dk1});
const ic={book:await icon(F.FaBookOpen,K.dk1),robot:await icon(F.FaRobot,K.dk1),clock:await icon(F.FaClock,K.dk1),up:await icon(F.FaUpload,K.dk1),chat:await icon(F.FaComments,K.dk1),brain:await icon(F.FaBrain,K.dk1),check:await icon(F.FaCircleCheck,K.accent1),x:await icon(F.FaCircleXmark,K.accent3),eye:await icon(F.FaEye,K.dk1),lock:await icon(F.FaLock,K.dk1),note:await icon(F.FaNoteSticky,K.dk1),moon:await icon(F.FaMoon,K.accent1),head:await icon(F.FaHeadphones,K.dk1)};
const circ=(s,x,y,d,fill,img)=>{s.addShape(pres.shapes.OVAL,{x,y,w:d,h:d,fill:{color:fill},line:{color:fill}}); s.addImage({data:img,x:x+d*0.25,y:y+d*0.25,w:d*0.5,h:d*0.5});};
// 1 title
let s=pres.addSlide({masterName:"DARK"});
s.addShape(pres.shapes.OVAL,{x:6.3,y:0.6,w:3.6,h:3.6,fill:{color:K.dk2},line:{color:K.dk2}});
s.addShape(pres.shapes.OVAL,{x:7.25,y:1.55,w:1.7,h:1.7,fill:{color:K.accent1},line:{color:K.accent1}});
s.addImage({data:ic.moon,x:5.9,y:0.45,w:0.6,h:0.6});
s.addImage({data:await icon(F.FaBookOpen,K.dk1),x:7.65,y:1.95,w:0.9,h:0.9});
T(s,"LIGHTNING TALK · 3 นาที",{x:0.5,y:1.0,w:5.5,h:0.4,fontSize:14,color:K.accent1,bold:true,charSpacing:2});
T(s,"ติวสอบคืนเดียว",{x:0.5,y:1.45,w:5.8,h:0.9,fontFace:"Kanit",fontSize:44,bold:true,color:"FFFFFF"});
T(s,"กับ NotebookLM",{x:0.5,y:2.3,w:5.8,h:0.9,fontFace:"Kanit",fontSize:44,bold:true,color:K.accent1});
T(s,"AI ที่อ่านเอกสาร “ของเรา” แล้วติวให้ ไม่มั่วข้อมูลจากที่อื่น",{x:0.5,y:3.3,w:5.6,h:0.6,fontSize:16,color:"C9CCE8"});
T(s,"นำเสนอโดย มะลิ ใจดี · ตัวอย่างสมมุติ",{x:0.5,y:4.3,w:5,h:0.35,fontSize:12,color:"8B8FB5"});
s.addNotes("(เปิดด้วยน้ำเสียงสบาย ๆ) สวัสดีค่ะ ใครเคยเปิดชีตเรียนคืนก่อนสอบแล้วรู้สึกว่า… ไม่ทันแน่ ๆ บ้างคะ วันนี้มี 3 นาทีจะพาไปรู้จักผู้ช่วยติวที่ชื่อ NotebookLM");
// 2 hook stat
s=pres.addSlide({masterName:"DARK"});
T(s,"300",{x:0.5,y:0.6,w:5.2,h:2.4,fontFace:"Kanit",fontSize:160,bold:true,color:K.accent1});
T(s,"หน้า",{x:5.0,y:2.0,w:2,h:0.8,fontFace:"Kanit",fontSize:36,bold:true,color:"FFFFFF"});
T(s,"สไลด์ + ชีต + บทความ ที่ต้องอ่านก่อนสอบปลายภาค 1 วิชา",{x:0.5,y:3.15,w:6.5,h:0.5,fontSize:18,color:"C9CCE8"});
T(s,[{text:"เหลือเวลา ",options:{color:"FFFFFF"}},{text:"1 คืน",options:{color:K.accent3,bold:true}},{text:" … อ่านทันไหม? 😱",options:{color:"FFFFFF"}}],{x:0.5,y:3.75,w:7,h:0.6,fontFace:"Kanit",fontSize:26});
circ(s,7.6,1.0,1.8,K.dk2,await icon(F.FaClock,K.accent3));
s.addNotes("ตัวเลขนี้ไม่เกินจริงเลย วิชาหนึ่งมีสไลด์ ชีต และบทความรวมกันเป็นร้อยหน้า ถ้าเหลือคืนเดียว อ่านทุกหน้าไม่ทันแน่นอน (หยุด 1 จังหวะ)");
// 3 problem cards
s=pres.addSlide({masterName:"LIGHT"}); title(s,"ปัญหาคือ… ไม่ใช่แค่อ่านไม่ทัน");
const probs=[[ic.clock,K.accent3,"อ่านไม่ทัน","เอกสารเยอะ เวลาน้อย ไม่รู้ว่าเรื่องไหนสำคัญ"],[ic.robot,K.accent2,"AI ทั่วไปตอบมั่ว","ถามแชตบอตแล้วได้คำตอบที่ไม่ตรงกับที่อาจารย์สอน"],[ic.brain,K.accent4,"อ่านแล้วไม่จำ","อ่านผ่าน ๆ ไม่ได้ทดสอบตัวเอง เข้าห้องสอบแล้วลืม"]];
probs.forEach((p,i)=>{const x=0.5+i*3.07;
 s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y:1.35,w:2.85,h:3.4,rectRadius:0.15,fill:{color:"FFFFFF"},line:{color:"E2E4F0"},shadow:{type:"outer",color:"15172B",opacity:0.08,blur:8,offset:2,angle:90}});
 circ(s,x+0.3,1.65,0.95,p[1],p[0]);
 T(s,p[2],{x:x+0.3,y:2.8,w:2.3,h:0.5,fontFace:"Kanit",fontSize:20,bold:true,color:K.dk1});
 T(s,p[3],{x:x+0.3,y:3.35,w:2.3,h:1.2,fontSize:15,color:"475569",valign:"top"});});
s.addNotes("ปัญหามีสามชั้น หนึ่ง อ่านไม่ทัน สอง ถาม AI ทั่วไปบางทีมันก็แต่งคำตอบ เพราะไม่ได้อ่านเอกสารของวิชาเรา สาม อ่านแล้วไม่ได้ทดสอบตัวเอง ก็ลืม");
// 4 solution
s=pres.addSlide({masterName:"LIGHT"}); title(s,"NotebookLM = AI ที่ตอบจากเอกสารของเรา");
T(s,[{text:"อัปโหลดสไลด์ PDF หรือ Google Docs ของวิชา แล้วถามได้เลย",options:{breakLine:true}},{text:"ทุกคำตอบมีเลขอ้างอิง กดแล้วเด้งไปย่อหน้าต้นทาง",options:{breakLine:true,bullet:true}},{text:"ถ้าในเอกสารไม่มี มันจะบอกว่าไม่พบ ไม่แต่งเอง",options:{breakLine:true,bullet:true}},{text:"ฟรี ใช้บัญชี Google ของมหาวิทยาลัยได้",options:{bullet:true}}],{x:0.5,y:1.3,w:4.6,h:3.2,fontSize:17,color:K.dk1,paraSpaceAfter:10,valign:"top"});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.5,y:1.25,w:4.0,h:3.15,rectRadius:0.15,fill:{color:K.dk1},line:{color:K.dk1}});
T(s,"แหล่งข้อมูล",{x:5.75,y:1.45,w:3.5,h:0.3,fontSize:12,color:"8B8FB5"});
["📄 สไลด์บทที่ 9.pdf","📄 ชีตสรุป PDPA","🔗 บทความ Phishing"].forEach((t,i)=>{s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.75,y:1.8+i*0.42,w:3.5,h:0.34,rectRadius:0.08,fill:{color:K.dk2},line:{color:K.dk2}});T(s,t,{x:5.9,y:1.8+i*0.42,w:3.3,h:0.34,fontSize:12,color:"FFFFFF",valign:"middle"});});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.75,y:3.15,w:3.5,h:1.05,rectRadius:0.1,fill:{color:K.accent1},line:{color:K.accent1}});
T(s,[{text:"CIA Triad ประกอบด้วย Confidentiality, Integrity และ Availability ",options:{}},{text:"[1]",options:{bold:true,color:K.hlink}}],{x:5.9,y:3.25,w:3.25,h:0.85,fontSize:13,color:K.dk1,valign:"top"});
s.addNotes("NotebookLM ต่างจากแชตบอตทั่วไปตรงที่มันตอบจากเอกสารที่เราใส่เท่านั้น ทุกคำตอบมีเลขอ้างอิง กดแล้วไปดูต้นฉบับได้เลย");
// 5 steps
s=pres.addSlide({masterName:"DARK"}); title(s,"3 ขั้น ใช้เวลาไม่ถึง 5 นาที",true);
const st=[[ic.up,"1","อัปโหลด","สไลด์/ชีต/ลิงก์ของวิชา สูงสุดหลายสิบไฟล์ต่อสมุด"],[ic.chat,"2","ถาม","“สรุป 5 เรื่องที่น่าจะออกสอบ พร้อมอ้างอิง”"],[ic.head,"3","ติว","ให้ทำ Quiz/แฟลชการ์ด หรือฟังสรุปเป็นเสียงระหว่างเดินทาง"]];
st.forEach((p,i)=>{const x=0.5+i*3.1;
 circ(s,x,1.5,1.1,K.accent1,p[0]);
 T(s,p[1],{x:x+1.3,y:1.45,w:1.2,h:1.2,fontFace:"Kanit",fontSize:60,bold:true,color:K.dk2});
 T(s,p[2],{x,y:2.85,w:2.8,h:0.55,fontFace:"Kanit",fontSize:24,bold:true,color:"FFFFFF"});
 T(s,p[3],{x,y:3.45,w:2.75,h:1.2,fontSize:15,color:"C9CCE8",valign:"top"});
 if(i<2) T(s,"➜",{x:x+2.55,y:1.75,w:0.5,h:0.6,fontSize:28,color:K.accent1});});
s.addNotes("วิธีใช้มีแค่สามขั้น (ถ้าสาธิตได้ เปิดหน้าจอจริงตรงนี้ 30 วินาที) อัปโหลด ถาม แล้วให้มันติวเรา");
// 6 prompts
s=pres.addSlide({masterName:"LIGHT"}); title(s,"ก๊อปไปใช้ได้เลย: 3 Prompt ติวสอบ");
const pr=[[K.accent2,"สรุป","สรุปเอกสารทั้งหมดเป็น 5 หัวข้อหลัก แต่ละหัวข้อ 2 บรรทัด พร้อมอ้างอิง"],[K.accent4,"ทดสอบ","ออกข้อสอบปรนัย 10 ข้อจากเอกสาร อย่าเพิ่งเฉลย รอฉันตอบก่อน"],[K.accent5,"อธิบาย","อธิบายเรื่องที่ฉันตอบผิดให้เด็ก ม.3 เข้าใจ แล้วยกตัวอย่างในชีวิตนิสิต"]];
pr.forEach((p,i)=>{const y=1.3+i*1.22;
 s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.5,y,w:9,h:1.02,rectRadius:0.12,fill:{color:"FFFFFF"},line:{color:"E2E4F0"}});
 s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.7,y:y+0.27,w:1.3,h:0.48,rectRadius:0.24,fill:{color:p[0]},line:{color:p[0]}});
 T(s,p[1],{x:0.7,y:y+0.27,w:1.3,h:0.48,fontFace:"Kanit",fontSize:16,bold:true,color:K.dk1,align:"center",valign:"middle"});
 T(s,"“"+p[2]+"”",{x:2.25,y:y+0.1,w:7.0,h:0.82,fontSize:16,color:K.dk1,valign:"middle",italic:true});});
s.addNotes("สาม prompt นี้คือสูตรติวคืนเดียว สรุป ทดสอบ แล้วให้อธิบายข้อที่ผิด สังเกตว่าเราสั่งให้มันยังไม่เฉลย เพื่อให้สมองเราได้คิดเองก่อน");
// 7 compare
s=pres.addSlide({masterName:"LIGHT"}); title(s,"ต่างจากแชตบอตทั่วไปยังไง");
const col=(x,head,fill,fg,rows,img)=>{s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y:1.3,w:4.35,h:3.55,rectRadius:0.15,fill:{color:fill},line:{color:fill}});
 T(s,head,{x:x+0.3,y:1.5,w:3.8,h:0.5,fontFace:"Kanit",fontSize:22,bold:true,color:fg});
 rows.forEach((r,i)=>{s.addImage({data:img,x:x+0.3,y:2.2+i*0.62,w:0.32,h:0.32});T(s,r,{x:x+0.75,y:2.12+i*0.62,w:3.4,h:0.5,fontSize:15,color:fg,valign:"middle"});});};
col(0.5,"แชตบอตทั่วไป","FFFFFF",K.dk1,["ตอบจากความรู้กว้าง ๆ ทั้งอินเทอร์เน็ต","อาจแต่งข้อมูล/อ้างอิงที่ไม่มีจริง","ไม่รู้ว่าอาจารย์สอนอะไร","เหมาะกับระดมไอเดีย"],ic.x);
col(5.15,"NotebookLM",K.dk1,"FFFFFF",["ตอบจากเอกสารที่เราใส่เท่านั้น","มีเลขอ้างอิง กดดูต้นฉบับได้","ตรงกับเนื้อหาวิชาของเรา","เหมาะกับติวสอบ อ่านเอกสารยาว"],ic.check);
s.addNotes("ไม่ได้บอกว่าแชตบอตทั่วไปไม่ดีนะคะ แต่ใช้คนละงาน ระดมไอเดียใช้แชตบอต ติวจากชีตวิชาใช้ NotebookLM");
// 8 caution
s=pres.addSlide({masterName:"LIGHT"}); title(s,"ใช้ให้ฉลาด: 3 ข้อห้ามลืม");
const cau=[[ic.eye,K.accent5,"กดดูอ้างอิงเสมอ","AI ยังสรุปพลาดได้ เทียบกับต้นฉบับก่อนจำ"],[ic.lock,K.accent3,"ไม่อัปโหลดของลับ","ข้อมูลส่วนตัว ข้อสอบเก่าที่ห้ามเผยแพร่ งานวิจัยที่ยังไม่ตีพิมพ์"],[ic.note,K.accent4,"ติว ไม่ใช่ลอก","ใช้ช่วยเข้าใจ แต่การบ้านต้องเขียนเอง และบอกว่าใช้ AI ตรงไหน"]];
cau.forEach((p,i)=>{const y=1.3+i*1.2;
 circ(s,0.5,y,0.9,p[1],p[0]);
 T(s,p[2],{x:1.65,y:y+0.02,w:7.5,h:0.45,fontFace:"Kanit",fontSize:20,bold:true,color:K.dk1});
 T(s,p[3],{x:1.65,y:y+0.45,w:7.8,h:0.45,fontSize:15,color:"475569"});});
s.addNotes("ข้อควรระวังสามข้อ กดดูอ้างอิง ไม่อัปโหลดของลับ และใช้ติว ไม่ใช่ใช้ลอก");
// 9 closing
s=pres.addSlide({masterName:"DARK"});
T(s,"อ่านน้อยลง",{x:0.5,y:1.0,w:9,h:0.9,fontFace:"Kanit",fontSize:48,bold:true,color:"FFFFFF",align:"center"});
T(s,"เข้าใจมากขึ้น",{x:0.5,y:1.85,w:9,h:0.9,fontFace:"Kanit",fontSize:48,bold:true,color:K.accent1,align:"center"});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:2.6,y:3.25,w:4.8,h:0.75,rectRadius:0.37,fill:{color:K.accent1},line:{color:K.accent1}});
T(s,"ลองคืนนี้ → notebooklm.google",{x:2.6,y:3.25,w:4.8,h:0.75,fontFace:"Kanit",fontSize:20,bold:true,color:K.dk1,align:"center",valign:"middle"});
T(s,"ขอบคุณค่ะ 🙏 มีคำถามไหมคะ",{x:0.5,y:4.3,w:9,h:0.4,fontSize:16,color:"C9CCE8",align:"center"});
s.addNotes("สรุปประโยคเดียว: อ่านน้อยลง แต่เข้าใจมากขึ้น ลองเปิด NotebookLM คืนนี้กับวิชาที่ใกล้สอบที่สุด ขอบคุณค่ะ (รวมเวลาประมาณ 3 นาที)");
await pres.writeFile({fileName:"presentation-example-google-slides.pptx"});
await applyTheme("presentation-example-google-slides.pptx",THEME);
})();
