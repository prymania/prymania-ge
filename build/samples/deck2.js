const pptxgen=require('pptxgenjs'); const icon=require('./icons.js');
const {applyTheme}=require('/root/.claude/skills/synced/bb756478-0139-4914-b848-ef84efc18b2e_016288cf-8eee-4cf1-9bbc-8199cb51631a/pptx/scripts/apply_theme.js');
const F=require('react-icons/fa6');
const THEME={name:"Snap Coral",headFontFace:"Prompt",bodyFontFace:"Sarabun",colors:{dk1:"23305E",lt1:"FFFFFF",dk2:"3B4A86",lt2:"FFF4EF",accent1:"FF6B4A",accent2:"FFD23F",accent3:"3EC1D3",accent4:"7BD389",accent5:"B794F6",accent6:"94A3B8",hlink:"FF6B4A",folHlink:"B794F6"}};
const K=THEME.colors;
(async()=>{
const pres=new pptxgen(); pres.layout="LAYOUT_16x9"; pres.title="ถ่ายปุ๊บ รู้ปั๊บ กับ Google Lens";
pres.theme={headFontFace:THEME.headFontFace,bodyFontFace:THEME.bodyFontFace};
pres.defineSlideMaster({title:"CORAL",background:{color:K.accent1},slideNumber:{x:9.1,y:5.2,w:0.4,h:0.3,fontSize:10,color:"FFFFFF"}});
pres.defineSlideMaster({title:"CREAM",background:{color:K.lt2},objects:[{text:{text:"Google Lens · ตัวอย่าง Assignment 4",options:{x:0.5,y:5.2,w:5,h:0.3,fontSize:10,color:"8A6F66",isTextBox:true,margin:0}}}],slideNumber:{x:9.1,y:5.2,w:0.4,h:0.3,fontSize:10,color:"8A6F66"}});
const T=(s,t,o={})=>s.addText(t,{isTextBox:true,margin:0,...o});
const title=(s,t,c=K.dk1)=>T(s,t,{x:0.5,y:0.35,w:9,h:0.7,fontFace:"Prompt",fontSize:32,bold:true,color:c});
// viewfinder corners motif
const vf=(s,x,y,w,h,c,t=0.07,l=0.45)=>{[[x,y],[x+w-l,y],[x,y+h-t],[x+w-l,y+h-t]].forEach(([a,b])=>s.addShape(pres.shapes.RECTANGLE,{x:a,y:b,w:l,h:t,fill:{color:c},line:{color:c}}));
 [[x,y],[x+w-t,y],[x,y+h-l],[x+w-t,y+h-l]].forEach(([a,b])=>s.addShape(pres.shapes.RECTANGLE,{x:a,y:b,w:t,h:l,fill:{color:c},line:{color:c}}));};
const tile=(s,x,y,w,h,fill,ic,head,body,fg=K.dk1,hh=0.45)=>{s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:0.2,fill:{color:fill},line:{color:fill}});
 s.addImage({data:ic,x:x+0.3,y:y+0.3,w:0.55,h:0.55}); T(s,head,{x:x+0.3,y:y+1.0,w:w-0.6,h:hh,valign:"top",fontFace:"Prompt",fontSize:19,bold:true,color:fg}); T(s,body,{x:x+0.3,y:y+1.05+hh,w:w-0.6,h:h-1.2-hh,fontSize:14,color:fg,valign:"top"});};
