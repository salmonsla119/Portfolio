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
        media=clip?videoEmbed({src:clip.src,title:p.title,ratio:clip.ratio||'16/9'})
              :(p.image?'<img class="screen-img" src="'+e(p.image)+'" alt="'+e(p.title)+'">'
                       :'<div class="screen-empty">영상이나 대표 이미지를 넣어 주세요</div>');
    stage.innerHTML='<div class="screen-media">'+media+'</div>'
      +'<a class="screen-go" href="project.html?id='+encodeURIComponent(p.id)+'">'
        +'<b>'+e(p.title)+'</b><span>프로젝트 보기 →</span></a>';
    if(count)count.textContent=(at+1)+' / '+list.length;
    wireVideos(stage);
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
   순서: 16:9 슬라이드 → 소개(이미지 + 참여 포지션 + 본문) → 인용
         → 해결 과정(전 → 후) → 숏폼 영상 → 상세 기획서 */
(function(){
  var root=q('project');if(!root)return;
  var id=new URLSearchParams(location.search).get('id'),
      p=projects().find(function(x){return x.id===id})||projects()[0];
  if(!p){root.innerHTML='<p class="rs-empty">프로젝트를 추가해 주세요</p>';return}

  var slides=(p.images||[]).filter(function(x){return x&&x.src}),
      tags=String(p.genre||'').split(/[,·]/).map(function(t){return t.trim()}).filter(Boolean),
      solve=p.solution||{},
      clips=(p.shortVideos||[]).map(videoEmbed).join(''),
      docs=(p.documents||[]).filter(function(x){return x&&x.src});

  function box(src,alt,empty){
    return src?'<img src="'+e(src)+'" alt="'+e(alt||'')+'" loading="lazy">'
              :'<div class="screen-empty">'+e(empty)+'</div>';
  }

  root.innerHTML=
    /* 1) 16:9 슬라이드 */
    '<section class="slides'+(slides.length?'':' is-empty')+'">'
      +'<div class="slides-view" id="slide-view"></div>'
      +'<div class="slides-head"><h1>'+e(p.title)+'</h1>'
        +'<p class="tags">'+(tags.length?tags.map(function(t){return'#'+e(t)}).join(' '):'#장르 입력')+'</p></div>'
      +'<div class="slides-thumbs" id="slide-thumbs"></div>'
      +'<p class="slides-meta">Slide 16:9 · '+(slides.length||0)+'</p>'
    +'</section>'

    /* 2) 소개 */
    +'<section class="brief">'
      +'<figure class="brief-shot">'+box(p.image||(slides[0]||{}).src,p.title,'대표 이미지 추가 영역')+'</figure>'
      +'<div class="brief-copy">'
        +'<p class="position">참여 포지션<b>'+e(p.position||'00')+'</b></p>'
        +'<h2>'+e(p.summary||'한 줄 설명 입력')+'</h2>'
        +'<p>'+e(p.body||'상세 설명 입력')+'</p>'
      +'</div>'
    +'</section>'
    +'<p class="quote">'+(p.quote?'“'+e(p.quote)+'”':'')+'</p>'

    /* 3) 해결 과정 */
    +'<section class="solve"><h2>해결 과정</h2>'
      +'<div class="ba">'
        +'<div class="ba-box">'+box(solve.before,'해결 전','전 이미지 추가 영역')+'</div>'
        +'<span class="ba-arrow" aria-hidden="true">→</span>'
        +'<div class="ba-box">'+box(solve.after,'해결 후','후 이미지 추가 영역')+'</div>'
      +'</div>'
      +'<p class="ba-note">'+e(solve.note||'해결 과정 설명 입력')+'</p>'
    +'</section>'

    /* 4) 숏폼 영상 */
    +'<section class="clips"><h2>숏폼 영상</h2>'
      +'<div class="clip-grid">'+(clips||'<div class="media-empty">숏폼 영상 추가 영역</div>')+'</div></section>'

    /* 5) 상세 기획서 */
    +'<section class="docs"><h2>상세 기획서</h2>'
      +(docs.length
        ?'<div class="doc-tabs" role="tablist">'+docs.map(function(x,i){
            return'<button type="button" class="doc-tab'+(i?'':' on')+'" data-doc="'+i+'">'
              +e(x.title||('기획서 '+(i+1)))+'</button>'}).join('')+'</div><div id="doc-view"></div>'
        :'<div class="media-empty">상세 기획서 추가 영역</div>')
    +'</section>';

  /* 슬라이드: 오른쪽 위 작은 그림을 누르면 큰 화면이 바뀐다 */
  var view=q('slide-view'),thumbs=q('slide-thumbs');
  if(view){
    if(!slides.length){view.innerHTML='<div class="screen-empty">프로젝트 이미지 추가 영역</div>'}
    else{
      thumbs.innerHTML=slides.map(function(x,i){
        return'<button type="button" class="slide-thumb'+(i?'':' on')+'" data-slide="'+i+'" aria-label="'+(i+1)+'번 이미지">'
          +'<img src="'+e(x.src)+'" alt="" loading="lazy"></button>'}).join('');
      var showSlide=function(n){
        var x=slides[n];if(!x)return;
        view.innerHTML='<img src="'+e(x.src)+'" alt="'+e(x.alt||p.title)+'">';
        var ts=thumbs.querySelectorAll('.slide-thumb');
        for(var i=0;i<ts.length;i++){ts[i].classList.toggle('on',i===n)}
      };
      var ts=thumbs.querySelectorAll('.slide-thumb');
      for(var i=0;i<ts.length;i++){
        ts[i].addEventListener('click',function(ev){
          showSlide(parseInt(ev.currentTarget.getAttribute('data-slide'),10)||0)});
      }
      showSlide(0);
    }
  }

  wireVideos(root);

  /* 기획서 뷰어: 엑셀 표, 이미지, PDF 를 구분해 보여 준다 */
  var docView=q('doc-view');
  if(docView&&docs.length){
    var tabs=root.querySelectorAll('.doc-tab');
    var showDoc=function(n){
      var x=docs[n];if(!x)return;
      var src=String(x.src||''),ext=src.split('?')[0].split('.').pop().toLowerCase(),
          hasSheet=!!(x.sheet&&(window.PORTFOLIO_SHEETS||{})[x.sheet]),
          isImage=['png','jpg','jpeg','gif','webp','svg','bmp','avif'].indexOf(ext)>=0,
          stage,cls;
      if(hasSheet){cls='';stage=sheetTable(x.sheet)}
      else if(isImage){cls='';stage='<img src="'+e(src)+'" alt="'+e(x.title||'기획서 이미지')+'">'}
      else if(ext==='pdf'){cls='';stage='<iframe src="'+e(src)+'" title="'+e(x.title||'기획서')+'" loading="lazy"></iframe>'}
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

  var personal=q('rs-personal');
  if(personal){
    var rows=(d.resumePersonalInfo||[]).filter(function(x){return x.year||x.history});
    personal.innerHTML=rows.length
      ?'<ul class="rs-list">'+rows.map(function(x){
          return'<li><time>'+e(x.year)+'</time><strong>'+e(x.history)+'</strong></li>'}).join('')+'</ul>'
      :'<p class="rs-empty">인적사항 입력</p>';
  }

  var careers=q('rs-careers');
  if(careers){
    var cs=(d.resumeCareers||[]).filter(function(x){return x.period||x.company||x.role||x.detail});
    careers.innerHTML=cs.length?cs.map(function(x){
        return'<li><time>'+e(x.period)+'</time><strong>'+e(x.company)+'</strong>'
          +'<p>'+e(x.role)+(x.role&&x.detail?' · ':'')+e(x.detail)+'</p></li>'}).join('')
      :'<li class="rs-empty">경력 입력</li>';
  }

  var rprojects=q('rs-projects');
  if(rprojects){
    var ps=(d.resumeProjects||[]).filter(function(x){return x.year||x.title||x.role||x.detail});
    rprojects.innerHTML=ps.length?ps.map(function(x){
        return'<li><time>'+e(x.year)+'</time><strong>'+e(x.title)+'</strong>'
          +'<p>'+e(x.role)+(x.role&&x.detail?' · ':'')+e(x.detail)+'</p></li>'}).join('')
      :'<li class="rs-empty">프로젝트 입력</li>';
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
