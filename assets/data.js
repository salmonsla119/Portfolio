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
  {id:"project-01",featured:true,year:"2026",title:"High Num",genre:"주사위, 롤플레잉, 전략",role:"부팀장, PM",summary:"샷건에 주사위를 장전해 쏘아라! 수치 상승의 쾌감이 느껴지는 주사위 도박 전투",body:"프로젝트 상세 설명 입력",image:"assets/images/project-01-main.png",team:[{part:"기획",count:5},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[{src:"https://www.youtube.com/watch?v=mYlwMKpCUC0&t=1s",title:"High Num 소개 영상"}],images:[],documents:[{title:"2026년 8월 작업 캘린더",src:"assets/documents/work-calendar-2026-08.xlsx",sheet:"work-calendar-2026-08"}]},
  {id:"project-02",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-03",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-04",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-05",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-06",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-07",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-08",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-09",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-10",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-11",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]},
  {id:"project-12",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],position:"",quote:"",problem:"",solution:{before:"",after:"",note:""},md:``,shortVideos:[],images:[],documents:[]}
]
};
