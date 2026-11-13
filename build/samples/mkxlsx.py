import data
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.formatting.rule import CellIsRule
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.chart import BarChart, PieChart, ScatterChart, Reference, Series
from openpyxl.comments import Comment
F="Arial"
H=Font(name=F,bold=True,color="FFFFFF"); B=Font(name=F,bold=True); N=Font(name=F); T=Font(name=F,bold=True,size=14)
GREEN=PatternFill("solid",fgColor="0F9D58"); YEL=PatternFill("solid",fgColor="FFF2CC"); GRAY=PatternFill("solid",fgColor="F3F3F3"); BLUE=PatternFill("solid",fgColor="E8F0FE")
thin=Side(style="thin",color="D0D0D0"); BOX=Border(left=thin,right=thin,top=thin,bottom=thin)
wb=Workbook()
def head(ws,row,cols,fill=GREEN):
    for j,c in enumerate(cols,1):
        x=ws.cell(row,j,c); x.font=H; x.fill=fill; x.alignment=Alignment(horizontal="center",vertical="center",wrap_text=True); x.border=BOX
def font_all(ws):
    for r in ws.iter_rows():
        for c in r:
            if c.font is None or c.font.name!=F: c.font=Font(name=F,bold=c.font.bold if c.font else False,color=c.font.color if c.font else None,size=c.font.size if c.font else 11)
# --- README
ws=wb.active; ws.title="อ่านก่อน"
rows=[("ไฟล์ฝึก Google Sheets — วิชาทักษะและชีวิตดิจิทัล (Digital Literacy)",T),
("ข้อมูลทั้งหมดในไฟล์นี้เป็นข้อมูลสมมุติ สร้างขึ้นเพื่อฝึกเท่านั้น",N),("",N),
("วิธีเปิดใน Google Sheets: Google Drive → ใหม่ → อัปโหลดไฟล์ → คลิกขวาที่ไฟล์ → เปิดด้วย → Google ชีต",N),("",N),
("ชีตในไฟล์นี้",B),
("1) ฝึก_คะแนน — คะแนนนิสิต 40 คน ให้เติมสูตรในช่องสีเหลือง (แถว 2 มีสูตรตัวอย่างให้ดูแล้ว)",N),
("2) เฉลย_คะแนน — สูตรครบทุกช่อง ใช้เทียบหลังทำเสร็จ (อย่าเพิ่งเปิดดูนะ 😉)",N),
("3) ฝึก_VLOOKUP — พิมพ์รหัสนิสิตแล้วให้สูตรหาชื่อ คณะ และเกรดให้เอง",N),
("4) ผลแบบสำรวจ — คำตอบจากแบบสำรวจ 'ชีวิตดิจิทัลของนิสิต' 60 คน (หน้าตาเหมือนคำตอบที่ Google Forms ส่งเข้าชีต)",N),
("5) สรุปแบบสำรวจ — ตัวอย่างการสรุปด้วย COUNTIF / AVERAGEIF และกราฟ 3 แบบ",N),("",N),
("สัญลักษณ์สี",B),("พื้นเหลือง = ช่องที่ให้นิสิตเติมสูตร",N),("พื้นเขียว = หัวตาราง (ไม่ต้องแก้)",N),("",N),
("ภารกิจ (ทำในชีต ฝึก_คะแนน)",B),
("① รวมคะแนน (SUM)  ② ตัดเกรดด้วย IFS  ③ ผ่าน/ไม่ผ่านด้วย IF  ④ ลากสูตรลงทั้งคอลัมน์",N),
("⑤ เติมตารางสรุปด้านขวา: เฉลี่ย สูงสุด ต่ำสุด นับจำนวนแต่ละเกรด (COUNTIF) เฉลี่ยแยกคณะ (AVERAGEIF)",N),
("⑥ จัดรูปแบบตามเงื่อนไข: รวม < 50 เป็นสีแดง  ⑦ สร้างตัวกรอง และตรึงแถวแรก  ⑧ ทำกราฟแท่ง 'จำนวนนิสิตแต่ละเกรด'",N),("",N),
("เกณฑ์เกรด: A ≥ 80 · B+ ≥ 75 · B ≥ 70 · C+ ≥ 65 · C ≥ 60 · D+ ≥ 55 · D ≥ 50 · F < 50",N)]
for i,(t,f) in enumerate(rows,1):
    c=ws.cell(i,1,t); c.font=f
