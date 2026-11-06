const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:1});
await p.goto('file://'+process.cwd()+'/perfil.html');await p.screenshot({path:'foto-perfil.png'});await b.close();})();
