/* 편집방법.md 의 "양식별 작성법"에 들어가는 예시 그림을 다시 만드는 보조 스크립트.
   사이트 실행에는 필요 없습니다. 양식의 생김새를 바꿨을 때만 돌리면 됩니다.

   1) 사이트를 띄웁니다            python -m http.server 8765
   2) 이 스크립트를 돌립니다       node tools/guide-shots.js
   결과는 docs/blocks/ 에 저장됩니다. */
const {chromium}=require('playwright');
const OUT=__dirname+'/../docs/blocks/';
const IMG='assets/images/project-01-main.png';

/* [파일이름, md 에 적는 내용] — 편집방법.md 의 코드 칸과 같게 유지합니다 */
const CASES=[
 ['intro','@@소개\n---\n제목: 주사위를 쏘는 **전투**\n기간: 2026.03 – 2026.08\n장르: 주사위, 롤플레잉, 전략\n포지션: 05\n역량: 일정 관리, 갈등 조율\n그림: '+IMG+'\n\n샷건에 주사위를 장전해 쏘는 전투를 만들었습니다.\n수치가 올라가는 쾌감을 **중심축**으로 잡았습니다.\n'],
 ['quote','@@인용\n가장 재미있는 숫자는 커지는 숫자다.\n'],
 ['problem','@@문제\n테스터 절반이 첫 전투에서 규칙을 이해하지 못했습니다.\n\n- 주사위를 왜 장전하는지 모른다\n- 수치가 어디에 쓰이는지 모른다\n'],
 ['solve','@@해결\n제목: **튜토리얼** 다시 짜기\n전: '+IMG+'\n후: '+IMG+'\n인용: 결국 첫 판이 전부다.\n\n튜토리얼을 **3단계**로 쪼개고, 첫 판에서는 주사위를 한 종류만 줬습니다.\n'],
 ['docs','@@기획서\n'],
 ['text','@@기획 의도\n---\n**몬스터 헌터**의 제작 영상을 보고 시작한 기획입니다.\n\n1. 손맛이 먼저다\n2. 숫자는 손맛을 거드는 역할이다\n'],
 ['image','@@이미지\n그림: '+IMG+'\n설명: 수정한 전투 화면\n'],
 ['sheet','@@표\n제목: 작업 **캘린더**\n이름: work-calendar-2026-08\n'],
 ['cards','@@문제\n제목: 의견 불일치\n\n손그림: assets/images/project-01-issue-torn.png\n\n'
        +'원인은 다음과 같습니다.\n\n'
        +'카드: assets/images/project-01-cause-genre.png, assets/images/project-01-cause-priority.png,'
        +' assets/images/project-01-cause-authority.png\n'
        +'- 정해진 장르의 정의에 대한 서로 다른 이해\n- 생각하는 방향성 두개의 우선도 차이\n'
        +'- 애매모호한 팀장과 부팀장의 권한\n'],
 ['tabs','@@탭 프로젝트\n\n@@글\n제목: 게임 소개\n\n샷건에 주사위를 장전해 쏘는 전투입니다.\n\n'
        +'@@탭 문제 상황\n\n@@문제\n테스터 절반이 첫 전투에서 규칙을 이해하지 못했습니다.\n']
];
/* PDF·문서에 넣었을 때 글씨가 읽히도록 900px 폭으로 찍습니다 */
/* 그림이 큰 칸만 jpg 로 저장해 파일 크기를 줄입니다 */
const JPG=['intro','solve','image','cards'];

(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  for(const [name,md] of CASES){
    const pg=await b.newPage({viewport:{width:900,height:900},deviceScaleFactor:1.5});
    /* data.js 를 가로채 그 프로젝트의 md 칸만 예시 내용으로 바꿔 끼웁니다 */
    await pg.route('**/assets/data.js',async r=>{
      const res=await r.fetch();
      await r.fulfill({response:res,
        body:(await res.text())+'\nwindow.PORTFOLIO_DATA.projects[0].md='+JSON.stringify(md)+';\n'});
    });
    await pg.goto('http://localhost:8765/project.html?id=project-01',{waitUntil:'load'});
    /* 맨 위 16:9 화면 다음 칸(= 불러온 양식)만 잘라냅니다.
       탭 예시만 단추 줄 + 첫 칸의 첫 구역까지 함께 잘라냅니다 */
    const box=await pg.evaluate(name=>{
      if(name==='tabs'){
        const t=document.querySelector('.pj-tabsbar').getBoundingClientRect(),
              f=document.querySelector('.pj-panel > section').getBoundingClientRect();
        return{x:0,y:Math.round(t.top+window.scrollY),width:900,
               height:Math.round(f.bottom-t.top)};
      }
      const r=document.querySelectorAll('#project > section')[1].getBoundingClientRect();
      return{x:0,y:Math.round(r.top+window.scrollY),width:900,height:Math.round(r.height)};
    },name);
    const jpg=JPG.indexOf(name)>=0;
    await pg.screenshot(Object.assign(
      {path:OUT+name+(jpg?'.jpg':'.png'),fullPage:true,clip:box},
      jpg?{type:'jpeg',quality:86}:{}));
    console.log(name,box.height);
    await pg.close();
  }
  await b.close();
})();
