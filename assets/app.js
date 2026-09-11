(function(){'use strict';var d=window.PORTFOLIO_DATA||{};function e(v){return String(v).replace(/[&<>'"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}function q(id){return document.getElementById(id)}
var coverLetter=q('cover-letter-body');if(coverLetter)coverLetter.innerHTML=window.renderMarkdown?window.renderMarkdown(d.coverLetter||''):'<p>'+e(d.coverLetter||'')+'</p>';
var metrics=q('metrics');if(metrics)metrics.innerHTML='<p class="artifact-label">EXPERIENCE LOG</p>'+(d.metrics||[]).map(function(x){return'<div class="metric"><span class="metric-label">'+e(x.label)+'</span><span class="metric-value"><strong>'+e(x.value)+'</strong><small>'+e(x.unit)+'</small></span></div>'}).join('');
var specs=q('specialties');
/* 특기 사항 도트 아이콘. data.js의 icon 값으로 고릅니다. */
var specIcons={
  art:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="4" y="2" width="8" height="1"/><rect x="2" y="3" width="12" height="1"/><rect x="1" y="4" width="14" height="1"/><rect x="0" y="5" width="16" height="1"/><rect x="0" y="6" width="16" height="1"/><rect x="0" y="7" width="16" height="1"/><rect x="1" y="8" width="14" height="1"/><rect x="2" y="9" width="12" height="1"/><rect x="3" y="10" width="10" height="1"/><rect x="5" y="11" width="7" height="1"/><rect x="6" y="12" width="5" height="1"/></g><g class="px-sand"><rect x="4" y="3" width="8" height="1"/><rect x="2" y="4" width="12" height="1"/><rect x="1" y="5" width="14" height="1"/><rect x="1" y="6" width="14" height="1"/><rect x="1" y="7" width="14" height="1"/><rect x="2" y="8" width="12" height="1"/><rect x="3" y="9" width="10" height="1"/><rect x="5" y="10" width="7" height="1"/><rect x="6" y="11" width="5" height="1"/></g><g class="px-red"><rect x="3" y="4" width="2" height="1"/><rect x="3" y="5" width="2" height="1"/></g><g class="px-yellow"><rect x="7" y="3" width="2" height="1"/><rect x="7" y="4" width="2" height="1"/></g><g class="px-blue"><rect x="11" y="5" width="2" height="1"/><rect x="11" y="6" width="2" height="1"/></g><g class="px-green"><rect x="5" y="7" width="2" height="1"/><rect x="5" y="8" width="2" height="1"/></g><g class="px-cream"><rect x="9" y="8" width="2" height="1"/><rect x="9" y="9" width="2" height="1"/></g></svg>',
  grit:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="7" y="0" width="2" height="1"/><rect x="6" y="1" width="4" height="1"/><rect x="6" y="2" width="4" height="1"/><rect x="5" y="3" width="5" height="1"/><rect x="11" y="3" width="2" height="1"/><rect x="4" y="4" width="10" height="1"/><rect x="3" y="5" width="11" height="1"/><rect x="3" y="6" width="11" height="1"/><rect x="2" y="7" width="12" height="1"/><rect x="2" y="8" width="12" height="1"/><rect x="2" y="9" width="12" height="1"/><rect x="3" y="10" width="10" height="1"/><rect x="3" y="11" width="10" height="1"/><rect x="4" y="12" width="8" height="1"/><rect x="5" y="13" width="6" height="1"/><rect x="6" y="14" width="4" height="1"/></g><g class="px-orange"><rect x="7" y="1" width="2" height="1"/><rect x="7" y="2" width="2" height="1"/><rect x="6" y="3" width="3" height="1"/><rect x="5" y="4" width="5" height="1"/><rect x="11" y="4" width="2" height="1"/><rect x="4" y="5" width="9" height="1"/><rect x="4" y="6" width="9" height="1"/><rect x="3" y="7" width="10" height="1"/><rect x="3" y="8" width="10" height="1"/><rect x="3" y="9" width="10" height="1"/><rect x="4" y="10" width="8" height="1"/><rect x="4" y="11" width="8" height="1"/><rect x="5" y="12" width="6" height="1"/><rect x="6" y="13" width="4" height="1"/></g><g class="px-yellow"><rect x="7" y="7" width="3" height="1"/><rect x="6" y="8" width="5" height="1"/><rect x="6" y="9" width="5" height="1"/><rect x="6" y="10" width="5" height="1"/><rect x="7" y="11" width="3" height="1"/><rect x="7" y="12" width="2" height="1"/></g></svg>',
  time:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="6" y="1" width="4" height="1"/><rect x="4" y="2" width="8" height="1"/><rect x="3" y="3" width="10" height="1"/><rect x="2" y="4" width="12" height="1"/><rect x="2" y="5" width="12" height="1"/><rect x="1" y="6" width="14" height="1"/><rect x="1" y="7" width="14" height="1"/><rect x="1" y="8" width="14" height="1"/><rect x="1" y="9" width="14" height="1"/><rect x="2" y="10" width="12" height="1"/><rect x="2" y="11" width="12" height="1"/><rect x="3" y="12" width="10" height="1"/><rect x="4" y="13" width="8" height="1"/><rect x="6" y="14" width="4" height="1"/></g><g class="px-cream"><rect x="6" y="2" width="4" height="1"/><rect x="4" y="3" width="8" height="1"/><rect x="3" y="4" width="10" height="1"/><rect x="3" y="5" width="10" height="1"/><rect x="2" y="6" width="12" height="1"/><rect x="2" y="7" width="12" height="1"/><rect x="2" y="8" width="12" height="1"/><rect x="2" y="9" width="12" height="1"/><rect x="3" y="10" width="10" height="1"/><rect x="3" y="11" width="10" height="1"/><rect x="4" y="12" width="8" height="1"/><rect x="6" y="13" width="4" height="1"/></g><g class="px-sand"><rect x="7" y="3" width="2" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="12" y="7" width="1" height="1"/><rect x="3" y="8" width="1" height="1"/><rect x="12" y="8" width="1" height="1"/><rect x="7" y="12" width="2" height="1"/></g><g class="px-ink"><rect x="7" y="4" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="7" y="7" width="4" height="1"/></g></svg>',
  team:'<svg class="pixel" viewBox="0 0 16 16" aria-hidden="true"><g class="px-ink"><rect x="2" y="1" width="4" height="1"/><rect x="10" y="1" width="4" height="1"/><rect x="2" y="2" width="4" height="1"/><rect x="10" y="2" width="4" height="1"/><rect x="2" y="3" width="4" height="1"/><rect x="10" y="3" width="4" height="1"/><rect x="3" y="4" width="2" height="1"/><rect x="11" y="4" width="2" height="1"/><rect x="1" y="5" width="6" height="1"/><rect x="9" y="5" width="6" height="1"/><rect x="0" y="6" width="7" height="1"/><rect x="9" y="6" width="7" height="1"/><rect x="0" y="7" width="16" height="1"/><rect x="0" y="8" width="16" height="1"/><rect x="0" y="9" width="7" height="1"/><rect x="9" y="9" width="7" height="1"/><rect x="1" y="10" width="5" height="1"/><rect x="10" y="10" width="5" height="1"/><rect x="1" y="11" width="5" height="1"/><rect x="10" y="11" width="5" height="1"/></g><g class="px-skin"><rect x="3" y="2" width="2" height="1"/><rect x="11" y="2" width="2" height="1"/><rect x="3" y="3" width="2" height="1"/><rect x="11" y="3" width="2" height="1"/></g><g class="px-blue"><rect x="3" y="5" width="2" height="1"/><rect x="1" y="6" width="5" height="1"/><rect x="1" y="7" width="5" height="1"/><rect x="1" y="8" width="5" height="1"/><rect x="1" y="9" width="5" height="1"/><rect x="2" y="10" width="3" height="1"/></g><g class="px-green"><rect x="11" y="5" width="2" height="1"/><rect x="10" y="6" width="5" height="1"/><rect x="10" y="7" width="5" height="1"/><rect x="10" y="8" width="5" height="1"/><rect x="10" y="9" width="5" height="1"/><rect x="11" y="10" width="3" height="1"/></g><g class="px-yellow"><rect x="6" y="7" width="1" height="1"/><rect x="9" y="7" width="1" height="1"/><rect x="6" y="8" width="1" height="1"/><rect x="9" y="8" width="1" height="1"/></g><g class="px-ink"><rect x="3" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="11" y="2" width="1" height="1"/><rect x="13" y="2" width="1" height="1"/></g></svg>'
};
specIcons.image=specIcons.art;specIcons.plus=specIcons.grit;
if(specs)specs.innerHTML=(d.specialties||[]).map(function(x){return'<article class="specialty-card"><div class="specialty-icon">'+(specIcons[x.icon]||specIcons.art)+'</div><h3>'+e(x.title)+'</h3><p>'+e(x.detail)+'</p></article>'}).join('');
var featured=q('featured-project'),fp=(d.projects||[])[0];
/* 배경 이미지(1단) → 반투명 레이어(2단) → 글자(3단) 순으로 쌓습니다. */
if(featured&&fp)featured.innerHTML='<a class="featured-hero'+(fp.image?'':' no-image')+'" href="project.html?id='+encodeURIComponent(fp.id)+'">'
  +'<div class="featured-bg"'+(fp.image?' style="background-image:url('+encodeURI(fp.image)+')"':'')+'></div>'
  +'<div class="featured-scrim"></div>'
  +'<div class="featured-content"><div class="shell">'
    +'<span class="featured-genre">'+e(fp.genre)+'</span>'
    +'<h3>'+e(fp.title)+'</h3>'
    +'<p>'+e(fp.summary)+'</p>'
    +'<b>프로젝트 바로가기 →</b>'
    +(fp.image?'':'<em class="featured-hint">assets/images 에 대표 이미지를 넣고 data.js의 image 값을 입력하세요</em>')
  +'</div></div></a>';
var genreCounts=(d.games||[]).reduce(function(out,game){var name=String(game.genre||'미분류').trim()||'미분류';out[name]=(out[name]||0)+1;return out},{}),genreStats=Object.keys(genreCounts).map(function(name,index){return{label:name,value:genreCounts[name],order:index}}).sort(function(a,b){return b.value-a.value||a.order-b.order});
function point(cx,cy,r,a){a=(a-90)*Math.PI/180;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]}function points(r,vals){return Array.from({length:6},function(_,i){var p=point(210,178,r*(vals?vals[i]:1),60*i);return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ')}var radar=q('radar');if(radar){var items=genreStats.slice(0,6),realCount=items.length,maxGenre=Math.max.apply(null,items.map(function(x){return x.value}).concat([1]));while(items.length<6)items.push({label:'입력 대기',value:0});var markup=[1,.75,.5,.25].map(function(s){return'<polygon points="'+points(118*s)+'" class="radar-grid"/>'}).join('');items.forEach(function(x,i){var p=point(210,178,118,60*i),l=point(210,178,146,60*i);markup+='<line x1="210" y1="178" x2="'+p[0]+'" y2="'+p[1]+'" class="radar-axis"/><text x="'+l[0]+'" y="'+l[1]+'" text-anchor="middle" dominant-baseline="middle">'+e(x.label)+'</text>'});var vals=items.map(function(x){return x.value/maxGenre});if(realCount)markup+='<polygon points="'+points(118,vals)+'" class="radar-area"/>';radar.innerHTML=markup;q('radar-status').textContent=realCount?'게임 목록 등록 수 기준 상위 6개':'게임 목록을 입력해 주세요'}
var bars=q('play-bars');if(bars){var topGenres=genreStats.slice(0,Math.max(6,genreStats.length)),max=Math.max.apply(null,topGenres.map(function(x){return x.value}).concat([1]));bars.innerHTML=topGenres.map(function(x,i){return'<div class="bar-row"><span>'+String(i+1).padStart(2,'0')+'</span><div><b>'+e(x.label)+'</b><i><u style="width:'+(x.value/max*100)+'%"></u></i></div><strong>'+e(x.value)+'개</strong></div>'}).join('')}
var grid=q('game-grid'),filters=q('game-filters'),count=q('game-count'),state={platform:'전체',genre:'전체'};function gameRender(){if(!grid)return;var arr=(d.games||[]).filter(function(x){return(state.platform==='전체'||x.platform===state.platform)&&(state.genre==='전체'||x.genre===state.genre)});count.textContent=arr.length+' GAMES';grid.innerHTML=arr.map(function(x,i){return'<article class="game-card"><span>'+String(i+1).padStart(2,'0')+'</span><h4>'+e(x.title)+'</h4><p>'+e(x.platform)+' · '+e(x.genre)+'</p><small>'+e(x.record)+'</small></article>'}).join('')||'<p class="no-results">조건에 맞는 게임이 없습니다.</p>'}function uniq(k){if(k==='genre')return['전체'].concat(genreStats.map(function(x){return x.label}));return['전체'].concat((d.games||[]).map(function(x){return x[k]}).filter(function(v,i,a){return a.indexOf(v)===i}))}if(filters){filters.innerHTML=[['platform','플랫폼'],['genre','장르']].map(function(group){return'<div class="filter-group"><b>'+group[1]+'</b>'+uniq(group[0]).map(function(v){return'<button class="'+(v==='전체'?'active':'')+'" data-type="'+group[0]+'" data-value="'+e(v)+'">'+e(v)+'</button>'}).join('')+'</div>'}).join('');filters.addEventListener('click',function(ev){var b=ev.target.closest('button');if(!b)return;state[b.dataset.type]=b.dataset.value;b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('active',x===b)});gameRender()});gameRender()}
var skills=q('skills');function dots(level){var filled=Math.max(0,Math.min(5,Math.round((+level||0)/20))),out='';for(var i=0;i<5;i++){out+='<span class="dot'+(i<filled?' on':'')+'"></span>'}return'<span class="skill-dots" role="img" aria-label="사용 수준 5단계 중 '+filled+'단계">'+out+'</span>'}
if(skills)skills.innerHTML=(d.skills||[]).map(function(x){return'<div class="skill" tabindex="0"><span class="app-icon"><img src="'+e(x.image)+'" alt=""></span><div><b>'+e(x.name)+'</b>'+dots(x.level)+'</div><aside class="skill-popup" role="tooltip"><strong>'+e(x.name)+'</strong><p>'+e(x.detail)+'</p><small>사용 수준 5단계 중 '+Math.max(0,Math.min(5,Math.round((+x.level||0)/20)))+'단계</small></aside></div>'}).join('');
var personalInfo=q('resume-personal-info');if(personalInfo)personalInfo.innerHTML='<div class="personal-history-head"><span>연도</span><span>이력</span></div>'+(d.resumePersonalInfo||[]).map(function(x){return'<div class="personal-history-row"><time>'+e(x.year||'연도 입력')+'</time><strong>'+e(x.history||'이력 입력')+'</strong></div>'}).join('');
var careers=q('resume-careers');if(careers)careers.innerHTML=(d.resumeCareers||[]).map(function(x){return'<article class="resume-entry"><time>'+e(x.period||'기간 입력')+'</time><div><h3>'+e(x.company||'회사명 입력')+'</h3><b>'+e(x.role||'직무 입력')+'</b><p>'+e(x.detail||'업무 내용 입력')+'</p></div></article>'}).join('');
var resumeProjects=q('resume-projects');
if(resumeProjects){
  var rp=(d.resumeProjects||[]);
  function rpCard(x){return'<article><time>'+e(x.year||'연도 입력')+'</time><h3>'+e(x.title||'프로젝트명 입력')+'</h3><b>'+e(x.role||'역할 입력')+'</b><p>'+e(x.detail||'설명 입력')+'</p></article>'}
  /* 자동으로 흐르지 않고, 사용자가 끌거나 스크롤할 때만 이동합니다. */
  resumeProjects.innerHTML='<div class="marquee-track">'+rp.map(rpCard).join('')+'</div>';
  var dragging=false,startX=0,startScroll=0,moved=false;
  resumeProjects.addEventListener('pointerdown',function(ev){dragging=true;moved=false;startX=ev.clientX;startScroll=resumeProjects.scrollLeft;resumeProjects.setPointerCapture(ev.pointerId);resumeProjects.classList.add('dragging')});
  resumeProjects.addEventListener('pointermove',function(ev){if(!dragging)return;var dx=ev.clientX-startX;if(Math.abs(dx)>3)moved=true;resumeProjects.scrollLeft=startScroll-dx});
  function endDrag(){dragging=false;resumeProjects.classList.remove('dragging')}
  resumeProjects.addEventListener('pointerup',endDrag);
  resumeProjects.addEventListener('pointercancel',endDrag);
  resumeProjects.addEventListener('click',function(ev){if(moved){ev.preventDefault();ev.stopPropagation()}},true);
}
var projects=q('project-grid');if(projects)projects.innerHTML=(d.projects||[]).map(function(p,i){return'<a class="project-card" href="project.html?id='+encodeURIComponent(p.id)+'"><div class="project-thumb tone-'+i%3+'"><span>'+e(p.year)+'</span></div><div class="project-meta"><span>'+e(p.genre)+'</span><h2>'+e(p.title)+'</h2><p>'+e(p.role)+'</p></div><div class="project-hover"><strong>'+e(p.summary)+'</strong><span>상세 보기 →</span></div></a>'}).join('');/* 숏폼 영상 한 칸. 유튜브 주소면 미리보기 그림을 먼저 놓고,
   재생 버튼을 누르면 그 자리에서 플레이어로 바뀝니다.
   세로(9:16)로 볼지 가로(16:9)로 볼지는 data.js 의 ratio 값으로 정할 수 있습니다.
   값이 없으면 유튜브 일반 영상은 가로, 유튜브 쇼츠와 직접 넣은 영상 파일은 세로입니다. */
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
          +'onerror="if(this.dataset.fb){this.style.display=\''+'none'+'\'}else{this.dataset.fb=1;this.src=\''+e(thumb)+'hqdefault.jpg\'}">'
          +'<span class="yt-play" aria-hidden="true"></span>'
        +'</button>'
      +'</div>'
      /* 파일을 더블클릭해 열면(file://) 유튜브가 "오류 153"으로 재생을 막는다. 그때를 위한 탈출구. */
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

/* 엑셀 표. 브라우저는 file:// 에서 .xlsx 를 읽지 못하므로
   tools/xlsx-to-sheets.py 로 미리 뽑아 둔 assets/sheets.js 의 내용을 표로 그립니다. */
function sheetTable(key){
  var store=window.PORTFOLIO_SHEETS||{},sheet=store[key];
  if(!sheet)return'';
  var colgroup=(sheet.cols||[]).map(function(w){return'<col style="width:'+Math.max(48,Math.round((+w||10)*8))+'px">'}).join(''),
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
  return'<div class="sheet-wrap" tabindex="0" aria-label="'+e(sheet.title||'표')+'"><table class="sheet-table">'
    +(colgroup?'<colgroup>'+colgroup+'</colgroup>':'')+'<tbody>'+body+'</tbody></table></div>';
}

/* ===== 프로젝트 상세 페이지 =====
   순서: 제목 → (내 역할 | 참여 인원) → 상세 설명 → 숏폼 영상 → 프로젝트 이미지 → 상세 기획서
   - 내 역할·참여 인원은 한 줄짜리 얇은 띠
   - 상세 설명은 간단 설명(summary)이 큰 글씨로 앞에 오고 그 아래 본문
   - 프로젝트 이미지는 큰 사진 한 장 + 오른쪽 목록. 목록을 누르면 큰 사진이 바뀜
   - 상세 기획서는 위쪽 제목 버튼을 누르면 아래 상자에 그 문서가 뜸 */
var detail=q('project-detail');
if(detail){
  var id=new URLSearchParams(location.search).get('id'),
      p=(d.projects||[]).find(function(x){return x.id===id})||(d.projects||[])[0];
  if(p){
    var team=(p.team||[]).map(function(x){return'<li><span>'+e(x.part)+'</span><strong>'+e(x.count)+'명</strong></li>'}).join('')||'<li class="project-empty">인원 구성 입력</li>',
        videos=(p.shortVideos||[]).map(videoEmbed).join('')||'<div class="media-placeholder">숏폼 영상 추가 영역</div>',
        gallery=(p.images||[]).filter(function(x){return x&&x.src}),
        /* 이미지가 아직 없어도 큰 사진 자리와 오른쪽 목록 틀은 그대로 보여 준다. */
        railItems=gallery.length
          ?gallery.map(function(x,i){
             return'<button type="button" class="gallery-thumb'+(i?'':' on')+'" data-img="'+i+'">'
               +'<img src="'+e(x.src)+'" alt="'+e(x.alt||p.title)+'" loading="lazy"></button>'}).join('')
          :'<span class="gallery-slot"></span><span class="gallery-slot"></span><span class="gallery-slot"></span><span class="gallery-slot"></span>',
        galleryBlock='<div class="gallery-main" id="gallery-main">'
            +(gallery.length?'':'<div class="media-placeholder">프로젝트 이미지 추가 영역</div>')+'</div>'
          +'<div class="gallery-rail">'+railItems+'</div>',
        docList=(p.documents||[]).filter(function(x){return x&&x.src}),
        docTabs=docList.map(function(x,i){return'<button type="button" class="doc-tab'+(i?'':' on')+'" data-doc="'+i+'">'+e(x.title||('기획서 '+(i+1)))+'</button>'}).join(''),
        docBlock=docList.length
          ?'<div class="doc-tabs" role="tablist">'+docTabs+'</div>'
           +'<section class="project-section document-section"><h2 id="doc-title"></h2><div class="doc-viewer" id="doc-viewer"></div></section>'
          :'<section class="project-section document-section"><div class="media-placeholder">상세 기획서 추가 영역</div></section>';
    detail.innerHTML='<a class="back" href="portfolio.html">← 포트폴리오 목록</a>'
      +'<div class="detail-hero"><p class="kicker">'+e(p.year)+' · '+e(p.genre)+'</p><h1>'+e(p.title)+'</h1></div>'
      +'<div class="project-brief">'
        +'<section class="project-section role-section"><p class="artifact-label">MY ROLE</p>'
          +'<div class="brief-line"><h2>내 역할</h2><p>'+e(p.role)+'</p></div></section>'
        +'<section class="project-section team-section"><p class="artifact-label">TEAM</p>'
          +'<div class="brief-line"><h2>참여 인원</h2><ul class="team-list">'+team+'</ul></div></section>'
      +'</div>'
      +'<section class="project-section note-section"><p class="note-lead">'+e(p.summary)+'</p>'
        +'<p class="project-body">'+e(p.body)+'</p></section>'
      +'<section class="video-block"><div class="video-grid">'+videos+'</div></section>'
      +'<section class="gallery-block">'+galleryBlock+'</section>'
      +'<section class="document-block">'+docBlock+'</section>';

    wireVideos(detail);

    /* 프로젝트 이미지: 오른쪽 목록을 누르면 큰 사진이 바뀝니다. */
    var main=q('gallery-main');
    if(main&&gallery.length){
      var thumbs=detail.querySelectorAll('.gallery-thumb');
      var showImage=function(n){
        var x=gallery[n];if(!x)return;
        main.innerHTML='<img src="'+e(x.src)+'" alt="'+e(x.alt||p.title)+'">'
          +(x.caption?'<p class="gallery-caption">'+e(x.caption)+'</p>':'');
        for(var i=0;i<thumbs.length;i++){thumbs[i].classList.toggle('on',i===n)}
      };
      for(var i=0;i<thumbs.length;i++){
        thumbs[i].addEventListener('click',function(ev){showImage(+ev.currentTarget.getAttribute('data-img'))});
      }
      showImage(0);
    }

    /* 기획서 뷰어: 엑셀 표, 이미지, PDF 를 구분해 보여 줍니다. */
    var viewer=q('doc-viewer'),docTitle=q('doc-title');
    if(viewer&&docList.length){
      var tabs=detail.querySelectorAll('.doc-tab');
      var showDoc=function(n){
        var x=docList[n];if(!x)return;
        var src=String(x.src||''),ext=src.split('?')[0].split('.').pop().toLowerCase(),
            hasSheet=!!(x.sheet&&(window.PORTFOLIO_SHEETS||{})[x.sheet]),
            isImage=['png','jpg','jpeg','gif','webp','svg','bmp','avif'].indexOf(ext)>=0,
            isPdf=ext==='pdf',stage,cls;
        if(hasSheet){cls=' is-sheet';stage=sheetTable(x.sheet)}
        else if(isImage){cls=' is-image';stage='<img src="'+e(src)+'" alt="'+e(x.title||'기획서 이미지')+'">'}
        else if(isPdf){cls=' is-file';stage='<iframe src="'+e(src)+'" title="'+e(x.title||'기획서')+'" loading="lazy"></iframe>'}
        else{cls=' is-note';stage='<p class="doc-note">브라우저에서 바로 볼 수 없는 형식입니다. 아래에서 파일을 내려받아 확인해 주세요.</p>'}
        if(docTitle)docTitle.textContent=x.title||'상세 기획서';
        viewer.innerHTML='<div class="doc-stage'+cls+'">'+stage+'</div>'
          +'<div class="doc-actions">'
          +(hasSheet?'':'<a class="button outline" href="'+e(src)+'" target="_blank" rel="noopener">새 창으로 보기</a>')
          +'<a class="button filled" href="'+e(src)+'" download>'+(hasSheet?'엑셀 파일 다운로드 ↓':'다운로드 ↓')+'</a></div>';
        for(var t=0;t<tabs.length;t++){tabs[t].classList.toggle('on',t===n)}
      };
      for(var t=0;t<tabs.length;t++){
        tabs[t].addEventListener('click',function(ev){showDoc(+ev.currentTarget.getAttribute('data-doc'))});
      }
      showDoc(0);
    }
  }
}
var items=document.querySelectorAll('.appear');if(!('IntersectionObserver'in window))items.forEach(function(x){x.classList.add('visible')});else{var ob=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('visible');ob.unobserve(x.target)}})},{threshold:.08});items.forEach(function(x){ob.observe(x)})}})();
