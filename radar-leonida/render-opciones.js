const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:1});
await p.goto('file://'+process.cwd()+'/opciones.html');
for(const [id,f] of [['o1','opcion-1-minimapa'],['o2','opcion-2-monograma'],['o3','opcion-3-skyline']])await p.locator('#'+id).screenshot({path:f+'.png'});
// comparativa
await p.setViewportSize({width:1620,height:600});
await p.setContent(`<body style="margin:0;background:#111;display:flex;gap:20px;padding:30px;font:600 28px Inter;color:#fff">${['opcion-1-minimapa','opcion-2-monograma','opcion-3-skyline'].map((f,i)=>`<div style="text-align:center"><img src="file://${process.cwd()}/${f}.png" style="width:500px;height:500px;border-radius:50%"><div style="margin-top:6px">Opción ${i+1}</div></div>`).join('')}</body>`);
await p.waitForTimeout(300);await p.screenshot({path:'comparativa.png',fullPage:true});await b.close();})();