ws.cell(14,1).fill=YEL; ws.cell(15,1).fill=GREEN; ws.cell(15,1).font=H
ws.column_dimensions["A"].width=120
COLS=["รหัสนิสิต","ชื่อ","คณะ","งาน (50)","สอบย่อย (10)","มีส่วนร่วม (10)","ปลายภาค (30)","รวม (100)","เกรด","ผ่าน/ไม่ผ่าน"]
IFS='=_xlfn.IFS(H{r}>=80,"A",H{r}>=75,"B+",H{r}>=70,"B",H{r}>=65,"C+",H{r}>=60,"C",H{r}>=55,"D+",H{r}>=50,"D",TRUE,"F")'
n=len(data.stu); last=n+1
def scores(ws,solution):
    head(ws,1,COLS)
    for i,s in enumerate(data.stu,2):
        for j,v in enumerate([s["id"],s["name"],s["fac"],s["a"],s["q"],s["p"],s["f"]],1):
            c=ws.cell(i,j,v); c.font=N; c.border=BOX
        for j in (8,9,10):
            c=ws.cell(i,j); c.border=BOX; c.font=N
            if solution or i==2:
                c.value={8:f"=SUM(D{i}:G{i})",9:IFS.format(r=i),10:f'=IF(H{i}>=50,"ผ่าน","ไม่ผ่าน")'}[j]
            else: c.fill=YEL
            c.alignment=Alignment(horizontal="center")
    if not solution:
        ws["H2"].comment=Comment("ตัวอย่าง: แถว 2 ใส่สูตรให้แล้ว ลองดับเบิลคลิกจุดสี่เหลี่ยมมุมขวาล่างของ H2:J2 เพื่อลากสูตรลง","อ.พราย")
    # summary
    ws["L1"]="ตารางสรุป"; ws["L1"].font=B
    summ=[("คะแนนรวมเฉลี่ย",f"=ROUND(AVERAGE(H2:H{last}),2)"),("คะแนนสูงสุด",f"=MAX(H2:H{last})"),("คะแนนต่ำสุด",f"=MIN(H2:H{last})"),("จำนวนนิสิต",f"=COUNTA(B2:B{last})"),("จำนวนที่ผ่าน",f'=COUNTIF(J2:J{last},"ผ่าน")')]
    r=2
    for lab,fm in summ:
        ws.cell(r,12,lab).font=N; c=ws.cell(r,13,fm if solution else None); c.font=N; c.border=BOX
        if not solution: c.fill=YEL
        r+=1
    r+=1; ws.cell(r,12,"เกรด").font=H; ws.cell(r,12).fill=GREEN; ws.cell(r,13,"จำนวนคน").font=H; ws.cell(r,13).fill=GREEN; gstart=r+1
    for g in ["A","B+","B","C+","C","D+","D","F"]:
        r+=1; ws.cell(r,12,g).font=N; c=ws.cell(r,13,f'=COUNTIF($I$2:$I${last},L{r})' if solution else None); c.font=N; c.border=BOX
        if not solution: c.fill=YEL
    gend=r
    r+=2; ws.cell(r,12,"คณะ").font=H; ws.cell(r,12).fill=GREEN; ws.cell(r,13,"รวมเฉลี่ย").font=H; ws.cell(r,13).fill=GREEN
    for f in data.fac if False else ["วิทยาศาสตร์","บัญชีและการจัดการ","ศึกษาศาสตร์","วิศวกรรมศาสตร์","มนุษยศาสตร์และสังคมศาสตร์"]:
        r+=1; ws.cell(r,12,f).font=N; c=ws.cell(r,13,f'=ROUND(AVERAGEIF($C$2:$C${last},L{r},$H$2:$H${last}),2)' if solution else None); c.font=N; c.border=BOX
        if not solution: c.fill=YEL
    widths={"A":12,"B":12,"C":26,"D":10,"E":11,"F":12,"G":11,"H":10,"I":8,"J":11,"K":3,"L":26,"M":12}
    for k,v in widths.items(): ws.column_dimensions[k].width=v
    ws.freeze_panes="A2"
    if solution:
        ws.auto_filter.ref=f"A1:J{last}"
        ws.conditional_formatting.add(f"H2:H{last}",CellIsRule(operator="lessThan",formula=["50"],fill=PatternFill("solid",fgColor="F4CCCC"),font=Font(name=F,color="990000")))
        ws.conditional_formatting.add(f"I2:I{last}",CellIsRule(operator="equal",formula=['"A"'],fill=PatternFill("solid",fgColor="D9EAD3")))
        ch=BarChart(); ch.title="จำนวนนิสิตแต่ละเกรด"; ch.y_axis.title="คน"; ch.x_axis.title="เกรด"; ch.legend=None
        ch.add_data(Reference(ws,min_col=13,min_row=gstart-1,max_row=gend),titles_from_data=True); ch.set_categories(Reference(ws,min_col=12,min_row=gstart,max_row=gend))
        ch.height=7.5; ch.width=14; ws.add_chart(ch,"O2")
    dv=DataValidation(type="decimal",operator="between",formula1="0",formula2="50",showErrorMessage=True,error="คะแนนงานต้องอยู่ระหว่าง 0–50"); ws.add_data_validation(dv); dv.add(f"D2:D{last}")
