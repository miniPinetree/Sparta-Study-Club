

# SPARTA Study Club

![image](https://user-images.githubusercontent.com/68773118/115997016-84120280-a61c-11eb-9328-1262936e29a0.png)

### 목차
[1. 프로젝트 설명 ](#프로젝트-설명)<br/>
[2. 사용기술 ](#tools)<br/>
[3. 기능정보 ](#-기능정보-클릭-시-기능별-포스팅-링크로-이동합니다)<br/>
[4. 진행과정 ](#진행과정)<br/>
[5. 배운 점 ](#-i-learned)<br/>


## 프로젝트 설명 

### 시현영상 [Youtube](https://www.youtube.com/watch?v=PO9PinZHFJs&t=4s)

몰입과 효율 향상을 위한 학습관리 서비스입니다. 
사용자는 시간과 목표를 직접 설정할 수 있으며 시간 설정 이후 경과시간을 프로그레스 바로 확인할 수 있습니다. 달성률과 매일의 퀘스트 내용은 축적되어 그래프로 시간 활용도의 변화를 알려주고 캘린더를 통해 과거 퀘스트 내역과 달성률을 확인할 수 있습니다.

### 기간/인원
(2021.04.09 ~ 2021.04.22) 
Front-end 1인, Back-end 2인
저는 프론트엔드를 담당했습니다. 


<br/>



## 🛠 Tools
React, Redux,
chart.js, ws(websocket),
Node.js, AWS(S3, EC2)

## 🕹 기능정보 (클릭 시 기능별 포스팅 링크로 이동합니다.)
### 1. [반응형 WEB]()
- view Point와 media query를 이용한 태블릿/모바일 반응형 구현

![플젝 정리용 (1)](https://user-images.githubusercontent.com/68773118/115997774-58444c00-a61f-11eb-95cc-76e29ebb12e6.gif)

### 2. [JWT토큰을 이용한 회원가입, 로그인 유지 구현]()
- axios로 API 통신

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/68773118/115998188-08ff1b00-a621-11eb-8506-e41e7b9d7806.gif)

### 3. [WebSocket을 이용한 실시간 채팅]()

### 4. [시간 설정 및 시간 경과율 프로그레스바로 표현]()


### 5. [퀘스트 설정 및 과거 퀘스트 조회]()

### 6. [스터디 클럽 기능]

---

## 진행과정
### 협업환경 구축
- notion을 이용하여 진행현황과 요청사항을 공유할 수 있도록 했습니다.
- gather, slack을 적절히 혼용하여 실시간 회의를 진행했습니다.

![](https://images.velog.io/images/mygomi/post/7f26afec-e3ab-4e7e-b2e4-c736d7253276/2.png)
<br>
#### API 설계 
이번 프로젝트를 통해 <span style="color:#FF7948">API설계의 중요성</span>을 실감할 수 있었습니다.
API 설계 필요성에 대한 인식 부족과 미흡한 설계로 프로젝트 진행 도중, 후반부에 오류가 몇 차례 발생하였고 프론트-백이 실시간으로 코드 에러를 해결해나가며 API설계를 수정하는 일이 있었기 때문입니다. 
request, response data형태를 사전에 잘 설계하여야 하고 협의된 내용을 반드시 지켜야 함을 (또는 수정하더라도 반드시 사전협의와 소통이 필요하다는 것을) 알게 되었습니다.  

![](https://images.velog.io/images/mygomi/post/ece67f36-fd84-4edd-83f6-dfa807194e08/image.png)

<br>

#### View 분석
다른 팀원이 github에 공유 레포지토리를 생성하는 동안 View를 분석하여 <span style="color:#FF7948">Figma를 이용해 팀원간 공유할 수 있는 자료</span>를 만들었습니다. 
Figma는 디자인 툴이긴 하나 현업에서 디자이너와 협업 시에 접하게 될 수도 있겠다는 생각에 간단하게나마 직접 사용해보고자 했습니다.  
**협업하는 이가 어떤 일을 어떻게 하는 지 관심을 가지는 것도 중요하다고 생각하기 때문입니다.**

View를 분석할 때는 눈에 보이는 디자인을 기준으로 <span style="color:#FF7948">컴포넌트를 어떻게 세분화 시킬 지</span> 고민하며 분석했습니다.  
프로젝트를 진행하며 **데이터를 효율적으로 관리할 수 있도록 데이터의 흐름도 고려하여 컴포넌트를 설계해야 함을 깨달았습니다.**  

![](https://images.velog.io/images/mygomi/post/90c4df29-2462-4a7a-b43e-a38ea46b26ea/image.png)

## 🔎 I learned 
아래 N가지 주제에 대해 생각해볼 수 있는 기회였습니다.
1. 
