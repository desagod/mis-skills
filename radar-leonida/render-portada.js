const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
await p.goto('file://'+process.cwd()+'/portada.html');await p.waitForTimeout(300);await p.screenshot({path:'portada-youtube.png'});
await p.goto('file://'+process.cwd()+'/portada.html#guia');await p.reload();await p.waitForTimeout(300);await p.screenshot({path:'/tmp/claude-0/portada-guia.png'});
await b.close();})();
