const projects = [
  {id:'obuhovskoy',name:'пр-т Обуховской Обороны',city:'Санкт-Петербург',rate:36,tenant:null},
  {id:'kirpichnye',name:'Кирпичные выемки',city:'Москва',rate:35,tenant:null},
  {id:'kozhevnicheskaya',name:'Кожевническая',city:'Москва',rate:32,tenant:'OZON'},
  {id:'yaroslavskoe',name:'Ярославское ш.',city:'Москва',rate:39,tenant:null},
  {id:'veselaya',name:'Весёлая',city:'Москва',rate:32,tenant:'Кондитерская «У Палыча»'},
  {id:'irtyshskiy',name:'Иртышский',city:'Москва',rate:33,tenant:null}
];
const $ = (s) => document.querySelector(s);
const money = (n) => Math.round(n).toLocaleString('ru-RU') + ' ₽';
const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
const photo = (p,loading='lazy',sizes='(max-width: 560px) 100vw, (max-width: 800px) 50vw, 33vw') => `<img src="./assets/enhanced/${p.id}-1920.webp" srcset="./assets/enhanced/${p.id}-960.webp 960w, ./assets/enhanced/${p.id}-1920.webp 1920w, ./assets/enhanced/${p.id}-3200.webp 3200w" sizes="${sizes}" alt="Объект ${p.name}, ${p.city} — AI-обработка исходного изображения" loading="${loading}" decoding="async" width="1280" height="800">`;
const source = 'https://investore.club/object_gallery/';
const selected = new Set();
let toastTimer;
function toast(message){$('.toast').textContent=message;$('.toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').hidden=true,3500);}

const featured = ['kozhevnicheskaya','kirpichnye','veselaya'].map(id=>projects.find(p=>p.id===id));
$('#stack').innerHTML=featured.map((p,i)=>`<article class="layer" id="layer-${i}" style="z-index:${i+1}" aria-labelledby="layer-title-${i}"><div class="layer-inner"><div class="layer-media">${photo(p,'lazy','100vw')}<div class="layer-top"><span>${p.city}</span><span class="layer-count">0${i+1} / 03</span></div></div><div class="layer-info"><div><h3 id="layer-title-${i}">${p.name}</h3><p>${p.tenant?'Якорный арендатор: '+p.tenant:'Недвижимость · открытый каталог Investore'}</p></div><div class="layer-price"><strong>до ${p.rate}%</strong><small>годовых · по данным платформы</small></div><div class="layer-actions"><button class="button yellow" data-detail="${p.id}">Изучить объект ${icon('diagonal')}</button><span>Заявленная ставка не гарантирует доход. Полные условия — на платформе.</span></div></div></div></article>`).join('');

document.querySelectorAll('.layer').forEach((layer,i)=>{
  const marker=document.createElement('span');marker.id=`layer-jump-${i}`;marker.className='layer-marker';marker.setAttribute('aria-hidden','true');layer.before(marker);
  document.querySelectorAll('.stack-index a')[i].href=`#layer-jump-${i}`;
});

$('#catalog-grid').innerHTML=projects.map(p=>`<article class="project-card" data-id="${p.id}" data-city="${p.city}"><button class="project-image" data-detail="${p.id}" aria-label="Открыть ${p.name}">${photo(p)}<span class="image-arrow">${icon('diagonal')}</span></button><p class="project-city">${p.city}</p><h3>${p.name}</h3><div class="project-data"><strong>до ${p.rate}%<small>годовых по данным платформы</small></strong><p>${p.tenant||'Арендатор не указан в открытой карточке'}</p></div><div class="project-bottom"><button data-detail="${p.id}">Подробнее ${icon('arrow')}</button><label class="compare-toggle"><input type="checkbox" data-compare="${p.id}" aria-label="Сравнить ${p.name}">В сравнение</label></div></article>`).join('');

