# 김채연 포트폴리오 사이트

게임 기획자 김채연의 개인 포트폴리오 웹사이트. 순수 HTML/CSS/JS로만 되어 있고 **빌드 과정도, 외부 라이브러리도 없다.**

## 가장 중요한 제약

1. **더블클릭으로 열어도 동작해야 한다.** 사용자는 `index.html`을 파일 탐색기에서 바로 열어 확인한다. 주소창이 `file://`로 시작하는 상태에서도 모든 기능이 정상 동작해야 한다.
   - 따라서 **`fetch()`로 외부 파일을 읽으면 안 된다.** 브라우저 보안 정책에 막힌다. 실제로 자기소개서를 `.md` 파일에서 `fetch`로 불러오게 만들었다가 화면이 안 나와서, `assets/data.js` 안에 문자열로 넣는 방식으로 되돌렸다.
   - 데이터는 전부 `<script src>`로 불러오는 JS 파일에 담는다.
2. **iOS 사파리에서 동작해야 한다.** 사용자가 아이폰으로 확인한다.
   - `background-attachment:fixed`는 iOS에서 문제가 있어 쓰지 않는다.
   - `100svh`, `env(safe-area-inset-*)`, `-webkit-backdrop-filter` 등은 이미 적용되어 있다.
3. **모바일 반응형.** 375px에서 가로 스크롤이 생기면 안 된다.

## 파일 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 메인 (히어로, 대표 프로젝트, 특기사항, 플레이 경험) |
| `resume.html` | 이력서 |
| `cover-letter.html` | 자기소개서 |
| `portfolio.html` | 프로젝트 목록 |
| `project.html` | 프로젝트 상세 (`?id=project-01` 형식) |
| `assets/data.js` | **모든 콘텐츠가 여기 있다.** 사용자가 직접 고치는 파일 |
| `assets/app.js` | 데이터를 읽어 화면을 그리는 스크립트 + 도트 아이콘 정의 |
| `assets/markdown.js` | 자체 제작 경량 마크다운 변환기 |
| `assets/style.css` | 전체 스타일 |
| `assets/portfolio-images.js` | 포트폴리오 카드 썸네일 배경 지정 |
| `assets/sheets.js` | 엑셀(.xlsx) 표 데이터. `tools/xlsx-to-sheets.py`가 생성 |
| `tools/xlsx-to-sheets.py` | 엑셀을 위 JS로 바꾸는 보조 스크립트 (사이트 실행에는 불필요) |
| `편집방법.md` | 사용자용 한국어 편집 안내 (수정하면 여기도 갱신할 것) |

프로젝트 상세 페이지 구성: 제목 → (내 역할 | 참여 인원) 얇은 띠 → 상세 설명(summary 가 큰 글씨) → 숏폼 영상(가로 전체) → 프로젝트 이미지(큰 사진 + 오른쪽 목록) → 상세 기획서(제목 버튼이 상자 위). 프로젝트 상세의 `shortVideos`는 유튜브 주소를 넣으면 embed 로 바꿔 넣는다(`videoEmbed`). `documents`의 `sheet` 값은 `assets/sheets.js`의 키이며, 엑셀 내용을 표로 그린다(`sheetTable`). `fetch` 금지 제약 때문에 엑셀은 반드시 미리 JS로 변환해 둔다.

`assets/data.js` 최상위 항목: `metrics`, `coverLetter`, `specialties`, `games`, `skills`, `resumePersonalInfo`, `resumeCareers`, `resumeProjects`, `projects`

## 디자인 시스템

색은 전부 `assets/style.css` 맨 위 `:root`의 변수로 관리한다. 여기만 고치면 전 페이지가 함께 바뀐다.

```
--ink:#22314f   남색 (글자, 외곽선)      --paper:#faf6ea  크림 배경
--card:#ffffff  카드 흰색 (순백)                --peach:#f0d4b2  상단 띠, 강조 카드
--sand:#e7c496  제목 밑줄, 하드 그림자   --gold:#c09a5c   영문 라벨, 별
--muted:#8d7551 본문 갈색                --brown:#6a4a24  강조 글씨
```

특징적인 요소들:

