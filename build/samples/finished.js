const fs=require('fs'); const C=require('./content.js');
const {Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,TableOfContents,Header,Footer,PageNumber,Table,TableRow,TableCell,WidthType,ShadingType,BorderStyle,ImageRun,LevelFormat,PageBreak}=require('docx');
const FONT="Sarabun";
const P=(t,o={})=>new Paragraph({children:[new TextRun({text:t,...(o.run||{})})],spacing:{after:120,line:340},...o.p});
const kids=[];
kids.push(new Paragraph({spacing:{before:2400}}));
kids.push(new Paragraph({heading:HeadingLevel.TITLE,alignment:AlignmentType.CENTER,children:[new TextRun(C.title)]}));
kids.push(P(C.sub,{p:{alignment:AlignmentType.CENTER},run:{size:30}}));
kids.push(new Paragraph({spacing:{before:2400}}));
kids.push(P("จัดทำโดย",{p:{alignment:AlignmentType.CENTER},run:{bold:true}}));
kids.push(P(C.author,{p:{alignment:AlignmentType.CENTER}}));
kids.push(P("มหาวิทยาลัยมหาสารคาม",{p:{alignment:AlignmentType.CENTER}}));
kids.push(new Paragraph({children:[new PageBreak()]}));
kids.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun("สารบัญ")],pageBreakBefore:false}));
kids.push(new TableOfContents("สารบัญ",{hyperlink:true,headingStyleRange:"1-2"}));
kids.push(new Paragraph({children:[new PageBreak()]}));
const W=9000;
function table(){
 const t=C.table; const cw=[4200,2400,2400];
 const cell=(txt,h,i)=>new TableCell({width:{size:cw[i],type:WidthType.DXA},shading:h?{type:ShadingType.CLEAR,fill:"D9EAF7",color:"auto"}:undefined,margins:{top:60,bottom:60,left:120,right:120},children:[new Paragraph({alignment:i?AlignmentType.CENTER:AlignmentType.LEFT,children:[new TextRun({text:txt,bold:h})]})]});
 return [new Paragraph({keepNext:true,spacing:{before:200,after:80},children:[new TextRun({text:t.cap,bold:true})]}),
  new Table({width:{size:W,type:WidthType.DXA},columnWidths:cw,rows:[new TableRow({tableHeader:true,children:t.head.map((x,i)=>cell(x,true,i))}),...t.rows.map(r=>new TableRow({children:r.map((x,i)=>cell(x,false,i))}))]}),
  new Paragraph({spacing:{after:120}})];
}
let n=0;
for(const s of C.sections){ n++;
 kids.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(`${n}. ${s.h}`)]}));
 (s.p||[]).forEach(t=>kids.push(P(t,{p:{indent:{firstLine:720}}})));
 (s.bullets||[]).forEach(t=>kids.push(new Paragraph({numbering:{reference:"b",level:0},spacing:{after:80},children:[new TextRun(t)]})));
 let m=0;
 for(const ss of (s.subs||[])){ m++;
  kids.push(new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun(`${n}.${m} ${ss.h}`)]}));
  (ss.p||[]).forEach(t=>kids.push(P(t,{p:{indent:{firstLine:720}}})));
  (ss.bullets||[]).forEach(t=>kids.push(new Paragraph({numbering:{reference:"b",level:0},spacing:{after:80},children:[new TextRun(t)]})));
  if(ss.table) kids.push(...table());
  if(ss.chart){ kids.push(new Paragraph({alignment:AlignmentType.CENTER,keepNext:true,children:[new ImageRun({type:"png",data:fs.readFileSync("chart.png"),transformation:{width:560,height:288}})]}));
   kids.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:C.chartCap,italics:true,size:26})]})); }
 }
}
kids.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun("แหล่งอ้างอิง")]}));
C.refs.forEach(t=>kids.push(new Paragraph({numbering:{reference:"n",level:0},spacing:{after:80},children:[new TextRun(t)]})));
const hs=(sz)=>({run:{font:FONT,size:sz,bold:true,color:"1F3864"},paragraph:{spacing:{before:240,after:120},keepNext:true}});
const doc=new Document({
 styles:{default:{document:{run:{font:FONT,size:32}},title:{run:{font:FONT,size:52,bold:true,color:"1F3864"},paragraph:{spacing:{before:0,after:200},keepNext:true}},heading1:hs(40),heading2:{run:{font:FONT,size:34,bold:true,color:"2E5597"},paragraph:{spacing:{before:200,after:100},keepNext:true}}}},
 numbering:{config:[{reference:"b",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]},{reference:"n",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},
 features:{updateFields:true},
 sections:[{properties:{page:{margin:{top:1440,bottom:1440,left:1440,right:1440},pageNumbers:{start:1}},titlePage:true},
  headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:C.title,size:24,color:"808080"})]})]}),first:new Header({children:[new Paragraph("")]})},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:["— ",PageNumber.CURRENT," —"],size:24})]})]}),first:new Footer({children:[new Paragraph("")]})},
  children:kids}]});
Packer.toBuffer(doc).then(b=>fs.writeFileSync("docs-example-finished.docx",b));
