<!-- PROJECT LOGO -->
<div align="center">
  <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="Logo" width="80" height="55">
  <h1>Youtube Clone Project</h1>
  <p>
    <a href="https://utube-page.web.app">배포 주소 바로가기</a>
    ·
    <a href="https://devjoylee.github.io/tags?q=redux">프로젝트 회고 바로가기</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details align="right">
  <summary>Table of Contents</summary>
    <div><a href="#프로젝트-소개">프로젝트 소개</a></div>
    <div><a href="#기술-스택">기술 스택</a></div>
    <div><a href="#프로젝트-구현-사항">프로젝트 구현 사항</a></div>
    <div><a href="#커밋-컨벤션">커밋 컨벤션</a></div>
</details>

## 프로젝트 소개

> Firebase와 Youtube API를 활용한 Redux 기반의 Youtube 클론 프로젝트.

Google 계정으로 로그인을 한 후 해당 사용자의 Youtube 데이터를 동기화시켜 구독중인 채널을 보여주거나 댓글을 남기는 등 실제 Youtube 웹사이트처럼 이용할 수 있도록 제작한 프로젝트입니다. <br/> [Youtube Data API 공식문서](https://developers.google.com/youtube/v3/docs/)를 참고하여 개발했습니다.

- 제작 기간 : 2022.03.06 - 2022.03.29

<br/>

## 기술 스택

<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">&nbsp;&nbsp;<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;&nbsp;<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">&nbsp;&nbsp;

<br/>

## 프로젝트 구현 사항

### Redux 상태관리 툴

- Redux와 Redux-thunk로 비동기적인 상태를 효율적으로 관리도록 개발했습니다.
  [📝 더 알아보기](https://devjoylee.github.io/tags?q=redux)

### 로그인 페이지

- Firebase의 Authentication 서비스를 사용하여 Google 로그인 기능을 구현하였습니다.
  [📝 더 알아보기](https://devjoylee.github.io/google-auth-firebase/)

### 메인 페이지

- 영상을 클릭하면 해당 영상의 **상세 페이지**로 이동합니다.
- **카테고리**를 클릭하면 카테고리 키워드에 대한 비디오를 출력합니다.
- 상단 검색창에 텍스트를 **검색**하면 검색 결과 페이지로 이동합니다.
- `InfiniteScroll` 라이브러리로 **무한 스크롤 기능**을 구현하였습니다.
- 영상 로딩 시 Skeleton UI를 노출시켜 **사용자 경험을 개선**하였습니다.

### 영상 페이지

- 실행가능한 영상과 영상에 대한 **상세 정보**를 출력합니다.
- 페이지 우측에는 현재 페이지와 **관련된 영상 목록**을 출력합니다.
- 영상 로딩 시 Skeleton UI를 노출시켜 **사용자 경험을 개선**하였습니다.
- 로그인한 **Google 계정과 동기화** 하여 실제로 댓글을 남길 수 있도록 구현하였습니다.

### 검색 결과 페이지

- 검색한 키워드에 대한 영상 및 채널 목록을 출력합니다.

### 채널 목록 페이지 (subscriptions)

- 로그인한 **Google 계정과 동기화** 하여 사용자가 구독중인 채널 목록을 출력합니다.

<br/>

## 커밋 컨벤션

| 깃모지 | 사용 예시               |
| ------ | ----------------------- |
| 🎉     | init                    |
| 🚚     | 디렉토리 또는 파일 이동 |
| ✨     | 기능 구현               |
| 💄     | CSS 스타일링            |
| ♻️     | 리팩토링                |
| 📝     | Readme 수정             |
| ➕     | 모듈 추가               |
| 🐛     | 버그 해결               |
| 🚑️    | 치명적인 오류 해결      |

출처 : 깃모지(http://gitmoji.dev/)

<br/>

<p align="right">(<a href="#top">back to top</a>)</p>
