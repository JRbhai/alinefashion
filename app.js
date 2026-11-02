const PAGE=document.body.dataset.page,PROD=window.PROD_PAGE||'product.html';
const IK=Object.keys(IMG);P.forEach((x,i)=>{x.k=IK[i];x.c=Object.keys(IMG[x.k]).filter(k=>k!='_')});
const grid=document.getElementById('grid');
const cardHTML=(x,i)=>`
<div class="card glass overflow-hidden flex flex-col cursor-pointer" data-i="${i}" data-c="0" data-s="0" data-size="">
 <div class="px-6 pt-6">
  <p class="eyebrow">${x.tag}</p>
  <h4 class="text-2xl font-semibold tracking-tight mt-1">${x.n}</h4>
  <p class="text-sm text-stone-600 mt-1">${x.o}</p>
  <button data-a="open" class="btn !py-2 !px-5 mt-4">View &amp; Pre-Order</button>
 </div>
 <div class="imgb relative h-72 m-3 rounded-2xl bg-stone-200 overflow-hidden">
  <div class="slides absolute inset-0"></div><div class="tint"></div>
  <div class="dots absolute bottom-3 inset-x-0 flex justify-center gap-1.5"></div>
 </div>
 <div class="px-6 pb-6 flex items-center justify-between">
  <div class="flex gap-2">${x.c.map((c,k)=>`<button class="sw ${k?'':'on'}" data-a="color" data-k="${k}" style="background:${HEX[c]}" title="${c}"></button>`).join('')}</div>
  <p class="text-xs text-stone-500"><b class="cname text-stone-900">${x.c[0]}</b></p>
 </div>
</div>`;
const show=x=>document.body.dataset.page!='home'||x.home;
const rowOf=x=>document.body.dataset.page=='home'?'Featured':(x.row||'Collection');
const ROWS=[...new Set(P.filter(show).map(rowOf))];
grid.innerHTML=ROWS.map((r,ri)=>`<div class="crow"><div class="crow-h"><h3>${r}</h3><div class="hidden md:flex gap-2"><button class="gb" data-rowbtn="-1" aria-label="Previous">‹</button><button class="gb" data-rowbtn="1" aria-label="Next">›</button></div></div><div class="rowstrip">${P.map((x,i)=>show(x)&&rowOf(x)==r?cardHTML(x,i):'').join('')}</div></div>`).join('');
grid.addEventListener('click',e=>{const b=e.target.closest('[data-rowbtn]');if(!b)return;const st=b.closest('.crow').querySelector('.rowstrip');st.scrollBy({left:(+b.dataset.rowbtn)*(st.querySelector('.card').offsetWidth+24),behavior:'smooth'})});
function list(card){const x=P[card.dataset.i],c=x.c[card.dataset.c],own=IMG[x.k][c]||[];let u=own.length?own:IMG[x.k]._;u=u.map(s=>({s}));if(u.length==1)u.push({s:u[0].s,z:1});return{u,own:own.length,c,x}}
function paint(card){
 const{u,own,c,x}=list(card),s=+card.dataset.s;
 card.querySelector('.slides').innerHTML=u.map((m,k)=>`<img class="slide ${m.z?'z':''}" style="opacity:${k==s?1:0}" src="${m.s}" alt="${x.n} ${c}" loading="lazy">`).join('');
 card.querySelector('.dots').innerHTML=u.map((m,k)=>`<span class="w-2 h-2 rounded-full ${k==s?'bg-white':'bg-white/50'}"></span>`).join('');
 card.querySelector('.tint').style.background=own?'transparent':HEX[c];
}
grid.querySelectorAll('[data-i]').forEach(paint);
function goProd(i){openSheet(i)}
function act(e){
 const b=e.target.closest('[data-a]');
 if(!b){if(window.__swiped&&Date.now()-window.__swiped<500)return;const c=e.target.closest('.card');if(c&&grid.contains(c))goProd(+c.dataset.i);return}
 const card=b.closest('[data-i]'),a=b.dataset.a,L=list(card);
 if(a=='open'){goProd(+card.dataset.i);return}
 if(a=='prev'||a=='next'){card.dataset.s=(+card.dataset.s+(a=='next'?1:-1)+L.u.length)%L.u.length;paint(card)}
 if(a=='color'){card.dataset.c=b.dataset.k;card.dataset.s=0;card.querySelectorAll('.sw').forEach(s=>s.classList.toggle('on',s==b));paint(card);card.querySelector('.cname').textContent=list(card).c;if(card.id=='shc')shTint(card)}
 if(a=='size'){card.dataset.size=b.dataset.z;card.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c==b))}
 if(a=='guide'){const g=document.getElementById('sg');g.classList.remove('hidden');g.classList.add('flex')}
 if(a=='order'||a=='email'){
  if(!card.dataset.size){alert('Please select a size before pre-ordering.');return}
  const t=`Hello, I want to Pre-Order:\nProduct: ${L.x.n}\nColor: ${L.c}\nSize: ${card.dataset.size}\nPlease share delivery details.`;
  if(a=='order')window.open(`https://wa.me/918102239454?text=${encodeURIComponent(t)}`,'_blank');
  else location.href=`mailto:work.jagdip@gmail.com?subject=${encodeURIComponent('Pre-Order: '+L.x.n)}&body=${encodeURIComponent(t)}`;
 }
}
grid.addEventListener('click',act);
/* product panel (Apple jaisa): card par tap -> neeche se panel uthta hai */
const shw=document.getElementById('shw'),shb=document.getElementById('shb'),sh=document.getElementById('sh'),sbd=document.getElementById('sbd');
let shFrom=null,shOpen=false;
const SHV=['--pa','--pb','--pc','--pd','--pe','--pf','--ink','--ink2','--ol','--on','--gbg','--gbr'];
const T=PAGE=='product'?document.body:sh;
function shReset(){SHV.forEach(v=>T.style.removeProperty(v))}
function shTint(card){
 const c=list(card).c,hx=(HEX[c]||'#7aa2d6').replace('#','');
 const C=[0,2,4].map(k=>parseInt(hx.slice(k,k+2),16));
 const mix=(a,b,t)=>'rgb('+a.map((v,k)=>Math.round(v*(1-t)+b[k]*t)).join(',')+')';
 const rgba=(a,al)=>`rgba(${a.join(',')},${al})`;
 const W=[255,255,255],K=[0,0,0],lum=(.299*C[0]+.587*C[1]+.114*C[2])/255;
 let t;
 if(lum>.9){t={pa:'#ffffff',pb:'#f4f5f7',pc:'#eceef2',pd:'rgba(32,56,88,.06)',pe:'rgba(32,56,88,.05)',pf:'rgba(32,56,88,.05)',ink:'#0f1b2d',ink2:'#57534e',ol:'#203858',on:'#ffffff',gbg:'rgba(255,255,255,.75)',gbr:'rgba(32,56,88,.12)'}}
 else if(lum<.35){t={pa:mix(C,W,.14),pb:mix(C,K,.3),pc:mix(C,W,.06),pd:'rgba(255,255,255,.12)',pe:'rgba(255,255,255,.08)',pf:'rgba(255,255,255,.08)',ink:'#ffffff',ink2:'rgba(255,255,255,.72)',ol:'rgba(255,255,255,.85)',on:mix(C,K,.45),gbg:'rgba(255,255,255,.09)',gbr:'rgba(255,255,255,.2)'}}
 else{const d=mix(C,K,.78);t={pa:mix(C,W,.7),pb:mix(C,W,.52),pc:mix(C,W,.8),pd:rgba(C,.35),pe:rgba(C,.3),pf:rgba(C,.3),ink:d,ink2:mix(C,K,.6),ol:mix(C,K,.5),on:'#ffffff',gbg:'rgba(255,255,255,.5)',gbr:'rgba(255,255,255,.75)'}}
 Object.keys(t).forEach(k=>T.style.setProperty('--'+k,t[k]));
}
function openSheet(i){
 const x=P[i],src=grid.querySelector(`[data-i="${i}"]`),ci=+src.dataset.c;shFrom=src;
 const ft=(ic,t,d)=>`<div class="flex gap-3"><span class="w-6 text-center">${ic}</span><p><b>${t}</b><br><span class="text-stone-600">${d}</span></p></div>`;
 shb.innerHTML=`<div id="shc" data-i="${i}" data-c="${ci}" data-s="0" data-size="">
  <p class="eyebrow mt-6">${x.tag}</p>
  <h3 class="text-3xl font-semibold tracking-tight mt-1">${x.n}</h3>
  <p class="text-sm text-stone-600 mt-1">${x.o}</p>
  <div class="imgb relative h-80 mt-4 rounded-2xl bg-stone-200 overflow-hidden">
   <div class="slides absolute inset-0"></div><div class="tint"></div>
   <button data-a="prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-8 h-8 rounded-full">‹</button>
   <button data-a="next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-8 h-8 rounded-full">›</button>
   <div class="dots absolute bottom-3 inset-x-0 flex justify-center gap-1.5"></div>
  </div>
  <div class="glass p-5 mt-5"><p class="text-xs text-stone-500">Available in ${x.c.length} colors</p>
  <div class="flex items-center gap-3 mt-2"><div class="flex gap-2">${x.c.map((c,k)=>`<button class="sw ${k==ci?'on':''}" data-a="color" data-k="${k}" style="background:${HEX[c]}" title="${c}"></button>`).join('')}</div><b class="cname text-sm">${x.c[ci]}</b></div>
  <div class="flex justify-between text-xs text-stone-500 mt-5 mb-2"><span>Size (Indian sizing)</span><button data-a="guide" class="underline">Size Guide</button></div>
  <div class="grid grid-cols-4 gap-2">${['XS','S','M','L'].map(z=>`<button class="chip" data-a="size" data-z="${z}">${z}</button>`).join('')}</div>
  <div class="grid gap-2 mt-5"><button data-a="order" class="btn w-full">Pre-Order via WhatsApp</button><button data-a="email" class="btn ln w-full">Pre-Order via Email</button></div></div>
  <div class="glass p-5 mt-6 space-y-4 text-sm">
   ${ft('🧵','Threads',x.t)}${ft('🌿','Origin',x.o)}
   ${ft('📏','Indian fit','Made on Indian body sizes, not UK or US sizes. Check the Size Guide above.')}
  </div>
  <h4 class="font-semibold mt-8 mb-3">The Aline Difference</h4>
  <div class="glass p-5 space-y-4 text-sm">
   ${ft('🎯','Honest pricing','No inflated brand markups, no logo tax.')}
   ${ft('🚚','Delivery in 3-10 days','We share delivery details when we confirm your order.')}
   ${ft('↩️','14-day return &amp; exchange','Subject to terms: unworn, unwashed, with tags.')}
   ${ft('♻️','Circular Rewards','Return old Aline clothes and earn tokens for your next order.')}
  </div>
  <p class="text-[11px] text-stone-500 mt-6">Pre-order via WhatsApp or Email. We confirm details and payment there.</p>
 </div>`;
 paint(shb.firstElementChild);
 shTint(shb.firstElementChild);
 shw.classList.remove('hidden');shw.setAttribute('aria-hidden','false');shb.scrollTop=0;
 void sh.offsetHeight;sbd.style.opacity=1;sh.style.transform='translateY(0)';
 if(PAGE!='product')document.body.style.overflow='hidden';else document.title=x.n+' - Aline Fashion';
 shOpen=true;
}
function closeSheet(){
 if(!shOpen||PAGE=='product')return;shOpen=false;
 const c=document.getElementById('shc');
 if(c&&shFrom){shFrom.dataset.c=c.dataset.c;shFrom.dataset.s=0;shFrom.querySelectorAll('.sw').forEach((s,k)=>s.classList.toggle('on',k==+c.dataset.c));shFrom.querySelector('.cname').textContent=list(shFrom).c;paint(shFrom)}
 sbd.style.opacity=0;sh.style.transform='translateY(100%)';shReset();document.body.style.overflow='';
 setTimeout(()=>{if(!shOpen){shw.classList.add('hidden');shw.setAttribute('aria-hidden','true');shb.innerHTML=''}},460);
}
shb.addEventListener('click',act);
/* photo swipe: finger left/right on a photo changes it (card + panel) */
function swipeInit(root){
 let sx=0,sy=0,box=null,lock=0;
 root.addEventListener('touchstart',e=>{box=e.target.closest('.imgb');if(!box)return;const t=e.touches[0];sx=t.clientX;sy=t.clientY;lock=0},{passive:true});
 root.addEventListener('touchmove',e=>{if(!box)return;const t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(!lock&&(Math.abs(dx)>10||Math.abs(dy)>10))lock=Math.abs(dx)>Math.abs(dy)*1.2?1:2;if(lock==1&&e.cancelable)e.preventDefault()},{passive:false});
 root.addEventListener('touchend',e=>{if(!box)return;const t=e.changedTouches[0],dx=t.clientX-sx;const bx=box;box=null;
  if(lock!=1||Math.abs(dx)<40)return;
  const card=bx.closest('[data-i]');if(!card)return;
  const n=list(card).u.length;if(n<2)return;
  card.dataset.s=(+card.dataset.s+(dx<0?1:-1)+n)%n;paint(card);
  window.__swiped=Date.now()},{passive:true});
}
swipeInit(shb);
document.getElementById('shx').onclick=closeSheet;sbd.onclick=closeSheet;
if(PAGE=='product'){const q=new URLSearchParams(location.search).get('p');let pi=P.findIndex(x=>x.k==q);if(pi<0&&/^\d+$/.test(q||''))pi=+q;if(pi<0||pi>=P.length)pi=0;openSheet(pi)}
addEventListener('keydown',e=>{if(e.key=='Escape')closeSheet()});
/* scroll: header glass + fade-in */
const hd=document.getElementById('hd');
addEventListener('scroll',()=>{if(hd)hd.classList.toggle('sc',scrollY>40)},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* cookies + Google Analytics (sirf consent ke baad) */
function loadGA(){
 if(window.__ga)return;window.__ga=1;
 const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-ECEHHWNE8L';document.head.appendChild(s);
 window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
 gtag('js',new Date());gtag('config','G-ECEHHWNE8L');
}
function setC(v){
 try{localStorage.setItem('aline_consent',v)}catch(e){}
 document.getElementById('ck').classList.add('hidden');document.body.style.paddingBottom='';
 const cb=document.getElementById('cb');cb.style.opacity=0;setTimeout(()=>cb.classList.add('hidden'),600);
 if(v=='all')loadGA();
}
function resetC(){try{localStorage.removeItem('aline_consent')}catch(e){}const cb=document.getElementById('cb');cb.style.opacity=1;cb.classList.remove('hidden');document.getElementById('ck').classList.remove('hidden');document.body.style.paddingBottom='110px'}
function cookieInit(){
 let v=null;try{v=localStorage.getItem('aline_consent')}catch(e){}
 if(v=='all')loadGA();
 if(!v){document.getElementById('ck').classList.remove('hidden');document.getElementById('cb').classList.remove('hidden');document.body.style.paddingBottom='110px'}
}
/* splash: "ALINE" -> blur dheere hatta hai -> site -> cookie banner */
/* falling logo (physics): jahan atka hai wahin se girta hai, ghoomta hai, glass ke kone se takrata hai, side se girta hai aur agle thikane par tik jata hai */
(function(){
 const fl=document.getElementById('fl'),slots=[...document.querySelectorAll('[data-slot]')];
 if(!fl||!slots.length)return;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){slots.forEach(e=>e.style.visibility='visible');fl.remove();return}
 const cl=(v,a,b)=>Math.min(b,Math.max(a,v)),E=Math.exp,PI2=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a);
 let moved=false,first=true,pSy=scrollY,spawns=0,S=[],Rc=[],vw=0,vh=0,bw=0,bh=0,docH=0,raf=0,tm=0;
 let peak=0,cur=0,tgt=0,mode='hang',x=0,y=0,vx=0,vy=0,th=0,w=0,k=1,op=1,fallT=0,air=0,kt=.55,ign=new Set();
 function measure(){
  vw=innerWidth;vh=innerHeight;bh=slots[0].offsetHeight;
  fl.style.setProperty('--h',bh+'px');bw=fl.firstElementChild.offsetWidth;
  docH=document.documentElement.scrollHeight;const maxS=docH-vh;
  S=slots.map(el=>{const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+scrollY+r.height/2,k:r.height/bh}});
  S.forEach((a,i)=>{a.s=i==0?-1e9:Math.min(a.y-vh*.6,maxS-vh*.15);a.d=i==0?0:(i==S.length-1?1e9:a.s+vh*.3)});
  Rc=[...document.querySelectorAll('.glass,.glass-d')].filter(e=>!e.closest('#ck,#sg,#hd')&&!e.classList.contains('card')).map(e=>{const r=e.getBoundingClientRect();return{l:r.left,r:r.right,t:r.top+scrollY,b:r.bottom+scrollY}}).filter(r=>r.r-r.l>4&&r.b-r.t>4);
  {const g=document.getElementById('grid');if(g){const q=g.getBoundingClientRect();Rc.push({l:q.left,r:q.right,t:q.top+scrollY+8,b:q.bottom+scrollY})}}
  ign.clear();cur=Math.min(cur,S.length-1);
  if(mode=='hang'){x=S[cur].x;y=S[cur].y;k=S[cur].k}
  kick();
 }
 function home(sy){let h=0;S.forEach((a,i)=>{if(sy>=a.s)h=i});return h}
 function release(){spawns=0;
  const A=S[cur],B=S[cur+1];mode='fall';x=A.x;y=A.y;vx=(Math.random()-.5)*200;vy=0;w=(Math.random()-.5)*6;fallT=0;air=0;kt=.55;
  ign=new Set();Rc.forEach((r,i)=>{if((x>=r.l&&x<=r.r&&y>=r.t&&y<=r.b)||(B.x>=r.l&&B.x<=r.r&&B.y>=r.t&&B.y<=r.b))ign.add(i)});
 }
 function step(h){
  vy+=1800*h;x+=vx*h;y+=vy*h;th+=w*h;w*=E(-.5*h);
  const R=bh*.3;let hit=false;
  const wl=-R*.7,wr=vw+R*.7;
  if(x<wl){x=wl;vx=Math.abs(vx)*.5}else if(x>wr){x=wr;vx=-Math.abs(vx)*.5}
  if(y>docH-R){y=docH-R;vy=-Math.abs(vy)*.4}
  for(let i=0;i<Rc.length;i++){
   if(ign.has(i))continue;const r=Rc[i];
   if(x+R<r.l||x-R>r.r||y+R<r.t||y-R>r.b)continue;
   const cx=cl(x,r.l,r.r),cy=cl(y,r.t,r.b),dx=x-cx,dy=y-cy,d2=dx*dx+dy*dy;let nx,ny,pen;
   if(d2>=R*R)continue;
   if(d2<1e-6){const q=[x-r.l,r.r-x,y-r.t,r.b-y],m=Math.min(...q),j=q.indexOf(m);nx=j==0?-1:j==1?1:0;ny=j==2?-1:j==3?1:0;pen=m+R}
   else{const d=Math.sqrt(d2);nx=dx/d;ny=dy/d;pen=R-d}
   x+=nx*pen;y+=ny*pen;
   const vn=vx*nx+vy*ny;
   if(vn<0){const e=Math.abs(vn)<60?0:.42;vx-=(1+e)*vn*nx;vy-=(1+e)*vn*ny}
   const vt=vx*(-ny)+vy*nx;w+=(vt/R-w)*.18;
   if(ny<-.6){hit=true;if(Math.abs(vy)<160){vx+=(x<(r.l+r.r)/2?-1:1)*380*h}}
  }
  return hit;
 }
 function tick(now){
  raf=0;const dt=Math.min(.033,(now-tm)/1000||.016);tm=now;
  const sy=scrollY,lastI=S.length-1,up=sy<pSy,dn=sy>pSy,jump=Math.abs(sy-pSy)>vh*1.2;pSy=sy;
  if(first&&S.length){first=false;cur=home(sy);const T=S[cur];x=T.x;y=T.y;k=T.k;mode='hang';peak=sy}
  else if(jump&&(mode=='hang'||mode=='fall')){const h=home(sy);if(h!=cur||mode=='fall'){tgt=h;mode='fade'}}
  const A=S[cur];
  if(mode=='hang'){
   x=A.x;y=A.y;th-=PI2*Math.round(th/PI2);th*=E(-dt*12);k+=(A.k-k)*(1-E(-dt*12));op+=(1-op)*(1-E(-dt*10));
   if(cur<lastI&&moved&&dn&&sy>A.d+(cur?0:12))release();
   else if(cur>0&&up&&home(sy)<cur){mode='fade';tgt=home(sy)}
  }else if(mode=='fall'){
   const B=S[cur+1];fallT+=dt;k+=(kt-k)*(1-E(-dt*8));
   let c=false;for(let i=0;i<3;i++)if(step(dt/3))c=true;
   air=c?0:air+dt;
   if(air>.12&&y>B.y-450)vx+=((B.x-x)*5-vx*2.2)*dt;
   const near=Math.abs(x-B.x)<bw*.6&&Math.abs(y-B.y)<bh*.9,tv=B.y-sy<vh*.85,lost=y<sy-bh*.5||y>sy+vh+bh;
   if((Math.abs(x-B.x)<bw*.4&&Math.abs(y-B.y)<bh*.45)||y>B.y+150||fallT>9){mode='land';th-=PI2*Math.round(th/PI2)}
   else if(tv&&!near&&(lost||fallT>3.5)){spawns++;if(spawns>2){mode='land';th-=PI2*Math.round(th/PI2)}else{x=cl(B.x+rnd(-80,80),bw*.4,vw-bw*.4);y=sy-bh;vx=rnd(-60,60);vy=200;w=rnd(-3,3);th=0;fallT=0;air=0}}
   else if(sy<(cur==0?4:A.s-vh*.4)){mode='fade';tgt=Math.min(cur,home(sy))}
  }else if(mode=='land'){
   const B=S[cur+1],f=1-E(-dt*14);x+=(B.x-x)*f;y+=(B.y-y)*f;th*=E(-dt*10);k+=(B.k-k)*f;
   if(Math.hypot(B.x-x,B.y-y)<.6&&Math.abs(th)<.01)cur++,mode='hang',peak=sy;
  }else{
   op+=(0-op)*(1-E(-dt*14));
   if(op<.03){cur=tgt;const T=S[cur];x=T.x;y=T.y;th=0;w=0;k=T.k;mode='hang';peak=sy}
  }
  fl.style.transform=`translate3d(${x-bw/2}px,${y-sy-bh/2}px,0) rotate(${th}rad) scale(${k})`;
  fl.style.opacity=op;
  if(mode!='hang'||op<.995||Math.abs(th)>.002||Math.abs(k-S[cur].k)>.002)raf=requestAnimationFrame(tick);
 }
 function kick(){if(!raf){tm=performance.now();raf=requestAnimationFrame(tick)}}
 addEventListener('scroll',()=>{moved=true;kick()},{passive:true});
 addEventListener('resize',measure);addEventListener('load',measure);
 if(window.ResizeObserver)new ResizeObserver(measure).observe(document.body);
 measure();
})();
const sp=document.getElementById('sp');
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let seen=false;try{seen=!!sessionStorage.getItem('alineSp');sessionStorage.setItem('alineSp','1')}catch(e){}
if(sp&&seen){sp.remove();document.body.classList.add('go');cookieInit()}else if(sp){setTimeout(()=>{sp.classList.add('out');document.body.classList.add('go')},rm?200:2400);
setTimeout(()=>{sp.remove();cookieInit()},rm?500:3300)}else{document.body.classList.add('go');cookieInit()}