// 1
let s=pres.addSlide({masterName:"CORAL"});
vf(s,0.5,0.55,9,4.5,"FFFFFF");
T(s,"📷 LIGHTNING TALK 3 นาที",{x:1.0,y:1.0,w:6,h:0.4,fontSize:14,bold:true,color:K.accent2,charSpacing:2});
T(s,"ถ่ายปุ๊บ",{x:1.0,y:1.45,w:6,h:1.0,fontFace:"Prompt",fontSize:58,bold:true,color:"FFFFFF"});
T(s,"รู้ปั๊บ",{x:1.0,y:2.4,w:6,h:1.0,fontFace:"Prompt",fontSize:58,bold:true,color:K.dk1});
T(s,"Google Lens ผู้ช่วยในกล้องมือถือที่นิสิตยังใช้ไม่สุด",{x:1.0,y:3.5,w:6,h:0.5,fontSize:18,color:"FFFFFF"});
s.addShape(pres.shapes.OVAL,{x:6.9,y:1.3,w:2.2,h:2.2,fill:{color:K.accent2},line:{color:K.accent2}});
s.addImage({data:await icon(F.FaCamera,K.dk1),x:7.45,y:1.85,w:1.1,h:1.1});
T(s,"นำเสนอโดย ต้นกล้า ใจเย็น · ตัวอย่างสมมุติ",{x:1.0,y:4.35,w:6,h:0.3,fontSize:12,color:"FFE3DA"});
s.addNotes("สวัสดีครับ ทุกคนมีกล้องในมือถือ แต่รู้ไหมว่ากล้องตัวเดียวกันนี้ ‘อ่าน แปล และค้นหา’ ให้เราได้ด้วย วันนี้ 3 นาทีมารู้จัก Google Lens กันครับ");
// 2 hook
s=pres.addSlide({masterName:"CREAM"});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.5,y:0.5,w:4.4,h:4.4,rectRadius:0.25,fill:{color:"DDF3E1"},line:{color:"DDF3E1"}});
T(s,"🌿",{x:0.5,y:1.2,w:4.4,h:2.4,fontSize:150,align:"center",valign:"middle"});
vf(s,0.9,0.9,3.6,3.6,K.accent1,0.06,0.4);
T(s,"เจอต้นนี้หน้าตึกเรียน",{x:5.3,y:1.2,w:4.3,h:0.6,fontFace:"Prompt",fontSize:26,bold:true,color:K.dk1});
T(s,"ชื่ออะไร? กินได้ไหม? มีพิษหรือเปล่า?",{x:5.3,y:1.85,w:4.3,h:0.9,fontSize:20,color:K.dk1});
T(s,[{text:"ถ้าต้องพิมพ์ค้นหา… จะพิมพ์ว่าอะไรดี? ",options:{}},{text:"🤔",options:{}}],{x:5.3,y:3.0,w:4.3,h:0.9,fontFace:"Prompt",fontSize:20,color:K.accent1,bold:true});
s.addNotes("ลองนึกภาพ เจอต้นไม้แปลก ๆ หรือของที่ไม่รู้จัก เราจะพิมพ์ค้นว่าอะไร ‘ต้นไม้ใบเขียวมีขน’? มันยากมาก นี่คือปัญหาที่ Lens แก้ได้");
// 3 what
s=pres.addSlide({masterName:"CREAM"}); title(s,"Lens ทำอะไรได้บ้าง");
const items=[[K.accent2,F.FaLanguage,"แปลภาษา","ส่องเมนู ป้าย ฉลากยา แปลทับภาพทันที"],[K.accent3,F.FaFont,"ก๊อปข้อความ","ถ่ายกระดาน/หนังสือ แล้วคัดลอกไปวางใน Docs"],[K.accent4,F.FaMagnifyingGlass,"ค้นด้วยภาพ","รู้ชื่อต้นไม้ สัตว์ สถานที่ สินค้า"],[K.accent5,F.FaGraduationCap,"ช่วยการบ้าน","ส่องโจทย์ ดูคำอธิบายและแหล่งเรียนรู้"]];
for(let i=0;i<4;i++){const p=items[i]; tile(s,0.5+i*2.3,1.35,2.1,3.4,p[0],await icon(p[1],K.dk1),p[2],p[3]);}
s.addNotes("Lens ทำได้สี่อย่างหลัก ๆ แปล ก๊อปข้อความ ค้นด้วยภาพ และช่วยการบ้าน ที่ผมใช้บ่อยที่สุดคือก๊อปข้อความจากกระดาน");
// 4 how
s=pres.addSlide({masterName:"CREAM"}); title(s,"ใช้ยังไง: 3 แตะจบ");
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:6.6,y:0.55,w:2.6,h:4.4,rectRadius:0.3,fill:{color:K.dk1},line:{color:K.dk1}});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:6.75,y:0.75,w:2.3,h:3.6,rectRadius:0.15,fill:{color:"FFFFFF"},line:{color:"FFFFFF"}});
vf(s,7.05,1.2,1.7,1.7,K.accent1,0.05,0.3);
T(s,"เมนู\nTom Yum Soup\n= ต้มยำ",{x:7.1,y:1.35,w:1.6,h:1.4,fontSize:12,color:K.dk1,align:"center",valign:"middle"});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:6.95,y:3.25,w:1.9,h:0.38,rectRadius:0.19,fill:{color:K.accent2},line:{color:K.accent2}});
T(s,"แปล · ข้อความ · ค้นหา",{x:6.95,y:3.25,w:1.9,h:0.38,fontSize:10,bold:true,color:K.dk1,align:"center",valign:"middle"});
s.addShape(pres.shapes.OVAL,{x:7.6,y:4.45,w:0.6,h:0.38,fill:{color:K.accent1},line:{color:K.accent1}});
const steps=[["1","เปิด","แอป Google หรือกล้องมือถือ แตะไอคอน Lens 📷"],["2","ส่อง","เล็งไปที่สิ่งที่อยากรู้ แล้วเลือกโหมด แปล / ข้อความ / ค้นหา"],["3","ใช้ต่อ","คัดลอก ฟังเสียงอ่าน หรือเปิดผลค้นหาที่เกี่ยวข้อง"]];
steps.forEach((p,i)=>{const y=1.35+i*1.2;
 s.addShape(pres.shapes.OVAL,{x:0.5,y,w:0.8,h:0.8,fill:{color:K.accent1},line:{color:K.accent1}});
 T(s,p[0],{x:0.5,y,w:0.8,h:0.8,fontFace:"Prompt",fontSize:28,bold:true,color:"FFFFFF",align:"center",valign:"middle"});
 T(s,p[1],{x:1.55,y:y-0.02,w:4.6,h:0.45,fontFace:"Prompt",fontSize:20,bold:true,color:K.dk1});
 T(s,p[2],{x:1.55,y:y+0.42,w:4.8,h:0.5,fontSize:15,color:"5B4A44"});});
