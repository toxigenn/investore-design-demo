const projects = [
  {
    "id": "obuhovskoy",
    "borrower": "ООО «СКИФ», ИНН 7804613190",
    "name": "пр-т Обуховской Обороны",
    "city": "Санкт-Петербург",
    "rate": 20,
    "termMonths": 36,
    "tenant": "ТД «Каскад» и другие",
    "business": null,
    "tenants": [
      "ВЭЛЛ ООО",
      "ТД Каскад ООО",
      "Щипилло Дмитрий Андреевич ИП",
      "Формат ООО",
      "Прочие"
    ],
    "tenantNote": "В карточке перечислены несколько арендаторов; виды их деятельности не раскрыты.",
    "sourceUrl": "https://investore.club/account/60/"
  },
  {
    "id": "kirpichnye",
    "borrower": "ООО «ОМЕГА», ИНН 4705095672",
    "name": "Кирпичные выемки",
    "city": "Москва",
    "rate": 23,
    "termMonths": 36,
    "tenant": "Арендаторы офисно-складского комплекса",
    "business": "Офисно-складские помещения",
    "tenants": [],
    "tenantNote": "В кабинете указаны офисно-складские помещения, комплекс сдан в аренду. Названия компаний не раскрыты.",
    "sourceUrl": "https://investore.club/account/59/"
  },
  {
    "id": "kozhevnicheskaya",
    "borrower": "ООО «ОМЕГА», ИНН 4705095672",
    "name": "Кожевническая",
    "city": "Москва",
    "rate": 23,
    "termMonths": 36,
    "tenant": "OZON",
    "business": "Интернет-маркетплейс",
    "tenants": [
      "OZON"
    ],
    "tenantNote": "В кабинете указан единственный арендатор OZON; описание бизнеса — интернет-маркетплейс.",
    "sourceUrl": "https://investore.club/account/24/"
  },
  {
    "id": "yaroslavskoe",
    "borrower": "ООО «АЛЬФА», ИНН 7840349512",
    "name": "Ярославское ш.",
    "city": "Москва",
    "rate": 23,
    "termMonths": 36,
    "tenant": "MCK lounge",
    "business": "Кальянная / кафе",
    "tenants": [
      "Кальянная MCK lounge"
    ],
    "tenantNote": "В описании объекта — кальянная «МСК», атмосферное кафе сети.",
    "sourceUrl": "https://investore.club/account/23/"
  },
  {
    "id": "veselaya",
    "borrower": "ООО «ДЕМЕТРИС», ИНН 7839451825",
    "name": "Весёлая",
    "city": "Москва",
    "rate": 23,
    "termMonths": 36,
    "tenant": "«У Палыча» и Яндекс-Маркет",
    "business": "Федеральные торговые сети",
    "tenants": [
      "Кондитерская «У Палыча»",
      "Яндекс-Маркет",
      "Прочие"
    ],
    "tenantNote": "В описании кабинета оба бренда указаны как якорные арендаторы; в таблице есть и прочие арендаторы.",
    "sourceUrl": "https://investore.club/account/9/"
  },
  {
    "id": "irtyshskiy",
    "borrower": "ООО «ВСК», ИНН 7839451818",
    "name": "Иртышский",
    "city": "Москва",
    "rate": 23,
    "termMonths": 36,
    "tenant": "«ТРАНС-ПОРТ», «САДРИН» и другие",
    "business": "Офисно-складские здания",
    "tenants": [
      "ООО «ТРАНС-ПОРТ»",
      "ООО «КОМПАНИЯ САДРИН»",
      "ИП Столярчук Иван Григорьевич",
      "Прочие"
    ],
    "tenantNote": "Тип использования объекта указан в описании арендаторов; виды деятельности отдельных компаний не раскрыты.",
    "sourceUrl": "https://investore.club/account/100/"
  }
];
const $ = (s) => document.querySelector(s);
const money = (n) => Math.round(n).toLocaleString('ru-RU') + ' ₽';
const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
const photo = (p,loading='lazy',sizes='(max-width: 560px) 100vw, (max-width: 800px) 50vw, 33vw') => `<img src="./assets/enhanced/${p.id}-1920.webp" srcset="./assets/enhanced/${p.id}-960.webp 960w, ./assets/enhanced/${p.id}-1920.webp 1920w, ./assets/enhanced/${p.id}-3200.webp 3200w" sizes="${sizes}" alt="Объект ${p.name}, ${p.city} — AI-обработка исходного изображения" loading="${loading}" decoding="async" width="1280" height="800">`;
const source = 'https://investore.club/object_gallery/';
let toastTimer;
function toast(message){$('.toast').textContent=message;$('.toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').hidden=true,3500);}

