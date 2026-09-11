/* 아주 가벼운 마크다운 변환기입니다. 외부 라이브러리 없이 동작하며 오프라인에서도 사용할 수 있습니다. */
/* 지원 문법: # ~ ###### 제목, 빈 줄로 구분되는 문단, > 인용, - / * 목록, 1. 번호 목록,
   --- 구분선, **굵게**, *기울임*, `코드`, [링크](주소) */
(function(){
'use strict';
function escapeHtml(s){
  return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]});
}
function inline(s){
  s=escapeHtml(s);
  s=s.replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  s=s.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  s=s.replace(/(^|[^*])\*(?!\*)(.+?)\*(?!\*)/g,'$1<em>$2</em>');
  s=s.replace(/`(.+?)`/g,'<code>$1</code>');
  return s;
}
var RE_HEAD=/^(#{1,6})\s+(.*)$/,
    RE_QUOTE=/^\s*>\s?(.*)$/,
    RE_UL=/^\s*[-*]\s+/,
    RE_OL=/^\s*\d+[.)]\s+/,
    RE_HR=/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
function renderMarkdown(md){
  var lines=String(md||'').replace(/\r\n?/g,'\n').split('\n');
  var html='',i=0,n=lines.length,para=[];
  function flushPara(){
    if(para.length){html+='<p>'+inline(para.join(' '))+'</p>';para=[]}
  }
  while(i<n){
    var line=lines[i];
    if(RE_HR.test(line)){flushPara();html+='<hr>';i++;continue}
    var h=RE_HEAD.exec(line);
    if(h){
      flushPara();
      var level=h[1].length;
      html+='<h'+level+'>'+inline(h[2].trim())+'</h'+level+'>';
      i++;continue;
    }
    if(RE_QUOTE.test(line)){
      flushPara();
      var quoted=[];
      while(i<n&&RE_QUOTE.test(lines[i])){
        quoted.push(RE_QUOTE.exec(lines[i])[1]);
        i++;
      }
      /* 인용 안에서도 같은 규칙을 그대로 쓸 수 있도록 재귀 처리합니다. */
      html+='<blockquote>'+renderMarkdown(quoted.join('\n'))+'</blockquote>';
      continue;
    }
    if(RE_UL.test(line)||RE_OL.test(line)){
      flushPara();
      var ordered=RE_OL.test(line),re=ordered?RE_OL:RE_UL,items=[];
      while(i<n&&re.test(lines[i])){
        items.push('<li>'+inline(lines[i].replace(re,''))+'</li>');
        i++;
      }
      html+=ordered?'<ol>'+items.join('')+'</ol>':'<ul>'+items.join('')+'</ul>';
      continue;
    }
    if(line.trim()===''){flushPara();i++;continue;}
    para.push(line.trim());
    i++;
  }
  flushPara();
  return html;
}
window.renderMarkdown=renderMarkdown;
})();
