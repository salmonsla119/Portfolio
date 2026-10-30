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
  s=s.replace(/==(.+?)==/g,'<mark>$1</mark>');
  s=s.replace(/`(.+?)`/g,'<code>$1</code>');
  return s;
}
var RE_HEAD=/^(#{1,6})\s+(.*)$/,
    RE_QUOTE=/^\s*>\s?(.*)$/,
    RE_UL=/^\s*[-*]\s+/,
    RE_OL=/^\s*\d+[.)]\s+/,
    RE_HR=/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
/* 목록 항목이 `낱말: 내용` 꼴이면 앞의 낱말을 라벨로 떼어 강조한다
   (플랫폼: PC / 특징: ... 처럼 쓰는 줄이 많다) */
var RE_KEY=/^([^\s:][^:.]{0,29}):[ \t]+(.+)$/;
function itemHtml(text){
  var m=RE_KEY.exec(text);
  return m?'<b class="k">'+inline(m[1])+':</b> '+inline(m[2]):inline(text);
}

/* 들여쓴 목록 항목은 바로 앞 항목 안으로 들어간다 */
function buildList(items,at,depth){
  var ordered=items[at].ordered,out=[],k=at,sub;
  while(k<items.length&&items[k].depth>=depth){
    if(items[k].depth>depth){
      sub=buildList(items,k,items[k].depth);
      if(out.length)out[out.length-1]=out[out.length-1].replace(/<\/li>$/,sub.html+'</li>');
      else out.push('<li>'+sub.html+'</li>');
      k=sub.next;
    }else{
      out.push('<li>'+itemHtml(items[k].text)+'</li>');
      k++;
    }
  }
  return{html:(ordered?'<ol>':'<ul>')+out.join('')+(ordered?'</ol>':'</ul>'),next:k};
}

function renderMarkdown(md){
  var lines=String(md||'').replace(/\r\n?/g,'\n').split('\n');
  var html='',i=0,n=lines.length,para=[];
  /* 한 문단 안에서 줄을 바꾼 자리는 그대로 살린다.
     사용자가 문장마다 줄을 끊어 쓰므로 공백으로 이어 붙이면 글이 뭉친다 */
  function flushPara(){
    if(para.length){html+='<p>'+inline(para.join('\n')).replace(/\n/g,'<br>')+'</p>';para=[]}
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
      /* 목록은 한 덩어리로 모은 뒤 들여쓰기 깊이대로 겹쳐 쌓는다 */
      var items=[];
      while(i<n&&(RE_UL.test(lines[i])||RE_OL.test(lines[i]))){
        var ord=RE_OL.test(lines[i]),
            lead=/^[ \t]*/.exec(lines[i])[0].replace(/\t/g,'  ').length;
        items.push({depth:lead,ordered:ord,text:lines[i].replace(ord?RE_OL:RE_UL,'')});
        i++;
      }
      html+=buildList(items,0,items[0].depth).html;
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
/* 목록 항목 한 줄 — 카드처럼 목록 밖에서 같은 규칙을 쓸 때 */
window.renderItem=itemHtml;
})();