const featured = ['kozhevnicheskaya','kirpichnye','veselaya'].map(id=>projects.find(p=>p.id===id));
$('#stack').innerHTML=featured.map((p,i)=>`<article class="layer" id="layer-${i}" style="z-index:${i+1}" aria-labelledby="layer-title-${i}"><div class="layer-inner"><div class="layer-media">${photo(p,'lazy','100vw')}<div class="layer-top"><span>${p.city}</span><span class="layer-count">0${i+1} / 03</span></div></div><div class="layer-info"><div><h3 id="layer-title-${i}">${p.name}</h3><p>${p.tenant} · ${p.business||'Несколько арендаторов'}</p></div><div class="layer-price"><strong>${p.rate}%</strong><small>годовых</small><small class="rate-premium">Премия 2% при досрочном погашении</small></div><div class="layer-actions"><button class="button yellow" data-detail="${p.id}">Изучить объект ${icon('diagonal')}</button><span>Заявленная ставка не гарантирует доход. Полные условия — на платформе.</span></div></div></div></article>`).join('');

document.querySelectorAll('.layer').forEach((layer,i)=>{
  const marker=document.createElement('span');marker.id=`layer-jump-${i}`;marker.className='layer-marker';marker.setAttribute('aria-hidden','true');layer.before(marker);
  document.querySelectorAll('.stack-index a')[i].href=`#layer-jump-${i}`;
});

$('#catalog-grid').innerHTML=projects.map(p=>`<article class="project-card" data-id="${p.id}" data-city="${p.city}"><button class="project-image" data-detail="${p.id}" aria-label="Открыть ${p.name}">${photo(p)}<span class="image-arrow">${icon('diagonal')}</span></button><p class="project-city">${p.city}</p><h3>${p.name}</h3><div class="project-data"><strong>${p.rate}%<small>годовых</small><small class="rate-premium">Премия 2% при досрочном погашении</small></strong><p class="project-tenant"><span>Арендаторы</span>${p.tenant}<small>${p.business||'Виды бизнеса в кабинете не раскрыты'}</small></p></div><div class="project-bottom"><button data-detail="${p.id}">Подробнее ${icon('arrow')}</button></div></article>`).join('');

