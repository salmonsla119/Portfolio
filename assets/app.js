/* 데이터(assets/data.js)를 읽어 각 페이지를 그리는 스크립트.
   빌드 과정 없이 file:// 에서도 그대로 돌아갑니다. */
(function(){
'use strict';
var d=window.PORTFOLIO_DATA||{};

function e(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){
  return{'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
function q(id){return document.getElementById(id)}
function projects(){return d.projects||[]}

/* ===== 벡터 아이콘 =====
   24x24 선 아이콘. 색은 currentColor, 굵기는 CSS(.ico)에서 정한다.
   HTML/JS 어디서든 data-ico="이름" 만 적어 두면 paintIcons() 가 넣어 준다. */
var ICONS={
  doc:'<path d="M13.5 2H7a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6.5z"/><path d="M13.5 2v4.5H18"/><path d="M9 13h6M9 17h6"/>',
  pen:'<path d="M4 20h4L20 8l-4-4L4 16z"/><path d="M14.5 5.5l4 4"/>',
  grid:'<rect x="3" y="3" width="7.5" height="7.5"/><rect x="13.5" y="3" width="7.5" height="7.5"/><rect x="3" y="13.5" width="7.5" height="7.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5"/>',
  film:'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M7.5 5v14M16.5 5v14M3 12h18"/>',
  sound:'<path d="M4 9.5h3.5L12 6v12L7.5 14.5H4z"/><path d="M16 9.5a4 4 0 0 1 0 5"/><path d="M18.5 7a7 7 0 0 1 0 10"/>',
  mute:'<path d="M4 9.5h3.5L12 6v12L7.5 14.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
  quote:'<path d="M9.5 6H5v5.5h4.5c0 3.5-1.5 4.5-3.5 5.5"/><path d="M19 6h-4.5v5.5H19c0 3.5-1.5 4.5-3.5 5.5"/>',
  swap:'<path d="M3 8.5h15"/><path d="M14.5 5l3.5 3.5-3.5 3.5"/><path d="M21 15.5H6"/><path d="M9.5 12L6 15.5 9.5 19"/>',
  clip:'<rect x="5" y="4" width="14" height="18" rx="1"/><path d="M9 4V2.5h6V4"/><path d="M9 10.5h6M9 14.5h6"/>',
  down:'<path d="M12 3.5v11.5"/><path d="M7.5 11L12 15.5 16.5 11"/><path d="M4 20h16"/>',
  back:'<path d="M20 12H4"/><path d="M10 6l-6 6 6 6"/>',
  image:'<rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="8.5" cy="10" r="1.6"/><path d="M21 16.5l-5.5-5.5L9 17.5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  badge:'<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 22l5-2.6L17 22l-1.5-8.5"/>',
  award:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2L3.2 9.5l6.1-.9z"/>',
  case:'<rect x="3" y="7" width="18" height="13" rx="1"/><path d="M9 7V4.5h6V7"/><path d="M3 12.5h18"/>',
  layers:'<path d="M12 3l9 4.8-9 4.8-9-4.8z"/><path d="M3 12.5l9 4.8 9-4.8"/>',
  tool:'<path d="M3 7.5h9M17 7.5h4M3 16.5h4M12 16.5h9"/><circle cx="14.5" cy="7.5" r="2.4"/><circle cx="8.5" cy="16.5" r="2.4"/>',
  alert:'<path d="M12 3.2L1.9 20.8h20.2z"/><path d="M12 9.5v4.8M12 17.6h.01"/>',
  /* 기획(연필) × 아트(붓)을 엇갈려 놓은 하이브리드 아이콘. 붓 쪽만 하늘색. */
  /* 문서에 붓칠 — 사용자가 그린 아이콘. 자체 viewBox(512)와 선 굵기를 쓴다.
     색은 우리 변수로: 흰회색 = currentColor, 하늘색 = .a / .fill-a */
  hybrid:{vb:'0 0 512 512',sw:20,p:
     '<path d="M302 80H81a25 25 0 0 0-25 25v336a25 25 0 0 0 25 25h276a25 25 0 0 0 25-25V262"/>'
    +'<path d="M107 146h117M107 194h76"/>'
    +'<path class="fill-a no-line" d="M132 422C181 477 313 492 474 402C358 456 225 457 151 413C141 407 129 411 132 422Z"/>'
    +'<g class="a">'
      +'<path d="M270 268C314 213 425 75 472 43c13-9 19-8 14 8-18 49-127 187-176 239Z"/>'
      +'<path d="m270 268-30 34 40 35 30-47"/>'
      +'<path class="fill-a" d="M240 302c-43 0-64 25-72 63-7 33-14 49-36 57 62 23 132 10 148-85"/>'
    +'</g>'}
};
function icon(name){
  var x=ICONS[name];if(!x)return'';
  /* 문자열이면 기본 24x24 선 아이콘, 객체면 그 아이콘의 viewBox·선 굵기를 따른다 */
  var vb=x.vb||'0 0 24 24',p=x.p||x,
      sw=x.sw?' style="stroke-width:'+x.sw+'"':'';
  return'<svg class="ico" viewBox="'+vb+'"'+sw+' aria-hidden="true" focusable="false">'+p+'</svg>';
}
/* ===== 특기 사항 도트 아이콘 =====
   이전 디자인(design-v1)에서 그대로 가져왔다. 색은 CSS의 .px-* 가 정하므로
   새 팔레트(하늘색·분홍·흰색)를 따라간다. data.js 의 specialties.icon 으로 고른다. */
var SPEC_ICONS={
art:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="4" y="2" width="8" height="1"/><rect x="2" y="3" width="12" height="1"/><rect x="1" y="4" width="14" height="1"/><rect x="0" y="5" width="16" height="1"/><rect x="0" y="6" width="16" height="1"/><rect x="0" y="7" width="16" height="1"/><rect x="1" y="8" width="14" height="1"/><rect x="2" y="9" width="12" height="1"/><rect x="3" y="10" width="10" height="1"/><rect x="5" y="11" width="7" height="1"/><rect x="6" y="12" width="5" height="1"/></g><g class="px-sand"><rect x="4" y="3" width="8" height="1"/><rect x="2" y="4" width="12" height="1"/><rect x="1" y="5" width="14" height="1"/><rect x="1" y="6" width="14" height="1"/><rect x="1" y="7" width="14" height="1"/><rect x="2" y="8" width="12" height="1"/><rect x="3" y="9" width="10" height="1"/><rect x="5" y="10" width="7" height="1"/><rect x="6" y="11" width="5" height="1"/></g><g class="px-red"><rect x="3" y="4" width="2" height="1"/><rect x="3" y="5" width="2" height="1"/></g><g class="px-yellow"><rect x="7" y="3" width="2" height="1"/><rect x="7" y="4" width="2" height="1"/></g><g class="px-blue"><rect x="11" y="5" width="2" height="1"/><rect x="11" y="6" width="2" height="1"/></g><g class="px-green"><rect x="5" y="7" width="2" height="1"/><rect x="5" y="8" width="2" height="1"/></g><g class="px-cream"><rect x="9" y="8" width="2" height="1"/><rect x="9" y="9" width="2" height="1"/></g></svg>',
  grit:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="7" y="0" width="2" height="1"/><rect x="6" y="1" width="4" height="1"/><rect x="6" y="2" width="4" height="1"/><rect x="5" y="3" width="5" height="1"/><rect x="11" y="3" width="2" height="1"/><rect x="4" y="4" width="10" height="1"/><rect x="3" y="5" width="11" height="1"/><rect x="3" y="6" width="11" height="1"/><rect x="2" y="7" width="12" height="1"/><rect x="2" y="8" width="12" height="1"/><rect x="2" y="9" width="12" height="1"/><rect x="3" y="10" width="10" height="1"/><rect x="3" y="11" width="10" height="1"/><rect x="4" y="12" width="8" height="1"/><rect x="5" y="13" width="6" height="1"/><rect x="6" y="14" width="4" height="1"/></g><g class="px-orange"><rect x="7" y="1" width="2" height="1"/><rect x="7" y="2" width="2" height="1"/><rect x="6" y="3" width="3" height="1"/><rect x="5" y="4" width="5" height="1"/><rect x="11" y="4" width="2" height="1"/><rect x="4" y="5" width="9" height="1"/><rect x="4" y="6" width="9" height="1"/><rect x="3" y="7" width="10" height="1"/><rect x="3" y="8" width="10" height="1"/><rect x="3" y="9" width="10" height="1"/><rect x="4" y="10" width="8" height="1"/><rect x="4" y="11" width="8" height="1"/><rect x="5" y="12" width="6" height="1"/><rect x="6" y="13" width="4" height="1"/></g><g class="px-yellow"><rect x="7" y="7" width="3" height="1"/><rect x="6" y="8" width="5" height="1"/><rect x="6" y="9" width="5" height="1"/><rect x="6" y="10" width="5" height="1"/><rect x="7" y="11" width="3" height="1"/><rect x="7" y="12" width="2" height="1"/></g></svg>',
  time:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="6" y="1" width="4" height="1"/><rect x="4" y="2" width="8" height="1"/><rect x="3" y="3" width="10" height="1"/><rect x="2" y="4" width="12" height="1"/><rect x="2" y="5" width="12" height="1"/><rect x="1" y="6" width="14" height="1"/><rect x="1" y="7" width="14" height="1"/><rect x="1" y="8" width="14" height="1"/><rect x="1" y="9" width="14" height="1"/><rect x="2" y="10" width="12" height="1"/><rect x="2" y="11" width="12" height="1"/><rect x="3" y="12" width="10" height="1"/><rect x="4" y="13" width="8" height="1"/><rect x="6" y="14" width="4" height="1"/></g><g class="px-cream"><rect x="6" y="2" width="4" height="1"/><rect x="4" y="3" width="8" height="1"/><rect x="3" y="4" width="10" height="1"/><rect x="3" y="5" width="10" height="1"/><rect x="2" y="6" width="12" height="1"/><rect x="2" y="7" width="12" height="1"/><rect x="2" y="8" width="12" height="1"/><rect x="2" y="9" width="12" height="1"/><rect x="3" y="10" width="10" height="1"/><rect x="3" y="11" width="10" height="1"/><rect x="4" y="12" width="8" height="1"/><rect x="6" y="13" width="4" height="1"/></g><g class="px-sand"><rect x="7" y="3" width="2" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="12" y="7" width="1" height="1"/><rect x="3" y="8" width="1" height="1"/><rect x="12" y="8" width="1" height="1"/><rect x="7" y="12" width="2" height="1"/></g><g class="px-ink"><rect x="7" y="4" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="7" y="7" width="4" height="1"/></g></svg>',
  team:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="2" y="1" width="4" height="1"/><rect x="10" y="1" width="4" height="1"/><rect x="2" y="2" width="4" height="1"/><rect x="10" y="2" width="4" height="1"/><rect x="2" y="3" width="4" height="1"/><rect x="10" y="3" width="4" height="1"/><rect x="3" y="4" width="2" height="1"/><rect x="11" y="4" width="2" height="1"/><rect x="1" y="5" width="6" height="1"/><rect x="9" y="5" width="6" height="1"/><rect x="0" y="6" width="7" height="1"/><rect x="9" y="6" width="7" height="1"/><rect x="0" y="7" width="16" height="1"/><rect x="0" y="8" width="16" height="1"/><rect x="0" y="9" width="7" height="1"/><rect x="9" y="9" width="7" height="1"/><rect x="1" y="10" width="5" height="1"/><rect x="10" y="10" width="5" height="1"/><rect x="1" y="11" width="5" height="1"/><rect x="10" y="11" width="5" height="1"/></g><g class="px-skin"><rect x="3" y="2" width="2" height="1"/><rect x="11" y="2" width="2" height="1"/><rect x="3" y="3" width="2" height="1"/><rect x="11" y="3" width="2" height="1"/></g><g class="px-blue"><rect x="3" y="5" width="2" height="1"/><rect x="1" y="6" width="5" height="1"/><rect x="1" y="7" width="5" height="1"/><rect x="1" y="8" width="5" height="1"/><rect x="1" y="9" width="5" height="1"/><rect x="2" y="10" width="3" height="1"/></g><g class="px-green"><rect x="11" y="5" width="2" height="1"/><rect x="10" y="6" width="5" height="1"/><rect x="10" y="7" width="5" height="1"/><rect x="10" y="8" width="5" height="1"/><rect x="10" y="9" width="5" height="1"/><rect x="11" y="10" width="3" height="1"/></g><g class="px-yellow"><rect x="6" y="7" width="1" height="1"/><rect x="9" y="7" width="1" height="1"/><rect x="6" y="8" width="1" height="1"/><rect x="9" y="8" width="1" height="1"/></g><g class="px-ink"><rect x="3" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="11" y="2" width="1" height="1"/><rect x="13" y="2" width="1" height="1"/></g></svg>'
};

/* data-ico 가 붙은 곳에 아이콘을 한 번씩만 넣는다. */
function paintIcons(root){
  var els=(root||document).querySelectorAll('[data-ico]');
  for(var i=0;i<els.length;i++){
    var el=els[i];
    if(el.querySelector('svg.ico'))continue;
    el.insertAdjacentHTML('afterbegin',icon(el.getAttribute('data-ico')));
  }
}

/* 유튜브 주소에서 영상 아이디만 뽑는다 (메인 무대용). */
function youtubeId(src){
  var yt=String(src||'').match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return yt?yt[1]:'';
}

/* 엑셀 표. file:// 에서는 .xlsx 를 읽지 못하므로
   tools/xlsx-to-sheets.py 로 미리 뽑아 둔 assets/sheets.js 를 표로 그린다. */
function sheetTable(key){
  var store=window.PORTFOLIO_SHEETS||{},sheet=store[key];
  if(!sheet)return'';
  var colgroup=(sheet.cols||[]).map(function(w){
        return'<col style="width:'+Math.max(48,Math.round((+w||10)*8))+'px">'}).join(''),
      body=(sheet.rows||[]).map(function(row){
        return'<tr>'+row.map(function(c){
          var attr='',style='';
          if(c.cs)attr+=' colspan="'+(parseInt(c.cs,10)||1)+'"';
          if(c.rs)attr+=' rowspan="'+(parseInt(c.rs,10)||1)+'"';
          if(c.f&&/^#[0-9a-fA-F]{6}$/.test(c.f)){
            style+='background:'+c.f+';';
            var n=parseInt(c.f.slice(1),16),
                lum=(((n>>16)&255)*299+((n>>8)&255)*587+(n&255)*114)/1000;
            if(lum<150)style+='color:#fff;';
          }
          if(c.b)style+='font-weight:700;';
          if(style)attr+=' style="'+style+'"';
          return'<td'+attr+'>'+e(c.v||'')+'</td>';
        }).join('')+'</tr>';
      }).join('');
  return'<div class="sheet-wrap" tabindex="0" aria-label="'+e(sheet.title||'표')+'">'
    +'<table class="sheet-table">'+(colgroup?'<colgroup>'+colgroup+'</colgroup>':'')
    +'<tbody>'+body+'</tbody></table></div>';
}

/* ================= 메인: 특기 사항 =================
   첫 화면 오른쪽에 목록으로 두고, 누르면 그 옆에 설명판이 열린다. */
(function(){
  var list=q('spec-list'),panel=q('spec-panel');if(!list||!panel)return;
  var items=d.specialties||[];
  list.innerHTML=items.map(function(x,i){
    return'<li><button type="button" class="spec-item" data-i="'+i+'" aria-expanded="false">'
      +'<span class="spec-ico">'+(SPEC_ICONS[x.icon]||SPEC_ICONS.art)+'</span>'
      +'<span class="spec-name">'+e(x.title||'제목 입력')+'</span>'
    +'</button></li>'}).join('')||'<li class="rs-empty">특기 사항을 입력해 주세요</li>';

  var btns=list.querySelectorAll('.spec-item'),at=-1,pinned=-1;
  function open(n){
    var x=items[n];if(!x)return;
    at=n;
    panel.innerHTML='<p class="spec-eyebrow">'+e(x.eyebrow||'')+'</p>'
      +'<h3>'+e(x.title||'제목 입력')+'</h3>'
      +'<p class="spec-detail">'+e(x.detail||'설명 입력')+'</p>';
    panel.hidden=false;
    for(var i=0;i<btns.length;i++){
      btns[i].classList.toggle('on',i===n);
      btns[i].setAttribute('aria-expanded',i===n?'true':'false');
    }
  }
  function close(){
    at=-1;panel.hidden=true;
    for(var i=0;i<btns.length;i++){
      btns[i].classList.remove('on');btns[i].setAttribute('aria-expanded','false');
    }
  }
  /* 마우스를 올리기만 해도 열리고, 누르면 그 항목이 고정된다. */
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('mouseenter',function(ev){
      open(parseInt(ev.currentTarget.getAttribute('data-i'),10)||0)});
    btns[i].addEventListener('focus',function(ev){
      open(parseInt(ev.currentTarget.getAttribute('data-i'),10)||0)});
    btns[i].addEventListener('click',function(ev){
      var n=parseInt(ev.currentTarget.getAttribute('data-i'),10)||0;
      if(pinned===n){pinned=-1;close()}else{pinned=n;open(n)}
    });
  }
  /* 목록 밖으로 나가면 고정해 둔 항목으로 돌아간다(없으면 닫는다). */
  list.addEventListener('mouseleave',function(){
    if(pinned>=0){if(at!==pinned)open(pinned)}else close();
  });
})();

/* ================= 메인: 히어로 무대 =================
   큰 네모 하나에 프로젝트를 한 개씩. 영상이 있으면 영상, 없으면 대표 이미지.
   좌우 화살표로 넘기고, 아래 띠를 누르면 상세로 간다. */
(function(){
  var stage=q('stage');if(!stage)return;
  var list=projects(),at=0,count=q('stage-count'),stageLink=q('stage-link');
  function render(){
    var p=list[at];
    if(!p){stage.innerHTML='<div class="screen-empty">프로젝트를 추가해 주세요</div>';return}
    var clip=(p.shortVideos||[])[0],
        ytid=clip?youtubeId(clip.src):'',
        media='';
    /* 그림을 먼저 깔고(영상이 뜨기 전·막혔을 때 대비) 그 위에 소리 없이 자동 재생되는 영상을 얹는다.
       영상에는 pointer-events:none 을 줘서 클릭은 전부 바깥 링크가 받는다. */
    if(ytid){
      media='<img class="screen-img" src="https://img.youtube.com/vi/'+e(ytid)+'/maxresdefault.jpg" alt="" '
        +'onerror="if(this.dataset.fb){this.style.display=\'none\'}else{this.dataset.fb=1;'
        +'this.src=\'https://img.youtube.com/vi/'+e(ytid)+'/hqdefault.jpg\'}">'
        +'<iframe class="screen-video" src="https://www.youtube.com/embed/'+e(ytid)
        +'?autoplay=1&mute=1&loop=1&playlist='+e(ytid)+'&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0"'
        +' title="'+e(p.title)+'" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin"'
        +' frameborder="0" tabindex="-1" aria-hidden="true"></iframe>';
    }else if(clip&&clip.src){
      media='<video class="screen-video" src="'+e(clip.src)+'" autoplay muted loop playsinline'
        +(p.image?' poster="'+e(p.image)+'"':'')+'></video>';
    }else if(p.image){
      media='<img class="screen-img" src="'+e(p.image)+'" alt="'+e(p.title)+'">';
    }else{
      media='<span class="screen-empty">영상이나 대표 이미지를 넣어 주세요</span>';
    }
    /* 무대를 누르면 그 프로젝트 상세 페이지로 넘어간다 */
    stage.innerHTML='<span class="screen-media">'+media+'</span>'
      +'<a class="screen-go" href="project.html?id='+encodeURIComponent(p.id)+'" '
      +'aria-label="'+e(p.title)+' 프로젝트 보기"></a>';
    if(count)count.textContent=(at+1)+' / '+list.length;
    /* 아래 줄의 "프로젝트 보기"도 지금 보고 있는 프로젝트로 */
    if(stageLink)stageLink.setAttribute('href','project.html?id='+encodeURIComponent(p.id));
  }
  var arrows=document.querySelectorAll('.frame-nav .arrow');
  for(var i=0;i<arrows.length;i++){
    arrows[i].addEventListener('click',function(ev){
      if(!list.length)return;
      at=(at+(parseInt(ev.currentTarget.getAttribute('data-dir'),10)||1)+list.length)%list.length;
      render();
    });
  }
  render();
})();

/* ================= 프로젝트 목록 ================= */
(function(){
  var grid=q('project-grid');if(!grid)return;
  grid.innerHTML=projects().map(function(p){
    var cover=p.image||((p.images||[])[0]||{}).src||'';
    return'<a class="proj-card" href="project.html?id='+encodeURIComponent(p.id)+'">'
      +'<div class="proj-card-thumb">'+(cover?'<img src="'+e(cover)+'" alt="'+e(p.title)+'" loading="lazy">':'이미지 추가 영역')+'</div>'
      +'<div class="proj-card-meta"><span>'+e(p.year)+'</span><h2>'+e(p.title)+'</h2><p>'+e(p.role)+'</p></div></a>';
  }).join('')||'<p class="rs-empty">프로젝트를 추가해 주세요</p>';
})();

/* ================= 양식(블록) 호출 =================
   프로젝트 상세 페이지의 "순서와 구성"은 data.js 의 md 칸이 정한다.

     @@해결
     ---
     전: assets/images/before.png
     후: assets/images/after.png

     설명을 마크다운으로 적는다. **굵게**, - 목록, > 인용 모두 쓸 수 있다.

   규칙
   1) `@@이름` 한 줄이 양식 호출이다. 다음 `@@` 줄(또는 글 끝)까지가 그 양식의 내용.
   2) 이름 바로 아래 `---` 한 줄은 보기 좋게 넣는 구분선으로 보고 그냥 넘긴다.
   3) 내용 맨 위의 `키: 값` 줄은 그 양식의 칸을 채운다(FIELD_KEY 에 있는 이름만).
   4) 내용을 비워 두면 data.js 의 원래 항목(summary·body·problem·solution…)을 쓴다.
   5) 목록에 없는 이름은 `글` 양식으로 그리고 그 이름을 제목으로 쓴다 (@@기획 의도 → 제목이 "기획 의도").
   6) md 칸이 비어 있으면 DEFAULT_MD 순서(= 지금까지 쓰던 기본 구성)로 그린다.

   양식을 새로 만들려면 BLOCKS 에 한 줄 더하면 된다. */

/* 양식 칸으로 인정하는 키. 여기 없는 `낱말:` 줄은 그냥 본문이다.
   칸은 둘로 나뉜다.
   - BLOCK_KEY : 양식 전체를 설정하는 칸. 블록 안 어디에 적어도 되고 본문에서는 빠진다.
   - FLOW_KEY  : 본문에서 **적은 자리에 그대로 그려지는** 칸(인용 상자, 전·후 이미지). */
var BLOCK_KEY=/^[ \t]*(그림|사진|제목|아이콘|이름|설명|구역|포지션|역량|작업[ \t]*기간|기간|장르)[ \t]*:[ \t]*(.*)$/,
    FLOW_KEY=/^[ \t]*(전|후|인용)[ \t]*:[ \t]*(.*)$/,
    RE_CALL=/^[ \t]*@@[ \t]*(.*?)[ \t]*$/,
    RE_RULE=/^[ \t]*-{3,}[ \t]*$/;

function parseBlocks(md){
  var lines=String(md||'').replace(/\r\n?/g,'\n').split('\n'),out=[],cur=null,i;
  for(i=0;i<lines.length;i++){
    var call=RE_CALL.exec(lines[i]);
    /* `@@` 만 있는 줄은 "여기서 끝" 표시로 보고 넘긴다 */
    if(call){
      if(call[1]==='')cur=null;
      else out.push(cur={name:call[1],fields:{},lines:[]});
      continue;
    }
    if(cur)cur.lines.push(lines[i]);
  }
  for(i=0;i<out.length;i++){
    var b=out[i],ls=b.lines,rest=[],k=0,f;
    /* 이름 아래 빈 줄과 --- 구분선은 넘긴다 */
    while(k<ls.length&&(ls[k].trim()===''||RE_RULE.test(ls[k])))k++;
    for(;k<ls.length;k++){
      f=BLOCK_KEY.exec(ls[k]);
      if(f)b.fields[f[1].replace(/[ \t]+/g,'')]=f[2].trim();
      else rest.push(ls[k]);
    }
    b.body=rest.join('\n').replace(/^\n+|\n+$/g,'');
  }
  return out;
}

/* 마크다운 한 덩어리 / 한 줄 */
function mdHtml(t){
  t=String(t==null?'':t);
  if(!t.trim())return'';
  return window.renderMarkdown?window.renderMarkdown(t):'<p>'+e(t)+'</p>';
}
/* 제목 한 줄 — **굵게** 부분만 하늘색 <b> 로 바꾼다 */
function mdLine(t){
  return e(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
}
/* 인용 상자 — 어느 양식에서든 `인용:` 한 줄을 적으면 그 자리에 들어간다 */
function quoteBox(t){
  return t?'<blockquote class="pj-quote in-block">'+icon('quote')
    +'<span>'+mdLine(t)+'</span></blockquote>':'';
}
/* 전 → 후 이미지 칸. 둘 다 없으면 아무것도 넣지 않고,
   하나만 있으면 그 한 칸만 넓게 넣는다 */
function baRow(before,after){
  function box(src,alt){
    return'<div class="pj-ba-box"><img src="'+e(src)+'" alt="'+e(alt)+'" loading="lazy"></div>';
  }
  if(before&&after)return'<div class="pj-ba">'+box(before,'해결 전')
    +'<span class="pj-arrow" aria-hidden="true"></span>'+box(after,'해결 후')+'</div>';
  if(before||after)return'<div class="pj-ba one">'
    +box(before||after,before?'해결 전':'해결 후')+'</div>';
  return'';
}
/* 본문 — 마크다운에 더해 `인용:` `전:` `후:` 줄을 적은 자리에 그린다 */
function bodyHtml(t){
  var lines=String(t==null?'':t).replace(/\r\n?/g,'\n').split('\n'),
      out='',buf=[],ba=null,i,f;
  function text(){var v=buf.join('\n');buf=[];if(v.trim())out+=mdHtml(v)}
  function row(){if(ba){out+=baRow(ba[0],ba[1]);ba=null}}
  for(i=0;i<lines.length;i++){
    f=FLOW_KEY.exec(lines[i]);
    if(f){
      text();
      if(f[1]==='인용'){row();out+=quoteBox(f[2].trim());continue}
      if(!ba)ba=['',''];
      if(f[1]==='전'){if(ba[0]){row();ba=['','']}ba[0]=f[2].trim()}
      else ba[1]=f[2].trim();
      continue;
    }
    /* 전: 과 후: 사이의 빈 줄은 한 벌로 묶어 준다 */
    if(ba&&lines[i].trim()==='')continue;
    row();
    buf.push(lines[i]);
  }
  text();row();
  return out;
}
/* 그림 칸: 주소가 있으면 그림, 없으면 안내 자리 */
function fill(src,alt,empty){
  return src?'<img src="'+e(src)+'" alt="'+e(alt||'')+'" loading="lazy">'
            :'<span class="pj-empty">'+icon('image')+e(empty||'이미지 추가 영역')+'</span>';
}

/* 부르는 이름 → 양식. 같은 양식을 여러 이름으로 부를 수 있다. */
var BLOCK_ALIAS={
  '소개':'소개','개요':'소개','대표':'소개','포지션':'소개',
  '인용':'인용','한마디':'인용',
  '문제':'문제','발생한문제':'문제','문제점':'문제',
  '해결':'해결','해결과정':'해결','해결방법':'해결',
  '기획서':'기획서','상세기획서':'기획서','문서':'기획서',
  '글':'글','본문':'글',
  '이미지':'이미지','그림':'이미지','사진':'이미지',
  '표':'표','엑셀':'표'
};

/* cls = 구역 클래스, tone = 기본 밝기(light/dark), make = 안쪽 내용 */
var BLOCKS={
  /* 소개 — 대표 이미지 + (참여 포지션·획득 역량) + 한 줄 설명 + 본문 */
  '소개':{cls:'pj-band',tone:'light',make:function(c,b){
    /* 쉼표·가운뎃점으로 나눠 적는 칸(장르·역량) */
    function many(v){return String(v||'').split(/[,·]/)
      .map(function(t){return t.trim()}).filter(Boolean)}
    var gains=many(b.fields['역량']||c.p.gains),
        genre=many(b.fields['장르']||c.p.genre),
        /* 한 줄: 값이 없으면 흐린 안내 글자만 둔다 */
        row=function(label,html){return'<dt>'+label+'</dt><dd>'+html+'</dd>'},
        hint=function(t){return'<i class="pj-hint">'+e(t)+'</i>'};
    return'<div class="pj-row">'
      +'<figure class="pj-shot">'
        +fill(b.fields['그림']||c.p.image||(c.slides[0]||{}).src,c.p.title,'대표 이미지 추가 영역')+'</figure>'
      +'<div class="pj-copy">'
        +'<dl class="pj-meta">'
          +row('작업 기간',e(b.fields['작업기간']||b.fields['기간']||c.p.period||'')
                           ||hint('작업 기간 입력'))
          +row('장르',genre.length?genre.join(' · '):hint('장르 입력'))
          +(function(v){ /* 숫자면 큰 글씨, "부팀장, PM" 같은 글자면 보통 크기 */
              return row('참여 포지션','<b class="pj-position'+(/^\d+$/.test(v)?' num':'')+'">'
                +e(v)+'</b>')}(b.fields['포지션']||c.p.position||'00'))
          +row('획득 역량',gains.length
            ?'<span class="pj-gain">'+gains.map(function(t){return'<em>'+e(t)+'</em>'}).join('')+'</span>'
            :hint('획득 역량 입력'))
        +'</dl>'
        +'<h2>'+mdLine(b.fields['제목']||c.p.summary||'한 줄 설명 입력')+'</h2>'
        /* 본문이 없으면 칸 자체를 넣지 않는다 */
        +(function(t){return t?'<div class="md-body">'+bodyHtml(t)+'</div>':''}(b.body||c.p.body))
      +'</div>'
    +'</div>';
  }},

  '인용':{cls:'pj-quote-sec',tone:'light',make:function(c,b){
    return'<blockquote class="pj-quote">'+icon('quote')
      +'<span>'+mdLine(b.body||c.p.quote||'인용 한마디 입력')+'</span></blockquote>';
  }},

  '문제':{cls:'pj-problem',tone:'dark',make:function(c,b){
    return'<h2 class="sec-title" data-ico="'+e(b.fields['아이콘']||'alert')+'">'
        +mdLine(b.fields['제목']||'**발생한** 문제')+'</h2>'
      +'<div class="md-body pj-issue">'+bodyHtml(b.body||c.p.problem||'발생한 문제 입력')+'</div>';
  }},

  '해결':{cls:'pj-solve',tone:'dark',make:function(c,b){
    var s=c.p.solution||{},
        body=b.body||s.note||'해결 과정 설명 입력',
        /* 본문에 전·후를 적었으면 그 자리에 그리고, 안 적었을 때만
           data.js 의 solution 값을 맨 위에 넣는다 */
        ba=/^[ \t]*(전|후)[ \t]*:/m.test(body)?'':baRow(s.before,s.after);
    return'<h2 class="pj-solve-title" data-ico="'+e(b.fields['아이콘']||'swap')+'">'
        +mdLine(b.fields['제목']||'**해결** 과정')+'</h2>'
      +ba
      +'<div class="md-body pj-note'+(ba?'':' no-line')+'">'+bodyHtml(body)+'</div>';
  }},

  '기획서':{cls:'pj-extra',tone:'light',make:function(c,b){
    return'<div class="docs">'
      +'<h2 data-ico="'+e(b.fields['아이콘']||'clip')+'">'+mdLine(b.fields['제목']||'**상세** 기획서')+'</h2>'
      +(c.docs.length
        ?'<div class="doc-tabs" role="tablist">'+c.docs.map(function(x,i){
            return'<button type="button" class="doc-tab'+(i?'':' on')+'" data-doc="'+i+'">'
              +e(x.title||('기획서 '+(i+1)))+'</button>'}).join('')+'</div><div id="doc-view"></div>'
        :'<div class="media-empty">'+icon('clip')+'상세 기획서 추가 영역</div>')
      +'</div>'
      +(b.body?'<div class="md-body">'+bodyHtml(b.body)+'</div>':'');
  }},

  /* 자유 서술 — 제목(없으면 생략) + 마크다운 본문 */
  '글':{cls:'pj-free',tone:'light',make:function(c,b){
    var t=b.fields['제목']||'';
    return(t?'<h2 class="sec-title" data-ico="'+e(b.fields['아이콘']||'doc')+'">'+mdLine(t)+'</h2>':'')
      +'<div class="md-body">'+bodyHtml(b.body)+'</div>';
  }},

  '이미지':{cls:'pj-free',tone:'light',make:function(c,b){
    var cap=b.fields['설명']||b.body;
    return(b.fields['제목']?'<h2 class="sec-title" data-ico="'+e(b.fields['아이콘']||'image')+'">'
          +mdLine(b.fields['제목'])+'</h2>':'')
      +'<figure class="pj-figure">'+fill(b.fields['그림']||b.fields['사진'],b.fields['제목'],'이미지 추가 영역')
      +(cap?'<figcaption class="md-body">'+mdHtml(cap)+'</figcaption>':'')+'</figure>';
  }},

  /* 엑셀 표 — assets/sheets.js 의 이름을 적는다 */
  '표':{cls:'pj-free',tone:'light',make:function(c,b){
    var t=sheetTable(b.fields['이름']||String(b.body||'').trim());
    return(b.fields['제목']?'<h2 class="sec-title" data-ico="'+e(b.fields['아이콘']||'grid')+'">'
          +mdLine(b.fields['제목'])+'</h2>':'')
      +(t||'<div class="media-empty">'+icon('grid')
        +'표를 찾을 수 없습니다 — assets/sheets.js 의 이름을 확인해 주세요</div>');
  }}
};

/* md 칸이 비어 있을 때 쓰는 기본 구성 */
var DEFAULT_MD='@@소개\n@@인용\n@@문제\n@@해결\n@@기획서\n';

function renderBlocks(md,c){
  var blocks=parseBlocks(md);
  if(!blocks.length)blocks=parseBlocks(DEFAULT_MD);
  var html='',prev='';
  for(var i=0;i<blocks.length;i++){
    var b=blocks[i],key=BLOCK_ALIAS[String(b.name).replace(/\s+/g,'')];
    /* 모르는 이름은 글 양식 + 그 이름을 제목으로 */
    if(!key){key='글';if(!b.fields['제목'])b.fields['제목']=b.name}
    var spec=BLOCKS[key],
        set=b.fields['구역'],
        tone=set?(/어둡|검|dark/i.test(set)?'dark':'light'):spec.tone,
        /* 같은 밝기가 이어지면 위 패딩을 뺀다(구역이 두 번 겹쳐 보이지 않게) */
        tight=prev===tone?' is-tight':'';
    html+='<section class="'+spec.cls+(tone==='light'?' on-light':'')+tight+'">'
      +'<div class="wrap">'+spec.make(c,b)+'</div></section>';
    prev=tone;
  }
  /* 맨 아래 "메인으로" — 마지막 구역의 밝기를 그대로 이어 간다 */
  return html+'<section class="pj-foot'+(prev==='light'?' on-light':'')+'"><div class="wrap">'
    +'<a class="back" href="index.html" data-ico="back">메인으로</a></div></section>';
}

/* ================= 프로젝트 상세 =================
   맨 위 16:9 화면(영상 재생)만 고정이고, 그 아래는 data.js 의 md 칸이 부르는
   양식 순서대로 그린다(위 "양식 호출" 참고). md 칸이 비어 있으면 기본 구성대로 나온다.
   오른쪽 위 작은 사각형들은 "다른 프로젝트" 썸네일이고, 누르면 내용이 통째로 바뀐다. */
(function(){
  var root=q('project');if(!root)return;
  var list=projects();
  if(!list.length){root.innerHTML='<div class="wrap page"><p class="rs-empty">프로젝트를 추가해 주세요</p></div>';return}

  function coverOf(p){return p.image||((p.images||[])[0]||{}).src||''}

  function render(p){
    var slides=(p.images||[]).filter(function(x){return x&&x.src}),
        tags=String(p.genre||'').split(/[,·]/).map(function(t){return t.trim()}).filter(Boolean),
        docs=(p.documents||[]).filter(function(x){return x&&x.src}),
        hero=coverOf(p),
        others=list.filter(function(x){return x.id!==p.id});

    /* 맨 위 16:9 칸: 영상이 있으면 영상을 틀고, 없으면 대표 이미지.
       유튜브 UI(제목·로고·추천 영상·컨트롤)는 전부 끄고 화면만 남긴다.
       소리는 우리가 만든 작은 버튼으로 켠다. */
    var clip=(p.shortVideos||[])[0],ytid=clip?youtubeId(clip.src):'',stageMedia,
        soundBtn='<button type="button" class="pj-sound" data-on="0" aria-label="소리 켜기">'
          +'<span class="pj-sound-off">'+icon('mute')+'소리 켜기</span>'
          +'<span class="pj-sound-on">'+icon('sound')+'소리 끄기</span></button>';
    if(ytid){
      /* 영상이 뜨기 전·막혔을 때를 대비해 미리보기 그림을 아래에 깔아 둔다. */
      stageMedia='<img class="pj-poster" src="https://img.youtube.com/vi/'+e(ytid)+'/maxresdefault.jpg" alt="" '
        +'onerror="if(this.dataset.fb){this.style.display=\'none\'}else{this.dataset.fb=1;'
        +'this.src=\'https://img.youtube.com/vi/'+e(ytid)+'/hqdefault.jpg\'}">'
        +'<iframe class="pj-player" src="https://www.youtube.com/embed/'+e(ytid)
        +'?autoplay=1&mute=1&loop=1&playlist='+e(ytid)
        +'&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0'
        +'&playsinline=1&enablejsapi=1"'
        +' title="'+e(p.title)+'" allow="autoplay; encrypted-media"'
        +' referrerpolicy="strict-origin-when-cross-origin" frameborder="0"'
        +' tabindex="-1" aria-hidden="true"></iframe>'+soundBtn;
    }else if(clip&&clip.src){
      stageMedia=(hero?'<img class="pj-poster" src="'+e(hero)+'" alt="">':'')
        +'<video class="pj-player" src="'+e(clip.src)+'" autoplay muted loop playsinline'
        +(hero?' poster="'+e(hero)+'"':'')+'></video>'+soundBtn;
    }else{
      stageMedia=fill(hero,p.title,'프로젝트 이미지 추가 영역');
    }

    root.innerHTML=
      /* 1) 16:9 화면 — 영상 재생. 여기는 늘 맨 위에 고정이다 */
      '<section class="pj-hero">'
        +'<div class="pj-slide">'+stageMedia+'</div>'
        +'<div class="pj-head"><h1>'+e(p.title)+'</h1>'
          +'<p class="pj-tags">'+(tags.length?tags.map(function(t){return'#'+e(t)}).join('  '):'#장르 입력')+'</p></div>'
        +'<div class="pj-thumbs-wrap">'
          +'<button type="button" class="pj-thumbs-arrow" data-scroll="-1" aria-label="이전 프로젝트들">‹</button>'
          +'<div class="pj-thumbs" id="pj-thumbs">'+others.map(function(x){
              var c=coverOf(x);
              return'<button type="button" class="pj-thumb" data-go="'+e(x.id)+'" title="'+e(x.title)+'">'
                +(c?'<img src="'+e(c)+'" alt="'+e(x.title)+'" loading="lazy">'
                   :'<span class="pj-thumb-empty">'+e(x.title)+'</span>')+'</button>'}).join('')
          +'</div>'
          +'<button type="button" class="pj-thumbs-arrow" data-scroll="1" aria-label="다음 프로젝트들">›</button>'
        +'</div>'
      +'</section>'

      /* 2) 그 아래는 전부 양식 호출 — 순서·구성은 data.js 의 md 칸이 정한다 */
      +renderBlocks(p.md,{p:p,slides:slides,docs:docs});

    paintIcons(root);

    /* 썸네일 줄을 좌우 화살표로 밀어서 본다 */
    var rail=q('pj-thumbs'),rowArrows=root.querySelectorAll('.pj-thumbs-arrow');
    for(var a=0;a<rowArrows.length;a++){
      rowArrows[a].addEventListener('click',function(ev){
        if(!rail)return;
        var dir=parseInt(ev.currentTarget.getAttribute('data-scroll'),10)||1,
            one=rail.querySelector('.pj-thumb');
        rail.scrollBy({left:dir*((one?one.offsetWidth:120)+16)*2,behavior:'smooth'});
      });
    }

    /* 오른쪽 위 썸네일 → 그 프로젝트로 내용 교체 */
    var thumbs=root.querySelectorAll('.pj-thumb');
    for(var i=0;i<thumbs.length;i++){
      thumbs[i].addEventListener('click',function(ev){
        var id=ev.currentTarget.getAttribute('data-go'),
            next=list.find(function(x){return x.id===id});
        if(!next)return;
        if(history.replaceState)history.replaceState(null,'','project.html?id='+encodeURIComponent(id));
        render(next);
        window.scrollTo({top:0,behavior:'smooth'});
      });
    }

    /* 16:9 화면의 소리 켜기/끄기. 유튜브는 postMessage 로, 영상 파일은 muted 로 바꾼다. */
    var sound=root.querySelector('.pj-sound');
    if(sound){
      sound.addEventListener('click',function(){
        var on=sound.getAttribute('data-on')==='1',   /* 지금 소리가 켜져 있나 */
            vid=root.querySelector('video.pj-player'),
            fr=root.querySelector('iframe.pj-player');
        if(vid)vid.muted=on;
        if(fr&&fr.contentWindow)fr.contentWindow.postMessage(
          JSON.stringify({event:'command',func:on?'mute':'unMute',args:[]}),'*');
        sound.setAttribute('data-on',on?'0':'1');
        sound.setAttribute('aria-label',on?'소리 켜기':'소리 끄기');
      });
    }

    /* 기획서 뷰어 */
    var docView=q('doc-view');
    if(docView&&docs.length){
      var tabs=root.querySelectorAll('.doc-tab');
      var showDoc=function(n){
        var x=docs[n];if(!x)return;
        var src=String(x.src||''),ext=src.split('?')[0].split('.').pop().toLowerCase(),
            hasSheet=!!(x.sheet&&(window.PORTFOLIO_SHEETS||{})[x.sheet]),
            isImage=['png','jpg','jpeg','gif','webp','svg','bmp','avif'].indexOf(ext)>=0,
            stage,cls='';
        if(hasSheet){stage=sheetTable(x.sheet)}
        else if(isImage){stage='<img src="'+e(src)+'" alt="'+e(x.title||'기획서 이미지')+'">'}
        else if(ext==='pdf'){stage='<iframe src="'+e(src)+'" title="'+e(x.title||'기획서')+'" loading="lazy"></iframe>'}
        else{cls=' is-note';stage='<p class="doc-note">브라우저에서 바로 볼 수 없는 형식입니다. 아래에서 내려받아 확인해 주세요.</p>'}
        docView.innerHTML='<div class="doc-stage'+cls+'">'+stage+'</div>'
          +'<div class="doc-actions">'
          +(hasSheet?'':'<a class="btn ghost" href="'+e(src)+'" target="_blank" rel="noopener" data-ico="doc">새 창으로 보기</a>')
          +'<a class="btn" href="'+e(src)+'" download data-ico="down">'
          +(hasSheet?'엑셀 파일 다운로드':'다운로드')+'</a></div>';
        paintIcons(docView);
        for(var t=0;t<tabs.length;t++){tabs[t].classList.toggle('on',t===n)}
      };
      for(var t=0;t<tabs.length;t++){
        tabs[t].addEventListener('click',function(ev){
          showDoc(parseInt(ev.currentTarget.getAttribute('data-doc'),10)||0)});
      }
      showDoc(0);
    }
  }

  var id=new URLSearchParams(location.search).get('id');
  render(list.find(function(x){return x.id===id})||list[0]);
})();

/* ================= 이력서 ================= */
(function(){
  var skills=q('rs-skills');
  if(skills){
    skills.innerHTML=(d.skills||[]).map(function(x){
      var filled=Math.max(0,Math.min(5,Math.round((+x.level||0)/20))),dots='';
      for(var i=0;i<5;i++){dots+='<i'+(i<filled?' class="on"':'')+'></i>'}
      return'<div class="skill-item"><img src="'+e(x.image)+'" alt="">'
        +'<div><b>'+e(x.name)+'</b><span class="dots">'+dots+'</span></div></div>';
    }).join('')||'<p class="rs-empty">보유 기술을 입력해 주세요</p>';
  }

  /* 프로젝트 목록 — 좌우로 끌어서 넘긴다 */
  var rail=q('rs-projects');
  if(rail){
    var ps=(d.resumeProjects||[]);
    rail.innerHTML=ps.map(function(x){
      return'<article><time>'+e(x.year||'연도 입력')+'</time><h3>'+e(x.title||'프로젝트명 입력')+'</h3>'
        +'<b>'+e(x.role||'역할 입력')+'</b><p>'+e(x.detail||'설명 입력')+'</p></article>'}).join('')
      ||'<p class="rs-empty">프로젝트를 입력해 주세요</p>';
    var dragging=false,startX=0,startScroll=0;
    rail.addEventListener('pointerdown',function(ev){
      dragging=true;startX=ev.clientX;startScroll=rail.scrollLeft;
      rail.setPointerCapture(ev.pointerId);rail.classList.add('dragging')});
    rail.addEventListener('pointermove',function(ev){
      if(dragging)rail.scrollLeft=startScroll-(ev.clientX-startX)});
    var stop=function(){dragging=false;rail.classList.remove('dragging')};
    rail.addEventListener('pointerup',stop);
    rail.addEventListener('pointercancel',stop);
  }

  var careers=q('rs-careers');
  if(careers){
    var cs=(d.resumeCareers||[]).filter(function(x){return x.period||x.company||x.role||x.detail});
    careers.innerHTML=cs.length?cs.map(function(x){
        return'<li><time>'+e(x.period)+'</time><strong>'+e(x.company)+'</strong>'
          +'<p>'+e(x.role)+(x.role&&x.detail?' · ':'')+e(x.detail)+'</p></li>'}).join('')
      :'<li class="rs-empty">경력 입력</li>';
  }

  var personal=q('rs-personal');
  if(personal){
    var rows=(d.resumePersonalInfo||[]).filter(function(x){return x.year||x.history});
    personal.innerHTML=rows.length
      ?'<div class="personal-list">'+rows.map(function(x){
          return'<div><time>'+e(x.year)+'</time><strong>'+e(x.history)+'</strong></div>'}).join('')+'</div>'
      :'<p class="rs-empty">인적사항 입력</p>';
  }
})();

/* ================= 자기소개서 ================= */
(function(){
  var body=q('cover-letter-body');if(!body)return;
  body.innerHTML=window.renderMarkdown
    ?window.renderMarkdown(d.coverLetter||'')
    :'<p>'+e(d.coverLetter||'')+'</p>';
})();


/* 메인 무대: 피그마 1905 캔버스를 칸 너비에 맞춰 통째로 축소한다 */
(function(){
  var frame=document.querySelector('.frame'),stage=q('stage-fx');
  if(!frame||!stage)return;
  function fit(){
    if(window.matchMedia('(max-width:900px)').matches){
      frame.style.removeProperty('--k');return;
    }
    frame.style.setProperty('--k',(frame.clientWidth/1905).toFixed(5));
  }
  fit();
  window.addEventListener('resize',fit);
  window.addEventListener('orientationchange',fit);
})();

/* 모든 페이지 공통: 아이콘 채우기 */
paintIcons();

})();
