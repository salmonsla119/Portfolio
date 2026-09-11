/* 이 파일의 숫자와 문구를 수정하면 화면이 자동으로 갱신됩니다. 게임 객체는 30개 이상 추가할 수 있습니다. */
window.PORTFOLIO_DATA={
metrics:[{value:"05",label:"참여 프로젝트",unit:"회"},{value:"01",label:"리더 역할",unit:"회"},{value:"08",label:"경력",unit:"개월"}],
/* 자기소개서: 아래 마크다운 문법(## 제목, 빈 줄로 구분된 문단, **굵게** 등)을 그대로 수정하면 cover-letter.html에 서식이 적용되어 표시됩니다. */
coverLetter:`> 저는 2번 파트를 바꾸면서도 **게임 제작에 대한 애정은 놓지 않는** 기획자입니다.

저는 한때 우연히 봤던 **몬스터 헌터 제작 영상 하나**를 보고 그런 가상 ‘세계’를 만드는 일에 **매료**되었었습니다. 그때 저는 구현에 관심이 있었기에 **3D 그래픽**을 배웠었습니다. 하지만 불가피하게 **원화로 전환**하게 되었고 이후 AI가 등장하며 기획자가 게임 제작에 **신 기술을 가장 잘 이용**할 수 있겠다고 생각해 다시 한번 **기획자로 전향**하게 되었습니다. 이렇게 제가 게임 제작이라는 틀 안에서 노력한 이유는 여전히 게임을 만들어내는 것에 **애착**이 있기 때문입니다.

---

> 저의 강점은 **타 직무에 대한 이해와 책임감**이라고 생각합니다.

저는 짧지만 **배경원화 직무로 스타트업**에서 일해보았던 적이 있습니다. 당시 타 직무로 게임 출시 과정을 같이 밟아보면서 부족한 시간을 매꾸기 위해 전후 작업자인 기획자들, 3D 작업자들과 **작업 효율화를 위해 고민**했었고 결과적으로 작업시간을 반으로 줄이는데 성공했습니다. 이 과정에서 여러 시행착오를 통해 **기획자-원화가-3D그래픽-프로그래머** 사이의 작업 파이프라인과 **협업 연계**를 몸소 체험할 수 있었습니다. 또한 그에 따른 작업자 사이의 배려 방법 또한 배울 수 있었습니다.


또한 제가 **부팀장**으로 팀 프로젝트로 게임을 제작하였을 때 작업에서 문제가 발생한 적이 있습니다. 저희 팀은 5명이 모두 실무자 출신으로 이루어진 팀이었습니다. 그만큼 각 팀원들이 가치관이 달랐고 그로 인해 팀원들 사이의 의견 불일치가 자주 발생했습니다. 이때 제가 잘 조율해야 했지만 저는 작업자 출신인지라 아직 **의견 조율이 미숙**했고 결과적으로 **기획이 2번 엎어**졌었습니다. 그렇게 다른팀보다 1주일을 더 뒤쳐지게 되어 팀원들도 모두 의욕을 잃고 날이 서게 되었습니다. 하지만 **포기하지 않고** 여러 사람에게 조언을 구해가며 **작업체계를 재 정비**했습니다. 문제가 발생했던 작업자들과도 대화를 나누고 **타협을 부탁**하는데 성공했습니다. 이것으로 이전보다 원활히 작업을 진행하여 1주일 뒤쳐졌음에도 **재 시간에 맞출 수 있었**습니다. 이렇게 서로 사고방식이 아예 다른 사람들간의 협업은 저에게 소통에 대한 다양한 것들을 깨달을 수 있게 해주었습니다.

---

> 누구보다 **수용적이고 끝까지 포기하지 않는** 사람이 되겠습니다.

언제나 저의 부족한 면을 **다른 이로부터 배워나가**며 채우고 작업 하나 하나를 소홀히 하지 않겠습니다. 저는 이것이 저를 키워나가 더 좋은 게임을 만들게 해 줄 것이라고 믿습니다. 그것을 위해 모두의 말을 귀담아 듣고 더욱 성실히 노력하겠습니다.`,
specialties:[{icon:"art",eyebrow:"GRAPHIC",title:"아트 실무 경험",detail:"아트 파트 출신으로 그래픽 이해와 감각이 있습니다"},{icon:"grit",eyebrow:"SPECIALTY 02",title:"끈기",detail:"작업 인원이 혼자 남아도 끝까지 완성까지 작업합니다"},{icon:"time",eyebrow:"SPECIALTY 03",title:"시간 엄수",detail:"정해진 일정은 무슨 일이 있어도 지킵니다"},{icon:"team",eyebrow:"SPECIALTY 04",title:"협업 경험",detail:"아트, 기획 파트로 다른 직군과 협업해본 경험이 있습니다"}],
/* 장르 그래프와 순위는 아래 games의 genre를 자동 집계해 생성됩니다. */
games:Array.from({length:12},function(_,i){return{id:"game-"+String(i+1).padStart(2,"0"),title:"게임명 입력",platform:i%3===0?"PC":i%3===1?"콘솔":"모바일",genre:["액션","RPG","전략","리듬","생존","인디"][i%6],record:"플레이 시간 또는 클리어 기록"};}),
skills:[{image:"assets/icons/photoshop.png",name:"Photoshop",level:96,detail:"대부분의 기능을 능숙하게 사용 가능"},{image:"assets/icons/3ds-max.png",name:"3ds Max",level:72,detail:"모델링 및 UV 작업 가능"},{image:"assets/icons/blender.png",name:"Blender",level:48,detail:"모델링, UV 및 렌더링 작업 가능"},{image:"assets/icons/trello.png",name:"Trello",level:72,detail:"일정 관리에 사용 가능"},{image:"assets/icons/microsoft-office.png",name:"Microsoft Office",level:72,detail:"원하는 형식의 문서 작업 가능"},{image:"assets/icons/figma.png",name:"Figma",level:57,detail:"원하는 형식의 작업 가능"},{image:"assets/icons/claude.png",name:"Claude",level:57,detail:"사전 입력, 저장소 연동 등 사용 가능"},{image:"assets/icons/unity.svg",name:"Unity",level:57,detail:"코딩을 사용하지 않은 조작, 에셋 사용, 연결 가능"}],
resumePersonalInfo:[{year:"",history:""},{year:"",history:""},{year:"",history:""}],
resumeCareers:[{period:"",company:"",role:"",detail:""},{period:"",company:"",role:"",detail:""},{period:"",company:"",role:"",detail:""}],
/* 프로젝트 목록은 옆으로 천천히 흐르며, 마우스를 올리면 멈추고 드래그·좌우 버튼으로 넘길 수 있습니다. 항목을 복사해 개수를 늘리세요. */
resumeProjects:[{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""},{year:"",title:"",role:"",detail:""}],
projects:[
  {id:"project-01",featured:true,year:"2026",title:"High Num",genre:"주사위, 롤플레잉, 전략",role:"부팀장, PM",summary:"샷건에 주사위를 장전해 쏘아라! 수치 상승의 쾌감이 느껴지는 주사위 도박 전투",body:"프로젝트 상세 설명 입력",image:"assets/images/project-01-main.png",team:[{part:"기획",count:5},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-02",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-03",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-04",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-05",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-06",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-07",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-08",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-09",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-10",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-11",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]},
  {id:"project-12",year:"연도 입력",title:"프로젝트 제목 입력",genre:"장르 입력",role:"내 역할 입력",summary:"간단 설명 입력",body:"프로젝트 상세 설명 입력",image:"",team:[{part:"기획",count:0},{part:"아트",count:0},{part:"프로그래밍",count:0}],shortVideos:[],images:[],documents:[]}
]
};
