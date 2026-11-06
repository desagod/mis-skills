const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+process.cwd()+'/reel.html');await p.waitForTimeout(300);
const D='/tmp/claude-0/reel';fs.rmSync(D,{recursive:true,force:true});fs.mkdirSync(D,{recursive:true});
const FPS=30,N=Math.round(12.6*FPS);
for(let i=0;i<N;i++){await p.evaluate(([t,f])=>render(t,f),[i/FPS,i]);await p.screenshot({path:`${D}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92});}
for(const [t,n] of [[0.7,'a'],[3.4,'b'],[8.8,'c'],[12.2,'d']]){await p.evaluate(([t,f])=>render(t,f),[t,Math.round(t*30)]);await p.screenshot({path:`/tmp/claude-0/prev-${n}.png`});}
await b.close();})();