s.addNotes("วิธีใช้ง่ายมาก (ถ้าทำได้ สาธิตจริงด้วยการส่องเมนูภาษาอังกฤษ) เปิด ส่อง แล้วเลือกว่าจะแปล ก๊อป หรือค้นหา");
// 5 use cases
s=pres.addSlide({masterName:"CORAL"}); title(s,"3 สถานการณ์จริงของนิสิต","FFFFFF");
const uc=[[F.FaChalkboard,"กระดานเต็ม หมดคาบแล้ว","ถ่ายแล้ว “คัดลอกข้อความ” วางลง Google Docs จดเลกเชอร์ไม่ทันก็ไม่เป็นไร"],[F.FaUtensils,"เมนูร้านอินเตอร์อ่านไม่ออก","ส่องแล้วแปลทับเป็นไทย สั่งได้ไม่ต้องเดา"],[F.FaNewspaper,"ภาพข่าวในกลุ่มไลน์","ค้นด้วยภาพ เช็กว่าภาพเคยลงที่ไหน เมื่อไร ก่อนแชร์"]];
for(let i=0;i<3;i++){const p=uc[i]; tile(s,0.5+i*3.07,1.35,2.85,3.45,"FFFFFF",await icon(p[0],K.accent1),p[1],p[2],K.dk1,0.85);}
s.addNotes("สามสถานการณ์ที่เจอบ่อย กระดานเต็ม เมนูอ่านไม่ออก และภาพข่าวที่ไม่แน่ใจ ข้อสุดท้ายเชื่อมกับบทเรื่องเช็กก่อนเชื่อเลยครับ");
// 6 compare
s=pres.addSlide({masterName:"CREAM"}); title(s,"พิมพ์เอง vs ส่อง Lens");
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.5,y:1.35,w:4.3,h:3.4,rectRadius:0.2,fill:{color:"FFFFFF"},line:{color:"F1D9CF"}});
T(s,"⌨️ พิมพ์ข้อความจากกระดานเอง",{x:0.8,y:1.6,w:3.8,h:0.5,fontFace:"Prompt",fontSize:17,bold:true,color:K.dk1});
T(s,"หลายนาที",{x:0.8,y:2.3,w:3.8,h:1.1,fontFace:"Prompt",fontSize:46,bold:true,color:"B9A49C"});
T(s,"พิมพ์ผิด ตกหล่น ต้องตรวจซ้ำ",{x:0.8,y:3.6,w:3.8,h:0.6,fontSize:15,color:"5B4A44"});
s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.2,y:1.35,w:4.3,h:3.4,rectRadius:0.2,fill:{color:K.dk1},line:{color:K.dk1}});
T(s,"📷 ส่อง Lens แล้วคัดลอก",{x:5.5,y:1.6,w:3.8,h:0.5,fontFace:"Prompt",fontSize:17,bold:true,color:"FFFFFF"});
T(s,"ไม่กี่วินาที",{x:5.5,y:2.3,w:3.8,h:1.1,fontFace:"Prompt",fontSize:46,bold:true,color:K.accent2});
T(s,"แค่ตรวจทานคำที่อ่านผิดเล็กน้อย",{x:5.5,y:3.6,w:3.8,h:0.6,fontSize:15,color:"FFFFFF"});
s.addNotes("เทียบให้เห็นภาพ พิมพ์เองใช้หลายนาทีและพิมพ์ผิด ส่อง Lens ไม่กี่วินาที แค่ตรวจทานนิดหน่อย");
// 7 caution
s=pres.addSlide({masterName:"CREAM"}); title(s,"ใช้ให้ปลอดภัย");
const cs=[[F.FaUserShield,K.accent1,"ไม่ส่องบัตร/เอกสารส่วนตัวพร่ำเพรื่อ","ภาพอาจถูกเก็บไว้ในบัญชี ลบประวัติได้ในการตั้งค่ากิจกรรมของ Google"],[F.FaPeopleGroup,K.accent3,"ถ่ายคนอื่นต้องขออนุญาต","การค้นด้วยหน้าคนอื่นละเมิดความเป็นส่วนตัวได้"],[F.FaCircleCheck,K.accent4,"ผลลัพธ์ไม่ถูกเสมอ","ต้นไม้/ยา/อาหาร ที่เกี่ยวกับสุขภาพ เช็กกับผู้รู้หรือแหล่งทางการอีกครั้ง"]];
for(let i=0;i<3;i++){const p=cs[i]; const y=1.3+i*1.2;
 s.addShape(pres.shapes.OVAL,{x:0.5,y,w:0.9,h:0.9,fill:{color:p[1]},line:{color:p[1]}}); s.addImage({data:await icon(p[0],"FFFFFF"),x:0.72,y:y+0.22,w:0.46,h:0.46});
 T(s,p[2],{x:1.65,y,w:7.8,h:0.45,fontFace:"Prompt",fontSize:19,bold:true,color:K.dk1}); T(s,p[3],{x:1.65,y:y+0.45,w:7.8,h:0.45,fontSize:15,color:"5B4A44"});}
