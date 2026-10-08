const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const dist=path.resolve(__dirname,'../dist');
function setup({matches=true,visual=true}={}){
 const target=()=>{const handlers={};return {addEventListener(t,f){(handlers[t]??=[]).push(f)},emit(t){for(const f of handlers[t]||[])f()}}};
 const styles={},classes=new Set(),frames=[];let resets=0;
 const root={style:{setProperty(k,v){styles[k]=v}},classList:{toggle(k,on){on?classes.add(k):classes.delete(k)}}};
 const media=Object.assign(target(),{matches});
 const viewport=visual?Object.assign(target(),{width:844,height:290,offsetTop:72,offsetLeft:0}):undefined;
 const window=Object.assign(target(),{matchMedia:()=>media,visualViewport:viewport,innerWidth:844,innerHeight:390,scrollY:175,scrollTo(){resets++;this.scrollY=0}});
 const document=Object.assign(target(),{documentElement:root,fullscreenElement:null});
 vm.runInNewContext(fs.readFileSync(path.join(dist,'viewport.js'),'utf8'),{window,document,requestAnimationFrame:f=>{frames.push(f);return frames.length}});
 return {window,document,media,viewport,styles,classes,get resets(){return resets},flush(){while(frames.length)frames.shift()()}};
}
const s=setup();assert(s.classes.has('game-landscape'));assert.equal(s.resets,1);assert.equal(s.window.scrollY,0);assert.equal(s.styles['--game-height'],'290px');assert.equal(s.styles['--game-top'],'72px');
// Safari chrome changes the visible rectangle without rotating the device.
s.viewport.height=350;s.viewport.offsetTop=12;s.viewport.emit('resize');s.viewport.emit('scroll');s.flush();assert.equal(s.styles['--game-height'],'350px');assert.equal(s.styles['--game-top'],'12px');assert.equal(s.resets,1,'viewport changes must not fight scrolling');
// Portrait restores normal flow; repeat landscape entry and late rotation resize.
s.media.matches=false;s.media.emit('change');s.flush();assert(!s.classes.has('game-landscape'));s.window.scrollY=220;s.media.matches=true;s.window.emit('orientationchange');s.flush();assert.equal(s.resets,2);s.viewport.width=852;s.viewport.height=281;s.window.emit('resize');s.flush();assert.equal(s.styles['--game-width'],'852px');assert.equal(s.styles['--game-height'],'281px');
// Fullscreen uses its own geometry, then returns to Safari's viewport.
s.document.fullscreenElement={};s.document.emit('fullscreenchange');s.flush();assert.equal(s.styles['--game-top'],'0px');assert.equal(s.styles['--game-height'],'390px');s.document.fullscreenElement=null;s.document.emit('fullscreenchange');s.flush();assert.equal(s.styles['--game-height'],'281px');
const fallback=setup({visual:false});assert.equal(fallback.styles['--game-height'],'390px');assert.equal(fallback.styles['--game-top'],'0px');const desktop=setup({matches:false});assert.equal(desktop.resets,0);assert.equal(Object.keys(desktop.styles).length,0);
const game=fs.readFileSync(path.join(dist,'game.js'),'utf8');assert(!/cv\.focus\(\)/.test(game));assert(game.includes('cv.focus({preventScroll:true})'));
const css=fs.readFileSync(path.join(dist,'style.css'),'utf8');assert(!css.includes('html.game-active'));assert(css.includes('.stage{position:fixed;top:0;left:0;'));assert(css.includes('object-fit:contain'));
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');for(const f of ['game.js','audio.js','viewport.js','style.css'])assert(html.includes(f+'?v=0.3.1'));
console.log('PASS viewport offset, toolbar resize/scroll, repeated rotation, fullscreen, API fallback, desktop, no-scroll focus and versioned assets');