$('.filters').addEventListener('click',e=>{
  const button=e.target.closest('[data-city]');if(!button)return;
  document.querySelectorAll('.filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  let count=0;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.city!=='all'&&card.dataset.city!==button.dataset.city;if(!card.hidden)count++;});
  $('#catalog-status').textContent=`Показано объектов: ${count}`;
});

function syncCompare(){
  document.querySelectorAll('[data-compare]').forEach(c=>c.checked=selected.has(c.dataset.compare));
  $('#compare-count').textContent=`${selected.size} / 3`;
  $('#compare-open').disabled=selected.size<2;$('#mobile-compare').disabled=selected.size<2;
  $('#mobile-compare b').textContent=selected.size;
}
$('#catalog-grid').addEventListener('change',e=>{
  const id=e.target.dataset.compare;if(!id)return;
  if(e.target.checked){if(selected.size===3){e.target.checked=false;toast('Можно сравнить до трёх объектов. Снимите один из выбранных.');return;}selected.add(id);}else selected.delete(id);
  syncCompare();toast(selected.size===1?'Выберите ещё один объект для сравнения':selected.size?`В сравнении: ${selected.size} объекта`:'Сравнение очищено');
});

let lastTrigger=null;
function openDialog(dialog,trigger){lastTrigger=trigger;dialog.showModal();document.body.classList.add('locked');dialog.querySelector('button')?.focus();}
document.querySelectorAll('dialog').forEach(d=>{
  d.querySelector('.dialog-close').addEventListener('click',()=>d.close());
  d.addEventListener('close',()=>{document.body.classList.remove('locked');if(lastTrigger?.isConnected)lastTrigger.focus({preventScroll:true});});
  d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
});

function detail(id,trigger){const p=projects.find(p=>p.id===id);if(!p)return;
  $('#detail-content').innerHTML=`${photo(p,'eager','(max-width: 820px) 100vw, 820px').replace('<img','<img class="detail-image"')}<div class="detail-body"><p>${p.city}</p><h2 id="detail-title">${p.name}</h2><dl class="detail-facts"><div><dt>Ставка из открытого каталога</dt><dd>до ${p.rate}% годовых</dd></div><div><dt>Якорный арендатор</dt><dd>${p.tenant||'Не указан публично'}</dd></div><div><dt>Срок и сумма привлечения</dt><dd>Доступны после входа</dd></div><div><dt>Данные проверены</dt><dd>3 октября 2026</dd></div></dl><p>Открытая карточка содержит ограниченные сведения. Для решения об инвестиции изучите договор, риски и актуальную доступность на исходной платформе.</p><div class="detail-cta"><button class="button yellow" data-calculate="${p.id}">Рассчитать сценарий ${icon('arrow')}</button><a class="button light" href="${source}" target="_blank" rel="noopener">На сайт Investore ${icon('diagonal')}</a></div><p class="source-note">Ставка «до» — не обещание дохода. Сведения — investore.club. Изображение улучшено с помощью AI; мелкие детали могут отличаться. <a href="./assets/${p.id}.jpg" target="_blank" rel="noopener">Исходное изображение ↗</a></p></div>`;
  openDialog($('#detail-dialog'),trigger);
}
document.addEventListener('click',e=>{
  const detailButton=e.target.closest('[data-detail]');if(detailButton)detail(detailButton.dataset.detail,detailButton);
  const calcButton=e.target.closest('[data-calculate]');if(calcButton){$('#calc-project').value=calcButton.dataset.calculate;calculate();lastTrigger=$('#calc-project');$('#detail-dialog').close();$('#calculator').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});$('#calc-project').focus({preventScroll:true});}
});

