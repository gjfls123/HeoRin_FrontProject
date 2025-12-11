# 🥂 LUXIP - 프리미엄 주류 스마트 오더 사이트</h1>

> **LUXIP**은 고급스러운 주류를 스마트하게 주문하고,  
> 오프라인 매장 탐색부터 결제까지 한 번에 처리할 수 있는 술 판매 플랫폼입니다. 🍷✨
> 
> **해외 시장 대비 열악함, 오프라인 구매 한계, 온라인 플랫폼 부재. 시장의 빈틈을 LUXIP이 채우겠습니다** 😊
> 
> 제작기간 2025.06.13 ~ 2025.07.15 

| [프로젝트 소개](#-luxip---프리미엄-주류-스마트-오더-사이트) | [사용 기술 스택](#️-사용-기술-스택) | [팀원 & 담당 역할](#-팀원--담당-역할) | [프로젝트 구조](#-프로젝트-구조) | [주요 기능](#️-주요-기능) | [화면 흐름도](#-화면-흐름도) | [관리자 기능](#%E2%80%8D-관리자--공통-기능-허린) |

---

## 🛠️ 사용 기술 스택


<table>
  <tr>  
    <th>Frontend</th>
    <th>Backend</th>
    <th>DB</th>
    <th>지도 서비스</th>
    <th>버전관리</th>
  </tr>
  <tr>
    <td>
      <!-- Frontend -->
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> 
      <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> 
      <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> 
      <img src="https://img.shields.io/badge/JavaScript-F7E018?style=for-the-badge&logo=javascript&logoColor=black"/> 
      <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/> 
      <img src="https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white"/>  
      <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
      <img src="https://img.shields.io/badge/Redux%20Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
      <img src="https://img.shields.io/badge/React--Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
    </td>
     <!-- Backend -->
    <td>
      <img src="https://img.shields.io/badge/Backend-None-lightgray?style=for-the-badge"/> <br>(프론트 중심 SPA)
    </td>
     <!-- DB -->
    <td>
      <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white"/> <br>JSON 파일 기반 데이터 관리
    </td>
     <!-- Kakao -->
    <td>
      <img src="https://img.shields.io/badge/Kakao%20Map%20API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black"/>
    </td>
     <!-- Git -->
    <td>
      <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/> 
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
    </td>
  </tr>
</table>

---

## 👥 팀원 & 담당 역할

| 이름 | 역할 |
|------|------|
| 🧑‍💻 **허린** | **관리자 페이지 전반, Kakao API, GitHub 관리** |
| 🧑‍💻 이XX | 사용자용 기능: 아이템 목록, 상세페이지, 로그인/회원가입 |
| 🧑‍💻 박XX | 관리자 주문 관리, 장바구니, 결제 기능 |
| 🧑‍🤝‍🧑 공통 기능 | 반응형 웹 디자인 적용  |
---

## 📂 프로젝트 구조

FrontProject     <br>
 ┣ public               <br>
 ┣ src                  <br>
 ┃ ┣ apis/              <br>
 ┃ ┃ ┣ commonApis.jsx   <br>
 ┃ ┃ ┗ shopPos.js       <br>
 ┃ ┣ components/        <br>
 ┃ ┃ ┣ common/          <br>
 ┃ ┃ ┗ container/       <br>
 ┃ ┣ pages/             <br>
 ┃ ┣ router/            <br>
 ┃ ┣ slice/             <br>
 ┃ ┗ store/             <br>
 ┣ package.json         <br>
 ┗ README.md            <br>

---


## ⚙️ 주요 기능

### 🔀 화면 흐름도
<img width="626" height="311" alt="image" src="https://github.com/user-attachments/assets/da711c5c-7db4-4266-8a67-0752c83ce1f9" />


### 🧑‍💼 **관리자 / 공통 기능 (허린)**
<details>
    <summary>🖼️ 관리자 전용 레이아웃</summary>
    <table>
      <tr>
        <th>👥 회원 관리</th>
        <th>🍶 상품 관리</th>
        <th>🚚 주문처 관리</th>
        <th>📊 인덱스 대시보드</th>
      </tr>
      <tr>
        <td>조회, 수정, 삭제</td>
        <td>등록, 조회, 수정, 삭제</td>
        <td>등록, 조회, 수정, 삭제</td>
        <td>지표 조회</td>
      </tr>
      <tr>
        <td colspan="2">🎬 시연 영상 1</td>
        <td colspan="2">🎬 시연 영상 2</td>
      </tr>
      <tr>
        <td colspan="2">
          <img src="https://github.com/user-attachments/assets/3aa81836-0684-4d21-8272-d38e38056411" />
        </td>
        <td colspan="2">
          <img src="https://github.com/user-attachments/assets/5461d259-f89a-43d4-af29-7cbab82ab780" />
        </td>
      </tr>
  </table>
</details>
  
<details>
    <summary> 📄 메인 페이지 & 🗺️ 카카오 API 기반 매장 지도 연동</summary>
    <table>
      <tr>
        <th>🎞️ 자동 슬라이드</th>
        <th>📍 자동 스크롤 & 카카오 Map API</th>
      </tr>
      <tr>
        <td><img src="https://github.com/user-attachments/assets/b4c105c6-1769-4232-a1e4-9d14d526a73b" /></td>
        <td><img src="https://github.com/user-attachments/assets/3840067f-d7dd-44e5-b4a2-b556924769e2" /></td>
      </tr>
    </table>
</details>
  
<details>
    <summary>🧾 GitHub 버전 관리 총괄</summary>
   <table>
    <tr>
      <th>📌 GitHub 관리</th>
      <th>📌 Push / Pull 규칙</th>
      <th>📌 .gitignore 관리</th>
    </tr>
    <tr>
      <td>
        Collaborator 관리<br>
        Projects → Issue 기반 작업 흐름 관리<br>
        레포지토리 페이지에서 바로 Branch 생성
      </td>
      <td>
        변경 사항 확인 시 작업 일시 중지<br>
        PR 생성 → 코드 리뷰 → Merge<br>
        Merge 후 로컬 환경 Pull로 최신화
      </td>
      <td>
        의존성 제외: node_modules 등<br>
        빌드 산출물 제외: build, dist<br>
        환경 변수 보호: .env 파일 제외<br>
        IDE 설정 파일 제외: .vscode, .idea<br>
        YML 설정 파일 제외: application.yml
      </td>
    </tr>
  </table>
</details>

### 💳 주문 / 결제 기능 (박XX)
<details>
    <summary>🧺 장바구니 기능 & 📦 주문 관리 페이지 & 💳 결제 처리 시스템</summary>
    <table>
      <tr>
        <th>🧺 장바구니 기능</th>
        <th>💳 결제 처리 시스템</th>
        <th>📦 주문 관리 페이지</th>
      </tr>
      <tr>
        <td> <img src="https://github.com/user-attachments/assets/2cb1865b-7fa7-473c-a079-e55cebd0b560" /></td>
        <td> <img src="https://github.com/user-attachments/assets/bd6355e6-4784-48aa-b097-1c5fd1fccc69" /></td>
        <td> <img src="https://github.com/user-attachments/assets/a5bf6bb4-d7dc-44a0-aed3-afbbc3f8e8e9" /></td>
      </tr>
    </table>
  </details>



### 🛍️ 사용자 기능 (이XX)

<details>
    <summary>📦 아이템 목록 페이지 & 🔍 아이템 상세 페이지 & 💬 아이템 댓글, 리뷰 & 📝 로그인 / 회원가입</summary>
    <table>
      <tr>
        <th>📦 아이템 목록 페이지</th>
        <th>🔍 아이템 상세 페이지</th>
        <th>💬 아이템 댓글, 리뷰</th>
        <th>📝 로그인 / 회원가입</th>
      </tr>
      <tr>
        <td> <img src="https://github.com/user-attachments/assets/a16bf58b-4011-4a30-b837-94d921695ebd" /></td>
        <td> <img src="https://github.com/user-attachments/assets/bc255485-b702-4309-bda8-091a4b73a41e" /></td>
        <td> <img src="https://github.com/user-attachments/assets/7cbab753-586d-4aa7-9951-fe3876bc647a" /></td>
        <td> <img src="https://github.com/user-attachments/assets/596d4160-8e10-4946-bd30-bad6fb62cfb4" /></td>
      </tr>
    </table>
  </details>

  

---
