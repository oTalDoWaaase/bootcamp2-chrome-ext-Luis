(function inject() {
  if (document.getElementById('bh-portal-style')) return;
  const css = `
  .bh-portal{position:relative;display:inline;z-index:0}
  .bh-portal>.bh-wrap{
    position:relative;
    display:inline-block;
    padding:2px 8px;
    border-radius:16px;
    box-shadow:
      0 0 0 3px rgba(0,255,170,.9),
      inset 0 0 14px rgba(0,255,170,.5),
      0 0 28px rgba(0,255,170,.65),
      0 0 40px rgba(0,200,255,.55);
    animation:bh-pulse 1.2s ease-in-out infinite alternate
  }
  .bh-portal>.bh-wrap::before{
    content:"";
    position:absolute;
    inset:-10px;
    border-radius:20px;
    pointer-events:none;
    z-index:-1;
    background:
      radial-gradient(60% 60% at 50% 50%,rgba(0,255,191,.35),transparent 60%),
      radial-gradient(40% 40% at 30% 40%,rgba(165,255,106,.4),transparent 60%),
      radial-gradient(35% 35% at 70% 60%,rgba(20,255,114,.38),transparent 60%);
    filter:blur(2px) saturate(1.6);
    box-shadow:0 0 24px rgba(0,255,170,.6),
               0 0 36px rgba(0,200,255,.5);
    -webkit-mask:radial-gradient(farthest-side,transparent 60%,#000 61%);
            mask:radial-gradient(farthest-side,transparent 60%,#000 61%)
  }
  @keyframes bh-pulse{
    0%{box-shadow:0 0 0 3px rgba(0,255,170,.7),inset 0 0 14px rgba(0,255,170,.4),0 0 26px rgba(0,255,170,.5),0 0 36px rgba(0,200,255,.4)}
    100%{box-shadow:0 0 0 4px rgba(0,255,170,1),inset 0 0 20px rgba(0,255,170,.6),0 0 40px rgba(0,255,170,.8),0 0 60px rgba(0,200,255,.7)}
  }`;
  const style=document.createElement('style');
  style.id='bh-portal-style';
  style.textContent=css;
  document.documentElement.appendChild(style);
})();

function decorate(root=document){
  for(const a of root.querySelectorAll('a')){
    const r=a.getBoundingClientRect(); if(r.width<30||r.height<12) continue;
    if(!a.querySelector('.bh-wrap')){
      const s=document.createElement('span');
      while(a.firstChild)s.appendChild(a.firstChild);
      s.className='bh-wrap';
      a.appendChild(s);
    }
    a.classList.add('bh-portal');
  }
}''
decorate();
new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{
  if(n.nodeType===1) decorate(n);
}))).observe(document.documentElement,{subtree:true,childList:true});