ws1=wb.create_sheet("ฝึก_คะแนน"); scores(ws1,False)
ws2=wb.create_sheet("เฉลย_คะแนน"); scores(ws2,True)
# VLOOKUP
ws=wb.create_sheet("ฝึก_VLOOKUP")
ws["A1"]="พิมพ์รหัสนิสิตในช่องสีเหลือง แล้วดูว่าสูตรหาข้อมูลจากชีต เฉลย_คะแนน ให้อัตโนมัติ"; ws["A1"].font=B
ws["A3"]="รหัสนิสิต"; ws["B3"]=data.stu[4]["id"]; ws["B3"].fill=YEL
labs=[("ชื่อ",2),("คณะ",3),("คะแนนรวม",8),("เกรด",9)]
for k,(lab,col) in enumerate(labs,4):
    ws.cell(k,1,lab); ws.cell(k,2,f"=IFERROR(VLOOKUP($B$3,เฉลย_คะแนน!$A$2:$J${last},{col},FALSE),\"ไม่พบรหัสนี้\")")
ws["A10"]="สูตรที่ใช้ (ช่อง B4):"; ws["A10"].font=B
ws["A11"]=f"=VLOOKUP($B$3, เฉลย_คะแนน!$A$2:$J${last}, 2, FALSE)  → หาในคอลัมน์ A ของตาราง แล้วคืนค่าคอลัมน์ที่ 2 (ชื่อ) · FALSE = หาแบบตรงตัว"
ws["A11"].value="'"+ws["A11"].value if False else ws["A11"].value.replace("=","",1)
ws["A12"]="ลองพิมพ์รหัสอื่นจากชีต เฉลย_คะแนน หรือพิมพ์รหัสที่ไม่มีจริง แล้วดูว่าเกิดอะไรขึ้น (IFERROR ช่วยอะไร?)"
ws.column_dimensions["A"].width=22; ws.column_dimensions["B"].width=30
# survey
ws=wb.create_sheet("ผลแบบสำรวจ")
SC=["ประทับเวลา","ชั้นปี","คณะ","ใช้หน้าจอวันละกี่ชั่วโมง","นอนวันละกี่ชั่วโมง","แอปที่ใช้ทุกวัน","ใช้ AI ช่วยเรียนไหม","เครื่องมือ AI ที่ใช้","ใช้ AI บ่อยแค่ไหน","มั่นใจว่าตรวจคำตอบ AI ได้ (1–5)","เคยได้ SMS/สายหลอกลวงไหม"]
head(ws,1,SC)
for i,r in enumerate(data.resp,2):
    vals=[r["ts"],r["yr"],r["fac"],r["hrs"],r["sleep"],r["apps"],r["ai"],r["tools"],r["freq"],r["conf"],r["sms"]]
    for j,v in enumerate(vals,1):
        c=ws.cell(i,j,v if v!="" else None); c.font=N
    ws.cell(i,1).number_format="d/m/yyyy hh:mm"
