const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+process.cwd()+'/kit.html');await p.waitForTimeout(300);
await p.locator('#overlay').screenshot({path:'marco-overlay.png',omitBackground:true});
for(const [id,f] of [['tag1','etiqueta-ultima-hora'],['tag2','etiqueta-dato-curioso'],['tag3','etiqueta-truco'],['tag4','etiqueta-rumor']])await p.locator('#'+id).screenshot({path:f+'.png',omitBackground:true});

await b.close();})();