s.addNotes("ข้อควรระวัง ไม่ส่องบัตรส่วนตัว ถ่ายคนอื่นต้องขออนุญาต และผลลัพธ์ไม่ถูกเสมอ โดยเฉพาะเรื่องสุขภาพ");
// 8 closing
s=pres.addSlide({masterName:"CORAL"});
vf(s,1.5,0.9,7,3.2,"FFFFFF");
T(s,"เปิดกล้อง = เปิดโลก",{x:1.5,y:1.5,w:7,h:1.0,fontFace:"Prompt",fontSize:46,bold:true,color:"FFFFFF",align:"center"});
T(s,"การบ้านคืนนี้: ส่องเมนู 1 อย่าง · ก๊อปกระดาน 1 ครั้ง",{x:1.5,y:2.55,w:7,h:0.6,fontSize:20,color:K.dk1,bold:true,align:"center"});
T(s,"ขอบคุณครับ 🙌",{x:1.5,y:4.4,w:7,h:0.5,fontFace:"Prompt",fontSize:20,color:"FFFFFF",align:"center"});
s.addNotes("สรุปประโยคเดียว เปิดกล้องเท่ากับเปิดโลก ลองส่องอะไรสักอย่างคืนนี้ ขอบคุณครับ (รวมประมาณ 3 นาที)");
await pres.writeFile({fileName:"presentation-example-canva.pptx"});
await applyTheme("presentation-example-canva.pptx",THEME);
})();