function drawComparison(){const items=projects.filter(p=>selected.has(p.id));
  $('#compare-content').innerHTML=`<table class="compare-table"><caption class="sr-only">Сравнение выбранных объектов Investore</caption><thead><tr><th scope="col">Объект</th>${items.map(p=>`<th scope="col">${photo(p,'lazy','240px')}${p.name}<button data-remove="${p.id}" aria-label="Убрать ${p.name} из сравнения">Убрать</button></th>`).join('')}</tr></thead><tbody>${[['Город',p=>p.city],['Ставка в каталоге',p=>'до '+p.rate+'% годовых'],['Арендатор',p=>p.tenant||'Не указан публично'],['Срок',()=> 'После входа на платформу'],['Условия',()=>`<a href="${source}" target="_blank" rel="noopener">Открыть источник ↗</a>`]].map(([title,value])=>`<tr><th scope="row">${title}</th>${items.map(p=>`<td>${value(p)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function compare(trigger){if(selected.size<2)return;drawComparison();openDialog($('#compare-dialog'),trigger);}
$('#compare-open').addEventListener('click',e=>compare(e.currentTarget));$('#mobile-compare').addEventListener('click',e=>compare(e.currentTarget));
$('#compare-content').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;selected.delete(b.dataset.remove);syncCompare();if(selected.size<2){$('#compare-dialog').close();toast('Для сравнения нужны минимум два объекта.');}else{drawComparison();$('#compare-dialog .dialog-close').focus();}});

$('#calc-project').innerHTML=projects.map(p=>`<option value="${p.id}">${p.name} · до ${p.rate}%</option>`).join('');$('#calc-project').value='kozhevnicheskaya';
function monthWord(n){return n%10===1&&n%100!==11?'месяц':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'месяца':'месяцев';}
function calculate(){
  const p=projects.find(p=>p.id===$('#calc-project').value),amount=Number($('#amount').value),months=Number($('#months').value),reinvest=$('input[name=mode]:checked').value==='reinvest',rate=p.rate/100/12;
  const total=reinvest?amount*Math.pow(1+rate,months):amount*(1+rate*months);
  $('#amount-output').textContent=money(amount);$('#months-output').textContent=`${months} ${monthWord(months)}`;
  $('#result-total').textContent=money(total);$('#result-principal').textContent=money(amount);$('#result-income').textContent=money(total-amount);
  $('#rate-label').textContent=`Сценарий: ${p.rate}% / год`;$('#result-label').textContent=reinvest?'Расчётный капитал':'Капитал и выплаты за период';$('#chart-end').textContent=`Через ${months} ${monthWord(months)}`;
  const points=Array.from({length:13},(_,i)=>{const t=months*i/12,val=reinvest?amount*Math.pow(1+rate,t):amount*(1+rate*t);return `${i*500/12},${155-(val-amount)/(total-amount)*120}`;});
  $('#chart-line').setAttribute('d','M'+points.join(' L'));$('#chart-area').setAttribute('d','M0,155 L'+points.join(' L')+' L500,175 L0,175 Z');
  [$('#amount'),$('#months')].forEach(el=>el.style.setProperty('--fill',100*(el.value-el.min)/(el.max-el.min)+'%'));
}
document.querySelectorAll('#calc-project,#amount,#months,input[name=mode]').forEach(el=>el.addEventListener('input',calculate));calculate();

const menu=$('.menu-toggle'),mobileNav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobileNav.hidden=!open;});
mobileNav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menu.focus();}});

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const themeButton=$('.theme-toggle');
function setTheme(theme){document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-pressed',String(theme==='dark'));themeButton.setAttribute('aria-label',theme==='dark'?'Включить светлую тему':'Включить тёмную тему');$('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#141a17':'#f4f5ed');try{localStorage.setItem('investore-theme',theme)}catch{}}
setTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');
themeButton.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
const intro=$('.intro');
function measureIntroRoll(){
  const letters=intro.querySelector('.wordmark-letters');
  const dot=intro.querySelector('.wordmark-dot');
  const distance=letters.offsetWidth+parseFloat(getComputedStyle(dot).marginLeft);
  intro.style.setProperty('--roll-distance',`${distance}px`);
  intro.style.setProperty('--roll-angle',`${distance/(Math.PI*dot.offsetWidth)*360}deg`);
}
measureIntroRoll();
document.fonts.ready.then(measureIntroRoll);
addEventListener('resize',measureIntroRoll);
function dismissIntro(){intro.classList.add('intro-skipped');intro.inert=true;document.body.classList.add('intro-complete');}
$('.intro-skip').addEventListener('click',dismissIntro);
intro.addEventListener('animationend',e=>{if(e.animationName==='intro-handoff')dismissIntro()});
const introFailsafe=setTimeout(dismissIntro,3200);
if(reduced.matches)dismissIntro();
const layers=[...document.querySelectorAll('.layer')],indexLinks=[...document.querySelectorAll('.stack-index a')];
const hero=$('.immersive-hero'),story=$('.hero-story'),opening=$('.hero-opening'),layout=$('.stack-layout');
const sectionLinks=[...document.querySelectorAll('.desktop-nav a')];
const navSections=sectionLinks.map(link=>document.querySelector(link.hash));
function updateCurrentSection(){
  const boundary=$('.header').getBoundingClientRect().bottom+80;
  const active=navSections.findIndex(section=>{
    const rect=section.getBoundingClientRect();
    return rect.top<=boundary&&rect.bottom>boundary;
  });
  sectionLinks.forEach((link,index)=>{
    if(index===active)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}
$('.stack').insertAdjacentHTML('beforeend','<div class="stack-progress" aria-hidden="true"><i></i></div>');
const clamp=(n)=>Math.max(0,Math.min(1,n));
const ease=(n)=>{n=clamp(n);return n*n*(3-2*n)};
let smoothY=scrollY,targetY=scrollY,frame=0,lastTime=0,layoutStart=0,layoutRange=1,heroRange=1;
function measure(){layoutStart=layout.getBoundingClientRect().top+scrollY;layoutRange=Math.max(1,layout.offsetHeight-innerHeight);heroRange=Math.max(1,hero.offsetHeight-innerHeight);}
function paint(){
  updateCurrentSection();
  const p=clamp(smoothY/heroRange),reveal=ease((p-.57)/.22),out=ease((p-.48)/.14),titleIn=ease((p-.13)/.18),logoOut=ease((p-.04)/.22);
  $('.header').classList.toggle('over-hero',!reduced.matches&&scrollY<hero.offsetHeight-85);
  opening.style.opacity=titleIn*(1-out);opening.style.transform=`translateY(${(1-titleIn)*65-out*55}px)`;
  $('.hero-wordmark').style.opacity=1-logoOut;$('.hero-wordmark').style.transform=`translate(-50%,-50%) translateY(${-logoOut*90}px) scale(${1-logoOut*.18})`;
  $('.hero-annotation').style.opacity=1-logoOut;
  opening.classList.toggle('accent-visible',titleIn>.7);
  document.querySelectorAll('.hero-opening .title-letter').forEach((letter,i)=>{const v=ease((p-.13-i*.004)/.12);letter.style.transform=`translateY(${(1-v)*110}%)`});
  story.style.opacity=reveal;story.style.transform=`translateY(${(1-reveal)*65}px)`;
  story.classList.toggle('is-visible',reveal>.85||reduced.matches);story.inert=!reduced.matches&&reveal<.85;
  $('.hero-landscape').style.transform=`translateY(${-p*18}px) scale(${1.09-p*.07})`;
  $('.hero-progress i').style.transform=`scaleX(${p})`;
  const progress=clamp((smoothY-layoutStart)/layoutRange),phase=progress*2.8;
  const active=Math.min(2,Math.max(0,Math.floor(phase+.06)));
  layers.forEach((layer,i)=>{
    const entry=i===0?1:ease((phase-(i-.45))/.45),exit=i===2?0:ease((phase-(i+.55))/.45);
    layer.style.visibility=entry===0&&!reduced.matches?'hidden':'visible';
    layer.style.transform=`translate3d(0,${(1-entry)*115-exit*4}%,${-exit*190}px) rotateX(${(1-entry)*12+exit*4}deg) scale(${1-(1-entry)*.06-exit*.055})`;
    layer.querySelector('.layer-inner').style.filter=`brightness(${1-exit*.3})`;
    layer.querySelector('.layer-media img').style.transform=`scale(${1.04+(1-entry)*.08+exit*.03}) translateY(${exit*-2}%)`;
    const info=layer.querySelector('.layer-info');info.style.opacity=1-ease((exit-.15)/.85);info.style.transform=`translateY(${(1-entry)*35-exit*15}px)`;
    layer.inert=!reduced.matches&&i!==active;
    if(reduced.matches||i===active)layer.removeAttribute('aria-hidden');else layer.setAttribute('aria-hidden','true');
  });
  indexLinks.forEach((a,i)=>{a.classList.toggle('active',i===active);if(i===active)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
  $('.stack-progress i').style.transform=`scaleX(${progress})`;
}
function tick(time){const dt=Math.min(40,time-lastTime||16);lastTime=time;smoothY+= (targetY-smoothY)*(1-Math.exp(-dt/95));if(Math.abs(targetY-smoothY)<.15)smoothY=targetY;paint();frame=smoothY!==targetY?requestAnimationFrame(tick):0;}
function requestMotion(){targetY=scrollY;if(reduced.matches){smoothY=targetY;paint();return}if(!frame){lastTime=0;frame=requestAnimationFrame(tick)}}
indexLinks.forEach((a,i)=>{a.href=`#layer-${i}`;a.addEventListener('click',e=>{e.preventDefault();if(reduced.matches){layers[i].scrollIntoView({behavior:'instant'});return}measure();scrollTo({top:layoutStart+(i+.14)/2.8*layoutRange,behavior:'smooth'})})});
addEventListener('scroll',requestMotion,{passive:true});addEventListener('resize',()=>{measure();requestMotion();if(innerWidth>800)closeMenu()});reduced.addEventListener('change',()=>{measure();requestMotion();if(reduced.matches)dismissIntro()});
measure();paint();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-active',e.isIntersecting)),{rootMargin:'-20% 0px -30% 0px'});document.querySelectorAll('.step').forEach(el=>observer.observe(el));

// Masked type entrances: semantic headings remain a single readable phrase.
const revealHeadings=[...document.querySelectorAll('.section-heading h2,.how h2,.faq h2,.closing h2')];
revealHeadings.forEach(el=>{
 el.classList.add('kinetic-heading');el.setAttribute('aria-label',el.innerText.replace(/\s+/g,' ').trim());
 const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 let count=0;
 nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const mask=document.createElement('span');mask.className='word-mask';mask.setAttribute('aria-hidden','true');const inner=document.createElement('span');inner.textContent=word;inner.style.transitionDelay=`${Math.min(count++*55,330)}ms`;mask.append(inner);fragment.append(mask)});node.replaceWith(fragment)});
});
const typeObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('type-visible');typeObserver.unobserve(e.target)}}),{threshold:.15});revealHeadings.forEach(el=>typeObserver.observe(el));
const heroTitle=$('#hero-title');heroTitle.setAttribute('aria-label','У инвестиций есть адрес.');
const titleWalker=document.createTreeWalker(heroTitle,NodeFilter.SHOW_TEXT),titleNodes=[];while(titleWalker.nextNode())titleNodes.push(titleWalker.currentNode);
titleNodes.forEach(node=>{if(node.parentElement.closest('svg'))return;const frag=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){frag.append(document.createTextNode(word));return}const mask=document.createElement('span');mask.className='title-word';mask.setAttribute('aria-hidden','true');[...word].forEach(char=>{const span=document.createElement('span');span.className='title-letter';span.textContent=char;mask.append(span)});frag.append(mask)});node.replaceWith(frag)});
paint();