$('.filters').addEventListener('click',e=>{
  const button=e.target.closest('[data-city]');if(!button)return;
  document.querySelectorAll('.filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  let count=0;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.city!=='all'&&card.dataset.city!==button.dataset.city;if(!card.hidden)count++;});
  $('#catalog-status').textContent=`Показано объектов: ${count}`;
});

let lastTrigger=null;
function openDialog(dialog,trigger){lastTrigger=trigger;dialog.showModal();document.body.classList.add('locked');dialog.querySelector('button')?.focus();}
document.querySelectorAll('dialog:not(#assistant-panel)').forEach(d=>{
  d.querySelector('.dialog-close').addEventListener('click',()=>d.close());
  d.addEventListener('close',()=>{document.body.classList.remove('locked');if(lastTrigger?.isConnected)lastTrigger.focus({preventScroll:true});});
  d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
});

function tenantDetails(p){return `<div class="tenant-details"><h3>Бизнес в объекте</h3>${p.tenants.length?`<ul>${p.tenants.map(name=>`<li>${name}</li>`).join('')}</ul>`:''}<p>${p.tenantNote}</p><p class="source-note">Арендаторы и описание объекта сверены с карточкой кабинета 09.10.2026. <a href="${p.sourceUrl}" target="_blank" rel="noopener">Открыть источник ${icon('diagonal')}</a></p></div>`;}
function detail(id,trigger){const p=projects.find(p=>p.id===id);if(!p)return;
  $('#detail-content').innerHTML=`${photo(p,'eager','(max-width: 820px) 100vw, 820px').replace('<img','<img class="detail-image"')}<div class="detail-body"><p>${p.city}</p><h2 id="detail-title">${p.name}</h2><dl class="detail-facts"><div><dt>Переменная часть ставки</dt><dd>${p.rate}% годовых</dd></div><div><dt>Арендаторы</dt><dd>${p.tenant}</dd></div><div><dt>Тип бизнеса / использование объекта</dt><dd>${p.business||'Виды бизнеса не раскрыты в кабинете'}</dd></div><div><dt>Заёмщик — собственник</dt><dd>${p.borrower}</dd></div><div><dt>Срок по просмотренной оферте</dt><dd>${p.termMonths} месяцев; дата возврата — по договору</dd></div><div><dt>Фиксированная часть ставки</dt><dd>0,01% годовых</dd></div><div><dt>Условная премия</dt><dd>2% только при досрочном погашении</dd></div></dl>${tenantDetails(p)}<p> Для решения об инвестиции изучите договор, риски и актуальную доступность на исходной платформе.</p><div class="detail-cta"><button class="button yellow" data-calculate="${p.id}">Рассчитать сценарий ${icon('arrow')}</button><a class="button light" href="${p.sourceUrl}" target="_blank" rel="noopener">Карточка в кабинете ${icon('diagonal')}</a></div><p class="source-note">Ставка не гарантирует получение дохода. Полные условия определяет оферта объекта. Изображение улучшено с помощью AI; мелкие детали могут отличаться. <a href="./assets/${p.id}.jpg" target="_blank" rel="noopener">Исходное изображение ↗</a></p></div>`;
  openDialog($('#detail-dialog'),trigger);
}
document.addEventListener('click',e=>{
  const detailButton=e.target.closest('[data-detail]');if(detailButton)detail(detailButton.dataset.detail,detailButton);
  const calcButton=e.target.closest('[data-calculate]');if(calcButton){$('#calc-project').value=calcButton.dataset.calculate;calculate();lastTrigger=$('#calc-project');$('#detail-dialog').close();$('#calculator').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});$('#calc-project').focus({preventScroll:true});}
});

$('#calc-project').innerHTML=projects.map(p=>`<option value="${p.id}">${p.name} · ${p.rate}%</option>`).join('');$('#calc-project').value='kozhevnicheskaya';
function monthWord(n){return n%10===1&&n%100!==11?'месяц':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'месяца':'месяцев';}
const monthlyMoney = n => n.toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2})+' ₽';
function calculate(){
  const p=projects.find(p=>p.id===$('#calc-project').value),amount=Number($('#amount').value);
  $('#months').max=p.termMonths;
  const months=Math.min(Number($('#months').value),p.termMonths);$('#months').value=months;
  const monthly=amount*p.rate/100/12;
  $('#amount-output').textContent=money(amount);$('#months-output').textContent=`${months} ${monthWord(months)}`;
  $('#result-total').textContent=monthlyMoney(monthly);$('#result-principal').textContent=money(amount);$('#result-income').textContent=money(monthly*months);
  $('.calc-note').textContent=`Иллюстративная ежемесячная модель по переменной ставке ${p.rate}% годовых из просмотренной оферты. Диапазон 10 000–600 000 ₽ задан для расчёта, а не подтверждает доступную сумму инвестирования. В офертах 2024–2025 указана сумма одному инвестору 100 000 ₽ и поле выплат «Другой период». Актуальные сумму, ставку и график проверяйте в действующем договоре. Фиксированные 0,01%, условная премия 2%, налоги, комиссии и задержки не учтены.`;
  $('#rate-label').textContent=`${p.rate}% годовых`;$('#income-label').textContent=`Проценты за ${months} ${monthWord(months)}`;
  $('#calc-term').textContent=`${p.termMonths} ${monthWord(p.termMonths)}`;
  $('#principal-return').textContent=`В конце срока займа — ${p.termMonths} ${monthWord(p.termMonths)}`;
  $('#months').nextElementSibling.lastElementChild.textContent=`${p.termMonths} ${monthWord(p.termMonths)}`;
  [$('#amount'),$('#months')].forEach(el=>el.style.setProperty('--fill',100*(el.value-el.min)/(el.max-el.min)+'%'));
}
document.querySelectorAll('#calc-project,#amount,#months').forEach(el=>el.addEventListener('input',calculate));calculate();

