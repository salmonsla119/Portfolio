/* 편집방법.md 를 PDF(편집방법.pdf)로 만드는 보조 스크립트. 사이트 실행에는 필요 없습니다.

     node tools/guide-pdf.js

   pandoc 으로 마크다운을 HTML 로 바꾼 뒤, 아래 인쇄용 서식을 입혀
   크로미움으로 A4 PDF 를 뽑습니다. 글꼴은 사이트가 쓰는 Pretendard 를 그대로 씁니다.
   양식 예시 그림을 다시 찍었으면(tools/guide-shots.js) 이것도 다시 돌리세요. */
const {chromium}=require('playwright');
const {execFileSync}=require('child_process');
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'),TMP=path.join(ROOT,'_guide.html');

const CSS=`
@font-face{font-family:Pretendard;src:url('assets/PretendardVariable.woff2') format('woff2');
  font-weight:100 900;font-display:block}
@page{size:A4;margin:16mm 14mm}
:root{--ink:#1b1f24;--sub:#4b545c;--line:#d8dde2;--accent:#1f7f99;--box:#f4f6f8}
*{box-sizing:border-box}
body{margin:0;font-family:Pretendard,sans-serif;font-size:10.5pt;line-height:1.75;
  color:var(--sub);letter-spacing:-.01em;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3,h4{color:var(--ink);line-height:1.3;letter-spacing:-.02em;break-after:avoid}
h1{margin:0 0 6mm;padding-bottom:4mm;border-bottom:2px solid var(--ink);font-size:22pt;font-weight:800}
h2{margin:11mm 0 4mm;padding-top:4mm;border-top:1px solid var(--line);font-size:15pt;font-weight:800}
h3{margin:8mm 0 3mm;font-size:12.5pt;font-weight:800}
h4{margin:7mm 0 2.5mm;font-size:11pt;font-weight:800;color:var(--accent)}
p{margin:0 0 3mm}
strong{color:var(--ink);font-weight:700}
a{color:var(--accent);text-decoration:none}
code{padding:1px 4px;border:1px solid var(--line);border-radius:3px;background:var(--box);
  color:var(--ink);font-family:"DejaVu Sans Mono",Pretendard,monospace;font-size:9pt}
pre{margin:0 0 4mm;padding:4mm;border:1px solid var(--line);border-left:3px solid var(--accent);
  border-radius:3px;background:var(--box);white-space:pre-wrap;word-break:break-all;break-inside:avoid}
pre code{padding:0;border:0;background:none;font-size:9pt;line-height:1.6}
ul,ol{margin:0 0 4mm;padding-left:6mm}
li{margin:1.5mm 0}
hr{height:0;margin:6mm 0;border:0;border-top:1px solid var(--line)}
table{width:100%;margin:0 0 4mm;border-collapse:collapse;font-size:9.5pt;break-inside:avoid}
th,td{padding:2mm 3mm;border:1px solid var(--line);text-align:left;vertical-align:top}
th{background:var(--box);color:var(--ink);font-weight:700}
img{display:block;width:100%;height:auto;margin:3mm 0 5mm;border:1px solid var(--line);
  border-radius:3px;break-inside:avoid}
blockquote{margin:0 0 4mm;padding-left:4mm;border-left:2px solid var(--accent);color:var(--ink)}
`;

const body=execFileSync('pandoc',['편집방법.md','-f','gfm','-t','html5'],
  {cwd:ROOT,encoding:'utf-8',maxBuffer:1<<24});
fs.writeFileSync(TMP,'<!doctype html><html lang="ko"><head><meta charset="utf-8">'
  +'<title>포트폴리오 편집 방법</title><style>'+CSS+'</style></head><body>'+body+'</body></html>');

(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const pg=await b.newPage();
  await pg.goto('file://'+TMP,{waitUntil:'networkidle'});
  await pg.evaluate(()=>document.fonts.ready);
  const bad=await pg.evaluate(()=>[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src));
  if(bad.length)console.log('그림을 못 읽었습니다:',bad);
  await pg.pdf({path:path.join(ROOT,'편집방법.pdf'),format:'A4',printBackground:true,
    margin:{top:'16mm',bottom:'16mm',left:'14mm',right:'14mm'},
    displayHeaderFooter:true,headerTemplate:'<div></div>',
    footerTemplate:'<div style="width:100%;padding:0 14mm;font-size:8pt;color:#9aa3ab;'
      +'text-align:right"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'});
  await b.close();
  fs.unlinkSync(TMP);
  console.log('편집방법.pdf 를 만들었습니다.');
})();
