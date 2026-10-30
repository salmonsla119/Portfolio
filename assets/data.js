/* 이 파일의 숫자와 문구를 수정하면 화면이 자동으로 갱신됩니다. 게임 객체는 30개 이상 추가할 수 있습니다. */
window.PORTFOLIO_DATA={
metrics:[{value:"05",label:"참여 프로젝트",unit:"회"},{value:"01",label:"리더 역할",unit:"회"},{value:"08",label:"경력",unit:"개월"}],
/* 자기소개서: 아래 마크다운 문법(## 제목, 빈 줄로 구분된 문단, **굵게** 등)을 그대로 수정하면 cover-letter.html에 서식이 적용되어 표시됩니다. */
coverLetter:`> **저는 구현 과정 전체를 생각하는 기획자입니다.**

**오랬동안 원화를 공부**했었습니다.
그 이유는 **몬헌 제작 영상**을 보고 **직접 상호작용 가능한 세계를 만드는 일에 매료** 되었기 때문입니다.
그렇게 전 **3D 그래픽을 거쳐 원화가**를 하게 됐었습니다.
하지만 실무까지의 과정을 거치며 **기획자에 대해 알게 되었고** AI를 사용해 개인적으로도 게임을 만들어보니 **기획자가 되어 아트 일을 통해 키운 역량과 AI를 이용하면** 내가 원했던 **게임의 구현을 더 폭넓게 이해하고 만들어갈 수 있을 것** 같았습니다. 그래서 전 **기획자로 전향**하게 되었고 **아트와 기획의 시야**를 모두 볼 수 있었습니다.


---

> **저는 작업자를 이해하고 소통할 수 있습니다.**

**배경 원화로 스타트업에서 일**했었고 **부족한 시간** 때문에 원화 작업자로서 기획자, 3D 작업자와 고민했었습니다. 그 전까지는 **혼자 열심히 하면 될 것이라 생각** 했는데 그것만으로 **해결할 수 없었**습니다. 그렇게 **해결을 위해** 다음 작업자와 작업 스타일을 파악하고 작업체계를 다시 짜맞추거나, 기획자에게 현재 사용할 수 있는 방법들을 말하고 리소스 활용에 더 효율적인 지시를 받는 등 **연계되는 작업자들과 소통**했고 **서로 소통하며 작업하는 것의 중요성**을 느꼈습니다. 또한 **작업자의 입장에서 기획자가 도울 수 있는 것**들을 알 수 있었습니다.


------

> **소통을 통해 문제를 해결하고 발전해나가는 사람**

부팀장으로 팀프로젝트를 하다가 문제가 발생했었습니다. 실무자 출신 5명이 기획을 하니 **서로 생각하는 기획의 범위도 달랐고** 팀장님도 저도 **여러명을 중재하는게 처음이라 미숙**했었습니다. 결과적으로 기획이 2번 엎어졌고 1주일을 더 뒤쳐지게 되어 팀원들도 모두 의욕을 잃고 날이 서게 되었습니다. 그것을 해결하기 위해 **이전의 경험**을 떠올리며 **다른 팀들에게 조언**을 받아 적용해보거나 **작업자들과 개별 대화**를 통해 서로 느끼는 문제들을 파악해나갔습니다. 그렇게 **작업체계를 재정비**하고 작업자들 간의 **타협을 이뤄**냈습니다. 그렇게 점점 작업이 수월해져 마지막엔 **재시간에 맞춰 결과물을 완성**해낼 수 있었습니다. 이렇게 **이전의 경험을 기획자의 입장에서 체화**할 수 있었고 **문제상황에 대처하는 경험**을 쌓을 수 있었습니다.

---

> **언제나 발전해나가는 사람이 되겠습니다.**

저는 이렇게 기획자로서 미숙한 점을 **다른 이로부터 배워나가며 발전**하고 **작업 하나 하나를 소홀히 하지 않습니다**. 저는 이것이 저를 키워나가 게임 제작을 더 능숙하게 만들어 줄 것이라고 믿습니다. 늘 이 생각을 잊지 않고 **모두의 말을 귀담아 듣는 사람**이 되겠습니다.`,
specialties:[{icon:"art",eyebrow:"GRAPHIC",title:"아트 실무 경험",detail:"아트 파트 출신으로 그래픽 이해와 감각이 있습니다"},{icon:"grit",eyebrow:"SPECIALTY 02",title:"끈기",detail:"작업 인원이 혼자 남아도 끝까지 완성까지 작업합니다"},{icon:"time",eyebrow:"SPECIALTY 03",title:"시간 엄수",detail:"정해진 일정은 무슨 일이 있어도 지킵니다"},{icon:"team",eyebrow:"SPECIALTY 04",title:"협업 경험",detail:"아트, 기획 파트로 다른 직군과 협업해본 경험이 있습니다"}],
/* 장르 그래프와 순위는 아래 games의 genre를 자동 집계해 생성됩니다. */
games:Array.from({length:12},function(_,i){return{id:"game-"+String(i+1).padStart(2,"0"),title:"게임명 입력",platform:i%3===0?"PC":i%3===1?"콘솔":"모바일",genre:["액션","RPG","전략","리듬","생존","인디"][i%6],record:"플레이 시간 또는 클리어 기록"};}),
skills:[{image:"assets/icons/photoshop.png",name:"Photoshop",level:96,detail:"대부분의 기능을 능숙하게 사용 가능"},{image:"assets/icons/3ds-max.png",name:"3ds Max",level:72,detail:"모델링 및 UV 작업 가능"},{image:"assets/icons/blender.png",name:"Blender",level:48,detail:"모델링, UV 및 렌더링 작업 가능"},{image:"assets/icons/trello.png",name:"Trello",level:72,detail:"일정 관리에 사용 가능"},{image:"assets/icons/microsoft-office.png",name:"Microsoft Office",level:72,detail:"원하는 형식의 문서 작업 가능"},{image:"assets/icons/figma.png",name:"Figma",level:57,detail:"원하는 형식의 작업 가능"},{image:"assets/icons/claude.png",name:"Claude",level:57,detail:"사전 입력, 저장소 연동 등 사용 가능"},{image:"assets/icons/unity.svg",name:"Unity",level:57,detail:"코딩을 사용하지 않은 조작, 에셋 사용, 연결 가능"}],
resumePersonalInfo:[{year:"",history:""},{year:"",history:""},{year:"",history:""}],
resumeCareers:[{period:"",company:"",role:"",detail:""},{period:"",company:"",role:"",detail:""},{period:"",company:"",role:"",detail:""}],
/* 프로젝트 목록은 옆으로 천천히 흐르며, 마우스를 올리면 멈추고 드래그·좌우 버튼으로 넘길 수 있습니다. 항목을 복사해 개수를 늘리세요. */
resumeProjects:[{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""}],
/* 프로젝트 상세 페이지의 구성은 각 항목의 md 칸이 정합니다.
   비워 두면 기본 구성(포지션 → 소개 → 인용 → 문제 → 해결 → 기획서)으로 나옵니다.
   양식을 부르는 방법은 편집방법.md 의 "프로젝트 상세 — 양식 부르기"를 보세요. */
projects:[
  {id:"project-01",featured:true,year:"2026",title:"High Num",genre:"주사위, 롤플레잉, 전략",role:"부팀장, PM",summary:"샷건에 주사위를 장전해 쏘아라! 수치 상승의 쾌감이 느껴지는 주사위 도박 전투",body:"",image:"assets/images/project-01-main.png",team:[{part:"기획",count:5},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"일정 관리, 갈등 조율",quote:"",problem:"",solution:{before:"",after:"",note:""},md:`
@@인용
그래서 저희 게임 무슨 게임이에요?

@@소개
제목: 샷건에 주사위를 장전해 쏘아라! 수치 상승의 쾌감이 느껴지는 주사위 도박 전투
포지션: 부팀장, PM
역량: 일정 관리, 갈등 조율
그림: assets/images/project-01-main.png
작업기간: 07/20 ~ 09/03 (34일)
장르: 주사위, 덱빌딩, 로그라이크, 인크리멘탈

@@문제
제목: 의견 불일치

1주차에 게임의 컨셉에 대한 팀장과 팀원 개개인의 의견이 모두 일치하지 않았고 작업이 진전되지 않아 기획이 한번 엎어졌었습니다.
원인은 다음과 같습니다.

- 정해진 장르의 정의에 대한 서로 다른 이해
- 생각하는 방향성 두개의 우선도 차이
- 애매모호한 팀장과 부팀장의 권한

팀원 모두가 게임의 각 다른 파트 출신의 현업자인 팀이었고 때문에 서로 자기의사가 강한 상태였습니다.
팀장은 탑다운과 즉흥 개발에 익숙했고 게임의 세부 컨셉에 관해서는 당장 정할 필요 없다는 입장이었기에 당장 작업이 필요하다 생각하는 저와는 끊임없이 부딧쳤었습니다.
부팀장인 저는 팀장을 설득하는데 성공하거나 팀원들을 통제할 정도로 요령있거나 강경하지 못했습니다.

@@해결
제목: **1차** 해결 시도

인용: 이제부터 저희는 무조건 팀장님 말을 따를거에요. 동의 하나요?

다양한 조언을 받은 끝에 저는 저희 팀에서는 모든 팀원들의 의견을 들어주는 것은 불가능하다는 결론을 내렸습니다.
또한 팀원들과의 면담을 통해 팀원들은 방향이 정해지고 있지 않은 상황에 불만을 가지고 있다는 것 또한 알 수 있었습니다.

그리하여 1차적으로 팀장과의 면담을 진행했습니다. 정해진 것은 다음과 같습니다.

- 팀장은 결정과 검수의 역할만 하고 앞으로 결정해야 하는 사항은 부팀장이 정한다.
- 팀장의 결정은 절대적이며 팀원들은 의견 제시 시간에만 문서로 정리하여 의견을 낼 수 있다.

이후 팀원들에게 결정사항을 전달했고 팀원들은 모두 수긍했습니다.

@@문제
제목: PM이 해야하는 것

이후로는 조금 삐걱거려도 작업은 진척 되었습니다.
그러나 전 일정이 자꾸 지켜지지 않고 작업이 누락되고 있다고 느꼈습니다.

인용: 대체 뭐라는거에요?

그러던 중 팀원 하나가 저에게 일정표에 대해 건의했습니다.
그때 저는 엑셀을 사용한 WBS 형식의 일정표를 사용하고 있었고 그것이 팀원들에게는 불편하고 작업 단위의 일정 배치가 맞지 않았던 것입니다.

@@해결
제목: 작업이 안정되기 까지

저는 직후 팀원들에게 자신이 생각하는 자신의 남은 일들을 써달라 요청하였습니다.
그 결과 그 목록 중 반은 서로 중복되거나 부풀려 있었고 때문에 팀원들은 업무 과중을 느끼고 있었습니다.

전: 
후: 

이후 저는 trello를 사용해 일단위로 세부 작업 일정을 관리하여 매일 공지하기 시작했습니다.
작업이 바뀔 시의 승인, 보고가 즉각적으로 일어나기 시작했고 그때부터는 제가 일정을 효율화하는 것이 가능해졌습니다.

@@해결
제목: 프로젝트를 통해 얻은 것

이 프로젝트를 통해 저는 다음과 같은 역량을 얻을 수 있었습니다.

- 일정 관리 툴을 사용한 세부 작업 파악 및 분배
- 팀 내 권한 분할 및 체계 확정

이것으로 일주일 늦어졌던 개발 일정을 효율화시켜 제 시간에 맞출 수 있었습니다.

@@기획서
`,shortVideos:[{src:"https://www.youtube.com/watch?v=mYlwMKpCUC0&t=1s",title:"High Num 소개 영상"}],images:[],documents:[{title:"2026년 8월 작업 캘린더",src:"assets/documents/work-calendar-2026-08.xlsx",sheet:"work-calendar-2026-08"}]},
  {id:"project-02",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-03",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-04",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-05",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-06",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-07",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-08",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-09",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-10",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-11",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-12",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],period:"",position:"",gains:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]}
]
};
