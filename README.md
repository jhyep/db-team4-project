# ✔ 2023-2 DATABASE TEAM PROJECT

> **TEAM 4: 2019114283 박지혜, 2019115044 전민재, 2019110472 정지후** </br></br> **개발기간: 2023.10 - 2023.12 (약 2개월)**

## 💡 OVERVIEW

### 북로그:BookLog 📚 ?

도서 검색과 더불어 타 독자들이 부여한 평점과 한줄평을 참고할 수 있으며, 본인이 읽은 책에 대한 평점, 한줄평, 독후감을 남길 수 있는 웹 서비스입니다.

### 개발 동기 💦

시중에 알라딘, 인터파크 등과 같이 도서 검색은 가능하지만 독후감까지 남길 수 있는 웹 서비스가 제공되고 있지 않아 </br> 이에 따른 사용자들의 불편함을 덜고자 개발에 착수하게 되었습니다.

### 개발 일정 📆

- Phase 1 - Conceptual DB Design (ER Diagram)
  - 10.01 ~ 10.12
- Phase 2 - Logical Database Design (Relational Design by SQL)
  - 10.13 ~ 11.02
- Phase 3 - JDBC Database Application
  - 11.02 ~ 11.23
- Phase 4 - Web based Database Service Implementation
  - 11.24 ~ 12.06
- Phase 4 상세 개발 일정
  <img width="750" alt="image" src="https://github.com/jhyep/db-team4-project/assets/80496795/23e232f9-a183-42c8-9610-75d8ab4e0270">

## 🛠 STACKS

### ENVIRONMENT & SETTINGS

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1702747832019?alt=media&token=1b3b1010-f636-4448-a9dd-da890a908ddd)](https://github.com/msdio/stackticon)

### FRONTEND

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1702747544032?alt=media&token=7e4b6243-19d9-4731-97cb-71384961c281)](https://github.com/msdio/stackticon)

### BACKEND

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1702747722944?alt=media&token=0fab3191-0462-4ae8-93fb-056a09ab28ef)](https://github.com/msdio/stackticon)

## 📌 주요 기능

> 수업 과제 중 Phase 3에서 JDBC를 통해 구현하였던 내용에 기반하여 기능을 개발하였습니다.

### 1) 회원 정보 관련 기능

- 회원가입 + 로그인 기능

  - 관리자/회원/비회원에 따라 다른 서비스를 제공하기 위한 기능입니다.

- 회원 정보 수정 + 탈퇴
  - 사용자는 본인의 정보를 수정하거나, 계정을 탈퇴할 수 있습니다.

### 2) 도서 정보 수정 관련 기능

- 도서 추가 기능
  - 사용자는 책 검색을 통해 상세 페이지에 접근하여 책을 내 서재에 추가할 수 있습니다.
- 도서 삭제 기능
  - 관리자는 관리 페이지에 접근하여 도서를 삭제할 수 있습니다.

### 3) 도서 검색 관련 기능

- 도서 검색 기능
  - 알라딘 api를 통해 책 검색 기능을 구현 하였습니다.
- 내가 읽은 책 목록 검색 기능
  - DB 쿼리문을 통해 내가 읽은 책들 중에서 검색 조건에 맞춘 결과를 제공합니다.

### 4) 도서 평가 관련 기능

- 한줄평 + 평점
  - 한줄평 및 평점 작성, 수정, 삭제 또는 본인과 타 사용자들의 평가 열람이 가능합니다.
- 독후감
  - 독후감 작성, 수정, 삭제 또는 본인이 작성한 독후감 열람이 가능합니다.

## 사용 흐름

### 메인페이지 - 검색페이지 - 책 상세페이지

- 첫 화면에서 검색어를 입력하고 여러 옵션을 선택하여 도서를 검색합니다.
- 도서를 검색한 뒤 나타나는 목록 중 하나를 선택하면, 해당 도서의 상세 페이지가 나옵니다.
- 상세 페이지에서는 도서 정보와 함께 다른 사람이 작성한 한줄평을 볼 수 있습니다.
- 로그인을 했다면, 상세 페이지에서 도서를 내 서재에 추가한 후 한줄평 혹은 독후감을 작성할 수 있습니다.

### 마이페이지

- 로그인을 했다면, 화면 상단 우측에서 마이페이지에 들어갈 수 있습니다.
- 마이페이지에서는 회원 정보 수정 및 탈퇴 페이지에 접근 가능하고, 내가 서재에 추가한 도서 목록도 볼 수 있습니다.
- 검색어와 옵션에 맞춰서, 도서 목록을 추려낼 수 있습니다.
- 목록에서 도서를 선택하면, 해당 도서의 상세 페이지로 연결됩니다.

### 관리자 페이지

- 로그인 시 ID가 admin 이라면, 마이페이지 대신 관리 페이지가 나옵니다. (id: admin, password: admin)
- 관리 페이지에서는, DB에 추가된 도서를 삭제할 수 있습니다.
