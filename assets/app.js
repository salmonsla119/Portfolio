/* 데이터(assets/data.js)를 읽어 각 페이지를 그리는 스크립트.
   빌드 과정 없이 file:// 에서도 그대로 돌아갑니다. */
(function(){
'use strict';
var d=window.PORTFOLIO_DATA||{};

function e(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){
  return{'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
function q(id){return document.getElementById(id)}
function projects(){return d.projects||[]}

/* ===== 영상 한 칸 =====
   유튜브 주소면 미리보기 그림을 먼저 놓고, 재생 버튼을 누르면 그 자리에서 플레이어로 바뀝니다.
   세로(9:16)로 볼지 가로(16:9)로 볼지는 data.js 의 ratio 로 정합니다. */
function videoEmbed(x){
  var src=String(x&&x.src||''),
      yt=src.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/),
      tall=x&&x.ratio?String(x.ratio).replace(':','/')==='9/16':(yt?/\/shorts\//.test(src):true),
      cls='video-item'+(tall?' tall':' wide');
  if(yt){
    var id=yt[1],t=src.match(/[?&]t=(\d+)/),start=t?t[1]:'0',
        watch='https://www.youtube.com/watch?v='+id+(t?'&t='+t[1]+'s':''),
        thumb='https://img.youtube.com/vi/'+id+'/';
    return'<div class="'+cls+'">'
      +'<div class="yt-facade" data-yt="'+e(id)+'" data-start="'+e(start)+'">'
        +'<button type="button" class="yt-poster" aria-label="'+e(x.title||'영상')+' 재생">'
          +'<img src="'+e(thumb)+'maxresdefault.jpg" alt="" '
          +'onerror="if(this.dataset.fb){this.style.display=\'none\'}else{this.dataset.fb=1;this.src=\''+e(thumb)+'hqdefault.jpg\'}">'
          +'<span class="yt-play" aria-hidden="true"></span>'
        +'</button>'
      +'</div>'
      /* file:// 로 열면 유튜브가 재생을 막는 경우가 있어(오류 153) 탈출구를 남겨 둔다. */
      +(location.protocol==='file:'?'<a class="yt-fallback" href="'+e(watch)+'" target="_blank" rel="noopener">재생되지 않으면 유튜브에서 보기 →</a>':'')
      +'</div>';
  }
  return'<div class="'+cls+'"><video controls playsinline preload="metadata" src="'+e(src)+'"></video></div>';
}

/* 유튜브 주소에서 영상 아이디만 뽑는다 (메인 무대용). */
function youtubeId(src){
  var yt=String(src||'').match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return yt?yt[1]:'';
}

/* 미리보기 그림을 누르면 그 자리에서 유튜브 플레이어로 바꿔 넣는다. */
function wireVideos(root){
  var boxes=root.querySelectorAll('.yt-facade');
  for(var i=0;i<boxes.length;i++){
    boxes[i].addEventListener('click',function(ev){
      var box=ev.currentTarget,id=String(box.getAttribute('data-yt')||''),
          start=parseInt(box.getAttribute('data-start'),10)||0;
      if(!/^[A-Za-z0-9_-]{6,}$/.test(id)||box.querySelector('iframe'))return;
      box.innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0'+(start?'&start='+start:'')
        +'" title="프로젝트 영상" referrerpolicy="strict-origin-when-cross-origin" '
        +'allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  }
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

/* ================= 메인: 히어로 무대 =================
   큰 네모 하나에 프로젝트를 한 개씩. 영상이 있으면 영상, 없으면 대표 이미지.
   좌우 화살표로 넘기고, 아래 띠를 누르면 상세로 간다. */
(function(){
  var stage=q('stage');if(!stage)return;
  var list=projects(),at=0,count=q('stage-count');
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
  }
  var arrows=document.querySelectorAll('.stage-arrow');
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

/* ================= 프로젝트 상세 =================
   16:9 화면(영상 재생) → 참여 포지션 → 어두운 띠(이미지 + 글 + 인용) → 해결 과정
   → 상세 기획서
   오른쪽 위 작은 사각형들은 "다른 프로젝트" 썸네일이고, 누르면 내용이 통째로 바뀐다. */
(function(){
  var root=q('project');if(!root)return;
  var list=projects();
  if(!list.length){root.innerHTML='<div class="wrap page"><p class="rs-empty">프로젝트를 추가해 주세요</p></div>';return}

  function coverOf(p){return p.image||((p.images||[])[0]||{}).src||''}

  function render(p){
    var slides=(p.images||[]).filter(function(x){return x&&x.src}),
        tags=String(p.genre||'').split(/[,·]/).map(function(t){return t.trim()}).filter(Boolean),
        solve=p.solution||{},
        docs=(p.documents||[]).filter(function(x){return x&&x.src}),
        hero=coverOf(p),
        others=list.filter(function(x){return x.id!==p.id});

    function fill(src,alt,empty){
      return src?'<img src="'+e(src)+'" alt="'+e(alt||'')+'" loading="lazy">'
                :'<span class="pj-empty">'+e(empty)+'</span>';
    }

    /* 맨 위 16:9 칸: 영상이 있으면 영상을 틀고, 없으면 대표 이미지.
       유튜브 UI(제목·로고·추천 영상·컨트롤)는 전부 끄고 화면만 남긴다.
       소리는 우리가 만든 작은 버튼으로 켠다. */
    var clip=(p.shortVideos||[])[0],ytid=clip?youtubeId(clip.src):'',stageMedia,
        soundBtn='<button type="button" class="pj-sound" data-on="0" aria-label="소리 켜기">'
          +'<span class="pj-sound-off">소리 켜기</span>'
          +'<span class="pj-sound-on">소리 끄기</span></button>';
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
      /* 1) 16:9 화면 — 영상 재생 */
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

      /* 2) 참여 포지션 */
      +'<section class="pj-intro"><div class="wrap">'
        +'<p class="pj-position">참여 포지션: <b>'+e(p.position||'00')+'</b></p>'
      +'</div></section>'

      /* 3) 회색 띠 */
      +'<section class="pj-band"><div class="wrap">'
        +'<div class="pj-row">'
          +'<figure class="pj-shot">'+fill(p.image||(slides[0]||{}).src,p.title,'대표 이미지 추가 영역')+'</figure>'
          +'<div class="pj-copy"><h2>'+e(p.summary||'한 줄 설명 입력')+'</h2>'
            +'<p>'+e(p.body||'상세 설명 입력')+'</p></div>'
        +'</div>'
        +'<p class="pj-quote">'+(p.quote?'“ '+e(p.quote)+' ”':'“ 인용 한마디 입력 ”')+'</p>'
      +'</div></section>'

      /* 4) 해결 과정 */
      +'<section class="pj-solve"><div class="wrap">'
        +'<h2 class="pj-solve-title">해결 과정</h2>'
        +'<div class="pj-ba">'
          +'<div class="pj-ba-box">'+fill(solve.before,'해결 전','전 이미지 추가 영역')+'</div>'
          +'<span class="pj-arrow" aria-hidden="true">→</span>'
          +'<div class="pj-ba-box">'+fill(solve.after,'해결 후','후 이미지 추가 영역')+'</div>'
        +'</div>'
        +'<p class="pj-note">'+e(solve.note||'해결 과정 설명 입력')+'</p>'
      +'</div></section>'

      /* 5) 상세 기획서 */
      +'<section class="wrap pj-extra">'
        +'<div class="docs"><h2>상세 기획서</h2>'
          +(docs.length
            ?'<div class="doc-tabs" role="tablist">'+docs.map(function(x,i){
                return'<button type="button" class="doc-tab'+(i?'':' on')+'" data-doc="'+i+'">'
                  +e(x.title||('기획서 '+(i+1)))+'</button>'}).join('')+'</div><div id="doc-view"></div>'
            :'<div class="media-empty">상세 기획서 추가 영역</div>')
        +'</div>'
        +'<a class="back" href="index.html">← 메인으로</a>'
      +'</section>';

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

    wireVideos(root);

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
          +(hasSheet?'':'<a class="btn ghost" href="'+e(src)+'" target="_blank" rel="noopener">새 창으로 보기</a>')
          +'<a class="btn" href="'+e(src)+'" download>'+(hasSheet?'엑셀 파일 다운로드 ↓':'다운로드 ↓')+'</a></div>';
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

})();
