const fs=require('fs'); const C=require('./content.js');
const {Document,Packer,Paragraph,TextRun,AlignmentType,Table,TableRow,TableCell,WidthType,BorderStyle,ShadingType,PageBreak,LevelFormat}=require('docx');
const k=[];
const R=(t,o={})=>new TextRun({text:t,...o});
const P=(runs,o={})=>new Paragraph({children:Array.isArray(runs)?runs:[runs],...o});
// mission page (formatted on purpose)
const box={top:{style:BorderStyle.SINGLE,size:12,color:"E0533F",space:6},bottom:{style:BorderStyle.SINGLE,size:12,color:"E0533F",space:6},left:{style:BorderStyle.SINGLE,size:12,color:"E0533F",space:6},right:{style:BorderStyle.SINGLE,size:12,color:"E0533F",space:6}};
k.push(P(R("🛠️ ภารกิจซ่อมเอกสาร (ลบหน้านี้ทิ้งเมื่อทำเสร็จ)",{bold:true,size:36,font:"Arial",color:"B8402F"}),{spacing:{after:200}}));
k.push(P(R("รายงานหน้าถัดไปถูกพิมพ์แบบ “ทำตัวหนาเอง กด Enter รัว ๆ” ทั้งไฟล์ ให้นิสิตอัปโหลดเข้า Google Drive → เปิดด้วย Google เอกสาร แล้วซ่อมตามภารกิจด้านล่าง",{font:"Arial",size:24}),{spacing:{after:200}}));
const tasks=["เปลี่ยนหัวข้อเลข 1. 2. 3. … เป็น “หัวเรื่อง 1” และหัวข้อ 1.1 3.2 … เป็น “หัวเรื่อง 2”","เลือกทั้งหมด (Ctrl+A) → ล้างรูปแบบ (Ctrl+\\) แล้วใช้ฟอนต์ Sarabun ขนาด 16 ทั้งเอกสาร","ลบสารบัญที่พิมพ์เอง แล้ว แทรก → สารบัญ (สารบัญอัตโนมัติ)","ลบบรรทัดว่างที่กด Enter ไว้ดันหน้า ใช้ แทรก → ตัวแบ่ง → ตัวแบ่งหน้า แทน","ใส่ชื่อรายงานที่ส่วนหัว และเลขหน้าที่ส่วนท้ายกระดาษ (หน้าปกไม่ต้องมี)","จัดตาราง: หัวตารางตัวหนา มีสีพื้น และพิมพ์ชื่อตารางไว้เหนือตาราง","แทรกกราฟ/รูปแทนข้อความ [ใส่ภาพ…] พร้อมคำบรรยายใต้ภาพ (สร้างกราฟใน Google Sheets แล้วแทรกได้)","ทำรายการอ้างอิงเป็นลำดับเลข และตรวจคำผิดด้วย เครื่องมือ → การสะกดและไวยากรณ์","แชร์ให้เพื่อน 1 คนเป็นผู้แสดงความคิดเห็น ให้คอมเมนต์ 2 จุด แล้วแก้และกด ✓ (Resolve)","ดาวน์โหลดเป็น PDF แล้วเทียบกับไฟล์ตัวอย่าง docs-example-finished.docx"];
tasks.forEach((t,i)=>k.push(P(R(`☐ ${i+1}. ${t}`,{font:"Arial",size:24}),{border:box,spacing:{after:0}})));
k.push(P([new PageBreak()]));
// messy report
for(let i=0;i<5;i++) k.push(P(R("")));
k.push(P(R(C.title,{bold:true,size:44,font:"Tahoma"}),{alignment:AlignmentType.CENTER}));
k.push(P(R(C.sub,{size:28,font:"Times New Roman"}),{alignment:AlignmentType.CENTER}));
for(let i=0;i<8;i++) k.push(P(R("")));
k.push(P(R("จัดทำโดย",{bold:true,font:"Arial",size:28}),{alignment:AlignmentType.CENTER}));
k.push(P(R(C.author,{font:"Arial",size:28}),{alignment:AlignmentType.CENTER}));
for(let i=0;i<12;i++) k.push(P(R("")));
k.push(P(R("สารบัญ",{bold:true,size:36,font:"Arial"}),{alignment:AlignmentType.CENTER}));
const toc=[["1. บทนำ","1"],["   1.1 ที่มาและความสำคัญ","1"],["   1.2 วัตถุประสงค์","2"],["2. ข้อมูลทั่วไปของชุมชน","2"],["3. การใช้เทคโนโลยีดิจิทัลในชุมชน","3"],["4. ข้อเสนอแนะ","4"],["5. สรุป","5"],["แหล่งอ้างอิง","5"]];
toc.forEach(([a,b])=>k.push(P(R(a+" ......................................................... "+b,{font:"Times New Roman",size:28}))));
for(let i=0;i<14;i++) k.push(P(R("")));
const hfonts=[["Tahoma",36,{}],["Times New Roman",34,{underline:{}}],["Arial",30,{color:"C00000"}],["Tahoma",32,{italics:true}],["Arial",36,{}]];
const bfonts=["Times New Roman","Arial","Tahoma"];
let n=0;
const body=(t,i)=>k.push(P(R(t,{font:bfonts[(n+i)%3],size:[28,30,26][(n+i)%3]})));
for(const s of C.sections){ const [f,sz,ex]=hfonts[n]; n++;
 k.push(P(R(`${n}. ${s.h}`,{bold:true,font:f,size:sz,...ex})));
 (s.p||[]).forEach(body);
 (s.bullets||[]).forEach(t=>k.push(P(R("- "+t,{font:"Arial",size:28}))));
 let m=0;
 for(const ss of (s.subs||[])){ m++;
  k.push(P(R(`${n}.${m} ${ss.h}`,{bold:true,font:bfonts[m%3],size:30})));
  (ss.p||[]).forEach(body);
  (ss.bullets||[]).forEach(t=>k.push(P(R("- "+t,{font:"Times New Roman",size:28}))));
  if(ss.table){ const t=C.table, cw=[3000,3000,3000];
   k.push(new Table({width:{size:9000,type:WidthType.DXA},columnWidths:cw,rows:[t.head,...t.rows].map(r=>new TableRow({children:r.map((x,i)=>new TableCell({width:{size:cw[i],type:WidthType.DXA},children:[P(R(x,{font:"Arial",size:24}))]}))}))}));
   k.push(P(R(""))); }
  if(ss.chart){ k.push(P(R("[ใส่ภาพกราฟตรงนี้ — สร้างกราฟจากตารางด้านบนใน Google Sheets แล้วแทรก]",{color:"FF0000",highlight:"yellow",font:"Arial",size:28}))); }
 }
 for(let i=0;i<3;i++) k.push(P(R("")));
}
k.push(P(R("แหล่งอ้างอิง",{bold:true,size:36,font:"Tahoma"})));
C.refs.forEach(t=>k.push(P(R(t,{font:"Arial",size:26}))));
const doc=new Document({styles:{default:{document:{run:{font:"Arial",size:28}}}},sections:[{properties:{page:{margin:{top:1440,bottom:1440,left:1440,right:1440}}},children:k}]});
Packer.toBuffer(doc).then(b=>fs.writeFileSync("docs-practice-fix-me.docx",b));