- **파일철 탭 내비게이션** — 상단 띠에 남색 밑선이 있고, 현재 페이지 탭만 크림색으로 튀어나와 밑선을 끊는다. 각 HTML의 `<nav>`에서 현재 페이지 링크에 `class="active"`를 준다.
- **도트 별 배경** — `body`의 `background-image` (base64 SVG 타일)
- **픽셀 도시 실루엣** — `.city-strip`. 메인은 히어로 안에, 서브페이지는 푸터 위 `.city-band` 안에
- **남색 외곽선 + 하드 그림자** — 카드류에 `border:2px solid var(--ink)` + `box-shadow:5px 6px 0 var(--sand)`
- **대표 프로젝트** — 배경 이미지 위에 반투명 레이어를 한 겹 깔고 그 위에 글자를 올린 전체 폭 배너. 섹션 제목까지 이미지 위에 얹고 위아래 여백은 0

## 도트(픽셀) 아이콘

외부 이미지가 아니라 **HTML/JS 안에 직접 들어 있는 인라인 SVG**다. `<rect>` 하나가 도트 한 칸이고 `shape-rendering:crispEdges`로 계단 픽셀을 유지한다.

- 색 클래스: `.px-ink`(남색) `.px-sand` `.px-cream` `.px-red` `.px-orange` `.px-yellow` `.px-blue` `.px-green` `.px-skin` `.px-star` `.px-outline`
- 특기사항 아이콘은 `assets/app.js`의 `specIcons` 객체에 있다. 키: `art`(팔레트) `grit`(불꽃) `time`(시계) `team`(두 사람). `data.js`의 `icon` 값으로 고른다.
- 히어로의 달·구름, 카드 옆 반짝이, 섹션 제목 옆 별은 각 HTML에 직접 들어 있다.

아이콘을 새로 그릴 때는 격자에 채워진 실루엣을 먼저 만들고, 상하좌우가 모두 도형 안인 픽셀만 골라내면(= 내부) 1px 외곽선이 남는다. 이 방식으로 "외곽선 + 내부 채색"을 만든다.

## 겪었던 함정 (다시 반복하지 말 것)

- **`.specialty-icon svg{stroke:currentColor;stroke-width:2}`** — 원래 템플릿에 있던 규칙. 도트 아이콘의 `rect` 한 칸마다 굵은 선을 둘러서 아이콘이 검은 덩어리로 뭉개졌다. `.pixel` 계열에 `stroke:none`을 걸어 해결. **아이콘이 이상하면 모양보다 이 규칙을 먼저 의심할 것.**
- **`width:100vw`** — 스크롤바 폭만큼 넘쳐서 가로 오버플로가 생긴다. `html{overflow-x:hidden}`으로 막아 뒀다.
- **CSS data URI** — SVG 안의 큰따옴표가 CSS 문자열을 끊는다. base64로 인코딩할 것.
- **CSS 중복 정의** — `style.css`가 오래 누적되어 같은 선택자가 여러 번 나온다. 뒤에 오는 규칙이 이긴다. 스타일이 안 먹으면 파일 뒤쪽에 같은 선택자가 또 있는지 확인할 것.
- **전면 배너에 `.appear` 슬라이드 인** — 16px 밀려 들어오는 애니메이션 때문에 위아래 틈이 보인다. 히어로에서는 `appear` 클래스를 뺐다.
- **PowerShell `Compress-Archive`** — 하위 폴더가 통째로 빠진 zip이 만들어진 적이 있다. zip을 만들 땐 Python `zipfile`로 정슬래시 경로를 쓸 것.

## 확인 방법

```bash
python -m http.server 8000
```

브라우저 스크린샷이 흰 화면으로만 나오는 경우가 잦다. 브라우저 패널이 숨겨지면 페이지가 렌더링되지 않아 생기는 현상이지 코드 문제가 아니다. 이럴 땐 스크린샷 대신 DOM 실측값(`getBoundingClientRect`, `getComputedStyle`)으로 검증하는 편이 확실하다.

## 작업할 때

- 사용자는 한국어로 소통한다. 문서(`편집방법.md`, `README.md`)도 한국어로 유지한다.
- 콘텐츠를 임의로 바꾸지 않는다. 사용자가 직접 쓴 문구다.
- 구조를 바꿨으면 `편집방법.md`의 안내도 같이 갱신한다.
