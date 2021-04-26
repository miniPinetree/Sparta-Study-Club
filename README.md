

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

몰입과 효율 향상을 위한 학습관리 서비스이다. 
사용자는 시간과 목표를 직접 설정할 수 있으며 시간 설정 이후 경과시간을 프로그레스 바로 확인할 수 있다. 달성률과 매일의 퀘스트 내용은 축적되어 그래프로 시간 활용도의 변화를 알려주고 캘린더를 통해 과거 퀘스트 내역과 달성률을 확인할 수 있다.

### 기간/인원
(2021.04.09 ~ 2021.04.22) 
Front-end 1인, Back-end 2인으로 구성된 팀에서 프론트엔드를 담당했다. 


<br/>



## 🛠 Tools
React, Redux(redux-actions, immer,redux-thunk),
chart.js, ws(websocket),
Node.js, AWS(S3, EC2)
API통신 : axios
<br/>

## 🕹 기능정보 (클릭 시 기능별 포스팅 링크로 이동합니다.)
### 1. [반응형 WEB]
- view Point와 media query를 이용한 태블릿/모바일 반응형 구현

![ezgif com-gif-maker (6)](https://user-images.githubusercontent.com/68773118/116006598-e54ecb80-a646-11eb-92ca-910b21efd02a.gif)


### 2. [JWT토큰을 이용한 회원가입, 로그인 유지 구현]
- axios로 API 통신 로그인 시 JWT 토큰을 발급받고 이를 이용하여 로그인 유지 구현
- JWT토큰을 이용하여 매 통신 시마다 헤더에 토큰을 담아 보내 유효성 검증
- 중복확인 버튼을 인풋 내에 위치시켜 레이아웃에 통일성을 주었고 입력 값 형식이 맞는 경우에만 버튼을 활성화시켜 형식 충족 여부를 알렸다.
- 사용자 경험 연속성을 위해 중복확인 시에 완료 팝업을 띄우는 대신 버튼 문구가 '사용 가능'으로 바뀌도록 했다.

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/68773118/115998188-08ff1b00-a621-11eb-8506-e41e7b9d7806.gif)

### 3. [WebSocket을 이용한 실시간 채팅]

### 4. [chart.js를 이용한 과거 학습이력 그래프]

### 4. [시간 설정 및 시간 경과율 프로그레스바로 표현]

### 5. [퀘스트 설정 및 과거 퀘스트 조회]

### 6. [스터디 클럽 기능]

<br/>

## ⛓ 진행과정
### 협업환경 구축
문서 축적을 notion으로 통일하고 gather를 이용하여 실시간 회의를 진행했다.
1, 2주차에 구현할 기능을 나누어 사용자 개인이 사용할 마이페이지 내의 시간, 목표 설정 기능을 1주차에 구현하고 스터디 클럽과 채팅 기능은 2주차에 구현하고자 했다.
와이어프레임과 API설계도 주차별로 진행했다.
### 1. 와이어프레임
![](https://images.velog.io/images/mygomi/post/1f2283ea-1278-42db-9ae6-bf5e4a0f43b4/%ED%94%8C%EC%A0%9D%20%EC%A0%95%EB%A6%AC%EC%9A%A9%20(1).png)
### 2. API설계
![](https://images.velog.io/images/mygomi/post/b30e21fb-aaee-4f37-930d-fe525ccd5636/image.png)

![](https://images.velog.io/images/mygomi/post/6a1f83b0-eb9f-4402-89de-9ab41fa92d7b/image.png)

![](https://images.velog.io/images/mygomi/post/cbe08cfd-b755-4c5f-a65f-06bcf86c157f/image.png)

![](https://images.velog.io/images/mygomi/post/3157eb4e-74c6-4330-9c34-d0aa1f06bd97/image.png)

<br/>

## 🔎 I learned 
배운 점

- 문서화의 중요성 : 기획 회의를 여러 차례 진행하여도 사람마다 해석하고 받아들이는 내용이 매번 달랐다. 새로운 서비스를 만들어 내는 것, 새로운 방식을 도입하는 과정에서는 이런 점이 어렵겠구나 싶었다. 구체적인 문서화가 정말 중요할 것 같다.
또한 애매하다 싶은 것을 그냥 넘기지 않고 의견을 나누며 선명하게 만드는 과정이 필요했다. 그 과정에 시간이 걸리더라도 각자 다른 관점과 목표로 개발을 해버린 뒤에 수정 해야하는 것보다는 가야할 방향을 명확히 하여 개발을 하는 것이 더 효율적이기 때문이다.

- 사용자 관점과 보안 이슈 : '아이디 혹은 비밀번호가 틀렸습니다.' 내 경험 상 아이디나 비밀번호 중 무엇이 틀렸는 지 정확히 알려주는 것이 편리했다. 그렇기에 불일치 요소를 구분하여 에러메시지를 띄우자고 했는데 다른 팀원분께서 보안상 취약점을 지적해주셨다. 미처 생각치 못한 관점이었기에 보안 이슈를 항상 고려해야 함을 배우게 되었다.

- REST API : 기능에 맞는 method를 이용하여 RESTful한 API를 설계하고자 했고 method와 URI의 역할을 잘 구분하여 URI는 명사로만 구성하였다. 