for k,w in zip("ABCDEFGHIJK",[17,8,26,12,12,40,12,30,18,14,14]): ws.column_dimensions[k].width=w
ws.row_dimensions[1].height=45; ws.freeze_panes="A2"; ws.auto_filter.ref=f"A1:K{len(data.resp)+1}"
L=len(data.resp)+1; S="ผลแบบสำรวจ"
# summary sheet
ws=wb.create_sheet("สรุปแบบสำรวจ")
ws["A1"]="สรุปผลแบบสำรวจชีวิตดิจิทัลของนิสิต (ข้อมูลสมมุติ)"; ws["A1"].font=T
ws["A3"]="จำนวนผู้ตอบ"; ws["B3"]=f"=COUNTA({S}!A2:A{L})"
ws["A4"]="ใช้หน้าจอเฉลี่ย (ชม./วัน)"; ws["B4"]=f"=ROUND(AVERAGE({S}!D2:D{L}),1)"
ws["A5"]="นอนเฉลี่ย (ชม./วัน)"; ws["B5"]=f"=ROUND(AVERAGE({S}!E2:E{L}),1)"
ws["A6"]="สัดส่วนที่ใช้ AI ช่วยเรียน"; ws["B6"]=f'=COUNTIF({S}!G2:G{L},"ใช้")/B3'; ws["B6"].number_format="0%"
ws["A7"]="สัดส่วนที่เคยเจอ SMS/สายหลอก"; ws["B7"]=f'=COUNTIF({S}!K2:K{L},"เคย")/B3'; ws["B7"].number_format="0%"
ws["A9"]="แอป"; ws["B9"]="จำนวนคนที่ใช้ทุกวัน"; [setattr(ws[c],"font",H) or setattr(ws[c],"fill",GREEN) for c in ("A9","B9")]
for k,a in enumerate(data.apps,10):
    ws.cell(k,1,a); ws.cell(k,2,f'=COUNTIF({S}!$F$2:$F${L},"*"&A{k}&"*")')
ae=9+len(data.apps)
ws.cell(ae+2,1,"เครื่องมือ AI"); ws.cell(ae+2,2,"จำนวนคน")
for c in (ws.cell(ae+2,1),ws.cell(ae+2,2)): c.font=H; c.fill=GREEN
for k,a in enumerate(data.ai,ae+3):
    ws.cell(k,1,a); ws.cell(k,2,f'=COUNTIF({S}!$H$2:$H${L},"*"&A{k}&"*")')
te=ae+2+len(data.ai)
ws.cell(te+2,1,"ใช้ AI ช่วยเรียน"); ws.cell(te+2,2,"จำนวนคน")
for c in (ws.cell(te+2,1),ws.cell(te+2,2)): c.font=H; c.fill=GREEN
ws.cell(te+3,1,"ใช้"); ws.cell(te+3,2,f'=COUNTIF({S}!$G$2:$G${L},A{te+3})')
ws.cell(te+4,1,"ไม่ใช้"); ws.cell(te+4,2,f'=COUNTIF({S}!$G$2:$G${L},A{te+4})')
ws.cell(te+6,1,"หมายเหตุ: COUNTIF กับ \"*\"&A10&\"*\" = นับเซลล์ที่ 'มีคำนี้อยู่' เพราะคำตอบแบบช่องทำเครื่องหมายถูกเก็บรวมกันในเซลล์เดียว คั่นด้วยจุลภาค").font=Font(name=F,italic=True,color="666666")
ws.column_dimensions["A"].width=30; ws.column_dimensions["B"].width=20
c1=BarChart(); c1.type="bar"; c1.title="แอปที่นิสิตใช้ทุกวัน"; c1.legend=None; c1.x_axis.title=None; c1.y_axis.title="คน"
c1.add_data(Reference(ws,min_col=2,min_row=9,max_row=ae),titles_from_data=True); c1.set_categories(Reference(ws,min_col=1,min_row=10,max_row=ae)); c1.height=7.5; c1.width=13; ws.add_chart(c1,"D3")
c2=PieChart(); c2.title="ใช้ AI ช่วยเรียนไหม"; c2.add_data(Reference(ws,min_col=2,min_row=te+2,max_row=te+4),titles_from_data=True); c2.set_categories(Reference(ws,min_col=1,min_row=te+3,max_row=te+4)); c2.height=7.5; c2.width=10; ws.add_chart(c2,"D19")
c3=ScatterChart(); c3.title="เวลาหน้าจอ กับ ชั่วโมงนอน"; c3.style=13; c3.x_axis.title="ใช้หน้าจอ (ชม./วัน)"; c3.y_axis.title="นอน (ชม./วัน)"; c3.legend=None
sh=wb[S]; se=Series(Reference(sh,min_col=5,min_row=2,max_row=L),Reference(sh,min_col=4,min_row=2,max_row=L),title="ผู้ตอบ"); se.marker.symbol="circle"; se.graphicalProperties.line.noFill=True; c3.series.append(se); c3.height=7.5; c3.width=13; ws.add_chart(c3,"D35")
for w in wb.worksheets:
    for row in w.iter_rows():
        for c in row:
            if c.value is not None and (c.font is None or c.font.name!=F):
                c.font=Font(name=F,bold=c.font.bold,italic=c.font.italic,color=c.font.color,size=c.font.size)
wb.active=1
wb.save("sheets-practice-student-data.xlsx")
