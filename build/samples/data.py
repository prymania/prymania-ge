import random, json, datetime
random.seed(2026)
names="มะลิ ต้นกล้า ข้าวหอม ภูผา น้ำฝน ดาวเหนือ ใบเตย ก้องภพ ปลายฟ้า ธารา แพรวา กันตพงศ์ ชนิดา ณัฐวุฒิ พิมพ์ชนก ศุภกร อรอุมา ธนภัทร กมลชนก วรเมธ สุภาวดี ปิยะพงษ์ เขมิกา ภาคิน ณิชา อนุชา จิราพร ภูมิพัฒน์ รัชนก ธีรเดช นภัสสร วีรภัทร กัญญารัตน์ ศิริชัย พลอยไพลิน เจษฎา อัญชลี ปวริศ ทิพวรรณ ชยพล".split()
fac=["วิทยาศาสตร์","บัญชีและการจัดการ","ศึกษาศาสตร์","วิศวกรรมศาสตร์","มนุษยศาสตร์และสังคมศาสตร์"]
stu=[]
for i,n in enumerate(names):
    lvl=random.random()
    a=min(50,max(15,round(random.gauss(40+8*(lvl-.5),5)*2)/2))
    q=min(10,max(2,round(random.gauss(7.5+2*(lvl-.5),1.5))))
    p=min(10,max(3,round(random.gauss(8,1.5))))
    f=min(30,max(5,round(random.gauss(19+10*(lvl-.5),4))))
    stu.append(dict(id="6801%05d"%(1001+i*37), name=n, fac=fac[i%5] if random.random()<.7 else random.choice(fac), a=a,q=q,p=p,f=f))
apps=["LINE","Facebook","TikTok","Instagram","YouTube","X","Discord"]
ai=["ChatGPT","Gemini","Claude","Copilot","NotebookLM","Perplexity"]
resp=[]
t0=datetime.datetime(2026,11,18,10,5)
for i in range(60):
    t=t0+datetime.timedelta(minutes=random.randint(0,60*48))
    yr=random.choice(["ปี 1"]*5+["ปี 2"]*2+["ปี 3","ปี 4"])
    hrs=max(1,min(16,round(random.gauss(7,2.5))))
    sel=[a for a in apps if random.random()<{"LINE":.95,"Facebook":.7,"TikTok":.65,"Instagram":.55,"YouTube":.8,"X":.25,"Discord":.3}[a]]
    use=random.random()<.78
    tools=", ".join([x for x in ai if random.random()<{"ChatGPT":.8,"Gemini":.55,"Claude":.25,"Copilot":.2,"NotebookLM":.2,"Perplexity":.15}[x]]) if use else ""
    if use and not tools: tools="ChatGPT"
    freq=random.choice(["ทุกวัน","2–3 ครั้ง/สัปดาห์","สัปดาห์ละครั้ง","นาน ๆ ครั้ง"]) if use else ""
    conf=random.choice([2,3,3,4,4,4,5]) if use else ""
    sms=random.choice(["เคย"]*3+["ไม่เคย"]*2)
    sleep=max(3,min(10,round(random.gauss(8.5-0.25*hrs,1))))
    resp.append(dict(ts=t, yr=yr, fac=random.choice(fac), hrs=hrs, sleep=sleep, apps=", ".join(sel), ai="ใช้" if use else "ไม่ใช้", tools=tools, freq=freq, conf=conf, sms=sms))
resp.sort(key=lambda r:r["ts"])
for idx,(a,q,p,f) in {5:(20,3,5,10),17:(24.5,4,6,13),29:(28,5,6,12),33:(30,4,7,14)}.items():
    stu[idx].update(a=a,q=q,p=p,f=f)