const menu=$('.menu-toggle'),mobileNav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobileNav.hidden=!open;});
mobileNav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menu.focus();}});

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const themeButton=$('.theme-toggle');
function setTheme(theme){document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-pressed',String(theme==='dark'));themeButton.setAttribute('aria-label',theme==='dark'?'Включить светлую тему':'Включить тёмную тему');$('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#111318':'#f4f5ed');try{localStorage.setItem('investore-theme',theme)}catch{}}
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
const motionHeader=$('.header'),heroWordmark=$('.hero-wordmark'),heroAnnotation=$('.hero-annotation'),introInfo=$('.hero-intro-info'),heroLandscape=$('.hero-landscape'),heroProgress=$('.hero-progress i');
const titleLetters=[...document.querySelectorAll('.hero-opening .title-letter')];
const layerNodes=layers.map(layer=>({layer,inner:layer.querySelector('.layer-inner'),image:layer.querySelector('.layer-media img'),info:layer.querySelector('.layer-info')}));
const sectionLinks=[...document.querySelectorAll('.desktop-nav a')];
const navSections=sectionLinks.map(link=>document.querySelector(link.hash));
let sectionBounds=[],headerBoundary=176;
function updateCurrentSection(){
  const boundary=scrollY+headerBoundary;
  const active=sectionBounds.findIndex(rect=>rect.top<=boundary&&rect.bottom>boundary);
  sectionLinks.forEach((link,index)=>{
    if(index===active)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}
$('.stack').insertAdjacentHTML('beforeend','<div class="stack-progress" aria-hidden="true"><i></i></div>');
const stackProgress=$('.stack-progress i');
const clamp=(n)=>Math.max(0,Math.min(1,n));
const ease=(n)=>{n=clamp(n);return n*n*(3-2*n)};
let smoothY=scrollY,targetY=scrollY,frame=0,lastTime=0,layoutStart=0,layoutRange=1,heroRange=1;
function measure(){layoutStart=layout.getBoundingClientRect().top+scrollY;layoutRange=Math.max(1,layout.offsetHeight-innerHeight);heroRange=Math.max(1,hero.offsetHeight-innerHeight);headerBoundary=motionHeader.offsetHeight+80;sectionBounds=navSections.map(section=>{const rect=section.getBoundingClientRect();return {top:rect.top+scrollY,bottom:rect.bottom+scrollY}});}
function paint(){
  updateCurrentSection();
  const p=clamp(smoothY/heroRange),reveal=ease((p-.57)/.22),out=ease((p-.48)/.14),titleIn=ease((p-.13)/.18),logoOut=ease((p-.04)/.22);
  motionHeader.classList.toggle('over-hero',!reduced.matches&&scrollY<heroRange+innerHeight-85);
  opening.style.opacity=titleIn*(1-out);opening.style.transform=`translateY(${(1-titleIn)*65-out*55}px)`;
  heroWordmark.style.opacity=1-logoOut;heroWordmark.style.transform=`translate(-50%,-50%) translateY(${-logoOut*90}px) scale(${1-logoOut*.18})`;
  heroAnnotation.style.opacity=1-logoOut;
  const infoOut=ease((p-.06)/.2);
  introInfo.style.opacity=1-infoOut;introInfo.style.transform=`translateY(${-infoOut*25}px)`;introInfo.inert=!reduced.matches&&infoOut>.85;
  opening.classList.toggle('accent-visible',titleIn>.7);
  titleLetters.forEach((letter,i)=>{const v=ease((p-.13-i*.004)/.12);letter.style.transform=`translateY(${(1-v)*110}%)`});
  story.style.opacity=reveal;story.style.transform=`translateY(${(1-reveal)*65}px)`;
  story.classList.toggle('is-visible',reveal>.85||reduced.matches);story.inert=!reduced.matches&&reveal<.85;
  heroLandscape.style.transform=`translateY(${-p*18}px) scale(${1.09-p*.07})`;
  heroProgress.style.transform=`scaleX(${p})`;
  const progress=clamp((smoothY-layoutStart)/layoutRange),phase=progress*2.8;
  const active=Math.min(2,Math.max(0,Math.floor(phase+.06)));
  layerNodes.forEach(({layer,inner,image,info},i)=>{
    if(reduced.matches){layer.style.visibility='visible';layer.style.transform='none';inner.style.filter='none';image.style.transform='none';info.style.opacity=1;info.style.transform='none';layer.inert=false;layer.removeAttribute('aria-hidden');return;}
    const entry=i===0?1:ease((phase-(i-.45))/.45),exit=i===2?0:ease((phase-(i+.55))/.45);
    layer.style.visibility=entry===0&&!reduced.matches?'hidden':'visible';
    layer.style.transform=`translate3d(0,${(1-entry)*115-exit*4}%,${-exit*190}px) rotateX(${(1-entry)*12+exit*4}deg) scale(${1-(1-entry)*.06-exit*.055})`;
    inner.style.filter=`brightness(${1-exit*.3})`;
    image.style.transform=`scale(${1.04+(1-entry)*.08+exit*.03}) translateY(${exit*-2}%)`;
    info.style.opacity=1-ease((exit-.15)/.85);info.style.transform=`translateY(${(1-entry)*35-exit*15}px)`;
    layer.inert=!reduced.matches&&i!==active;
    if(reduced.matches||i===active)layer.removeAttribute('aria-hidden');else layer.setAttribute('aria-hidden','true');
  });
  indexLinks.forEach((a,i)=>{a.classList.toggle('active',i===active);if(i===active)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
  stackProgress.style.transform=`scaleX(${progress})`;
}
function tick(time){const dt=Math.min(40,time-lastTime||16);lastTime=time;smoothY+= (targetY-smoothY)*(1-Math.exp(-dt/95));if(Math.abs(targetY-smoothY)<.15)smoothY=targetY;paint();frame=smoothY!==targetY?requestAnimationFrame(tick):0;}
function requestMotion(){targetY=scrollY;if(reduced.matches){smoothY=targetY;paint();return}if(!frame){lastTime=0;frame=requestAnimationFrame(tick)}}
indexLinks.forEach((a,i)=>{a.href=`#layer-${i}`;a.addEventListener('click',e=>{e.preventDefault();if(reduced.matches){layers[i].scrollIntoView({behavior:'instant'});return}measure();scrollTo({top:layoutStart+(i+.14)/2.8*layoutRange,behavior:'smooth'})})});
addEventListener('scroll',requestMotion,{passive:true});addEventListener('resize',()=>{measure();requestMotion();if(innerWidth>1200)closeMenu()});reduced.addEventListener('change',()=>{measure();requestMotion();if(reduced.matches)dismissIntro()});
measure();paint();
document.fonts.ready.then(()=>{measure();requestMotion()});
const layoutObserver=new ResizeObserver(()=>{measure();requestMotion()});layoutObserver.observe(document.querySelector('main'));
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

