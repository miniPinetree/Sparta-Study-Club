
# SPARTA Study Club

![image](https://user-images.githubusercontent.com/68773118/115997016-84120280-a61c-11eb-9328-1262936e29a0.png)

### 목차
[1. 프로젝트 설명 ](#프로젝트-설명)<br/>
[2. 사용기술 ](#tools)<br/>
[3. 배운 점 ](#-i-learned)<br/>
[4. 기능정보 ](#-기능정보)<br/>
[5. 진행과정 ](#진행과정)<br/>


## 프로젝트 설명 

### 시현영상 [Youtube](https://www.youtube.com/watch?v=PO9PinZHFJs&t=4s)
```
몰입과 효율 향상을 위한 학습관리 서비스이다. 
사용자는 시간과 목표를 직접 설정할 수 있으며 시간 설정 이후 경과시간을 프로그레스 바로 확인할 수 있다. 
달성률과 매일의 퀘스트 내용은 축적되어 그래프로 시간 활용도의 변화를 알려주고 캘린더를 통해 과거 퀘스트 내역과 달성률을 확인할 수 있다.
```
### 기간/인원
```
(2021.04.09 ~ 2021.04.22) 
Front-end 1인, Back-end 2인으로 구성된 팀에서 프론트엔드를 담당했다. 
```

<br/>


## 🛠 Tools
```
React, Redux(redux-actions, immer,redux-thunk),
chart.js, ws(websocket),
Node.js, AWS(S3, EC2)
API통신 : axios
```
<br/>

## 🔎 I learned 

배운 점

- 문서화의 중요성 : 기획 회의를 여러 차례 진행하여도 사람마다 해석하고 받아들이는 내용이 매번 달랐다. 새로운 서비스를 만들어 내는 것, 새로운 방식을 도입하는 과정에서는 이런 점이 어렵겠구나 싶었다. 구체적인 문서화가 정말 중요할 것 같다.
또한 애매하다 싶은 것을 그냥 넘기지 않고 의견을 나누며 선명하게 만드는 과정이 필요했다. 그 과정에 시간이 걸리더라도 각자 다른 관점과 목표로 개발을 해버린 뒤에 수정 해야하는 것보다는 가야할 방향을 명확히 하여 개발을 하는 것이 더 효율적이기 때문이다.

- 사용자 관점과 보안 이슈 : '아이디 혹은 비밀번호가 틀렸습니다.' 내 경험 상 아이디나 비밀번호 중 무엇이 틀렸는 지 정확히 알려주는 것이 편리했다. 그렇기에 불일치 요소를 구분하여 에러메시지를 띄우자고 했는데 다른 팀원분께서 보안상 취약점을 지적해주셨다. 미처 생각치 못한 관점이었기에 보안 이슈를 항상 함께 고려해야 함을 배우게 되었다.

- REST API : 기능에 맞는 method를 이용하여 RESTful한 API를 설계하고자 했고 method와 URI의 역할을 잘 구분하여 GET/POST/PUT/PATCH/DELETE를 적절히 사용하였고 URI는 명사로만 구성하였다. 또한 팀원들과 회의를 하는 과정에서 REST API 와 Redux를 대체할 수 있는 GraphQL-아폴로 조합을 알게 되었다. 이번 프로젝트에서는 적용하지 못했지만 기회가 나면 꼭 시도해보겠다.

- ws프로토콜을 이용하여 WebSocket을 구현하였다. 이 과정에서 http프로토콜과 비교하며 WebSocket 개념을 이해할 수 있었다.

- 반응형 고려 : 비교적 간단한 프로젝트에서는 %나 vh를 주로 이용해왔지만 이번 프로젝트에서는 원하는 디자인을 구현하기 위해 특정한 px 값을 지정한 부분이 많았다. 후에 반응형으로 수정하려니 대부분의 코드를 수정해야 했다. 코드를 처음 작성할 때부터 반응형을 고려하여 width, height에 특정 px를 입력하는 것을 지양해야함을 느꼈다.

## 🕹 기능정보

### 1. 반응형 WEB
- `view Point`와 `media query`를 이용한 **태블릿/모바일 반응형 구현**

- 이전의 간단한 프로젝트에서는 %나 vh를 이용하는 경우가 많았지만 이번 프로젝트에서는 원하는 디자인을 구현하기 위해 특정 px를 지정한 부분이 많았다. 후에 반응형으로 수정하려니 손이 많이 갔다. 코드를 처음 작성할 때부터 반응형을 고려하여 width, height에 특정 px를 입력하는 것을 지양해야함을 배웠다.

![](https://images.velog.io/images/mygomi/post/e01e20c9-8b3b-4d55-8c09-4b2e7c9b57ff/ezgif.com-gif-maker%20(6).gif)

### 2. JWT토큰을 이용한 회원가입, 로그인 유지 구현
- `axios`로 API 통신 로그인 시 `JWT 토큰`을 발급받고 이를 이용하여 로그인 유지 구현

- JWT토큰을 이용하여 매 통신 시마다 헤더에 토큰을 담아 보내 유효성 검증
- 중복확인 버튼을 인풋 내에 위치시켜 **레이아웃에 통일성**을 주었고 입력 값 형식이 맞는 경우에만 버튼을 활성화시켜 형식 충족 여부를 알렸다.
- 사용자 경험 연속성을 위해 중복확인 시에 완료 **팝업을 띄우는 대신 버튼 문구를 '사용 가능'으로 바꾸어** 사용자에게 안내하였다.
- 로그인 정보 유지 시 보안을 위해 유저정보를 클라이언트 웹 저장소에 저장해두고 싶지 않았고 매번 서버에서 토큰 유효성 검증을 해주기를 제안하였다. 그러나 로그인 체크 뿐 아니라 모든 API 요청 시 Header에 토큰이 담겨 전송되고 있었으므로 최소한의 유저 정보와 토큰 여부로 로그인 유지 처리를 하여도 마이페이지를 렌더링 되는 과정에서 **GET API가 호출되어 거의 동시에 토큰 유효성 검증을 할 수 있었다.**

![](https://images.velog.io/images/mygomi/post/14c04f48-0b32-4c63-a171-6213a2e19b30/ezgif.com-gif-maker%20(5).gif)


### 3. [WebSocket을 이용한 실시간 채팅]
- React-Node.js에서 주로 사용하는 `socket.io`대신 `ws프로토콜`을 이용하여 웹소켓을 활용한 실시간 채팅을 구현하였다.

- chat components에 웹소켓을 연결하니 리렌더링이 될 때마다 새롭게 웹소켓 연결이 이루어지고 사용자가 리렌더링 시마다 증가하는 문제가 발생하였다. 
- 새로 메세지를 보내면 기존 메세지가 사라지며 대체되었다. 채팅창에 메세지가 쌓이지를 않았다. 이 문제를 해결하기 위해 채팅용 redux 모듈을 생성하였다. 
- socket 서버 주소를 별도 파일로 분리하고 redux action을 이용하여 웹소켓을 연결하자 사용자 중복 문제가 해결되었고 메세지도 정상적으로 표시되었다.
### 4. [chart.js를 이용한 과거 학습이력 그래프]
- 데이터 시각화에 관심이 있어 chart.js를 이용하여 그래프 구현을 해보고 싶었다.

- 최대 5일치의 학습시간을 막대 그래프로 나타내고 label과 tooltips에 해당 일자의 목표 달성률을 표시하였다.
- label, data, tooltips의 역할을 이해했으며 chart.js 공식문서를 통해 사용법을 익혔다. 사용법은 직관적이었으나 디자인 요소를 커스터마이징하는데는 제약이 있어 라이브러리에서 주어지는 기본 label은 보이지 않게 처리하고 JSX를 이용해 label을 직접 만들었다. display absolute로 chart와 어우러지게 위치를 조정하였다. 

### 5. [시간 설정 및 시간 경과율 프로그레스바로 표현]
![](https://images.velog.io/images/mygomi/post/d198d357-01d7-4b34-a738-9639782f199d/%EC%8B%9C%EA%B0%84%EC%84%A4%EC%A0%95.gif)

- 목표 시간을 설정하고 경과율을 프로그레스 바로 표현하였다.

- 목표 시간은 하루 중 남은 시간을 초과하는 시간을 선택할 경우 안내 메세지가 뜨도록 처리하였다. (달성률 측정을 마감하는 기준이 필요하므로 밤 12시까지만 이용이 가능하도록 시간 제한을 둔 것이다.)
- 프로그레스 바는 시간 경과율을 너무 자주 계산할 시에 성능 저하를 일으킬 수 있고 변화하는 정도도 미미하므로 **프로그레스 바가 10%씩 이동하도록 사용자가 설정한 시간의 10분의 1의 시간이 흐를 때마다 경과율을 계산하고 프로그레스 바를 변동시키도록 설정**하였다. 

```js
//목표시간과 경과시간 기준 진행률
const Progress = (props) => {
  const user = useSelector((state) => state.user.user);
  const targetTime=user.studySetTime;
  //경과시간 계산
  const calProgress = () => {
    // if (progressTime<targetTime||!progressTime){}
    const _progressTime =
      (new Date().getTime() - user.startTime) / 1000 / 60 / 60;
    let rate = _progressTime/targetTime*100;
    return rate;
  };
  const [progressRate, setRate] = React.useState(calProgress);
  //일정한 주기로 진행률 업데이트
  const checkProgress =setInterval(function(){
    if(calProgress()>=100){
      clearInterval(checkProgress);
      return;
    }else{
        setRate(calProgress);
    }
  },
    //과도한 리렌더링 방지를 위해 목표시간의 10% 변동이 있을 때만 체크하여 반영
    (targetTime * 60 * 60 * 1000) / 10
  );
```


### 6. [퀘스트 설정 및 과거 퀘스트 조회]

![](https://images.velog.io/images/mygomi/post/3f0a3e81-2942-424d-ab6d-5f7f3e18ec5e/ezgif.com-gif-maker%20(6).gif)

- 퀘스트 CRUD를 구현하였다. 퀘스트 내용이 간단하다보니 내용 수정 기능에 큰 의미가 없어 해당 기능을 부여하지는 않았다. 다만 완수 여부를 체크박스로 입력받아 update해주고 있다.

- 퀘스트 내역들은 일별로 관리되어 캘린더에 특정 날짜 클릭 시 해당 날짜의 과거 퀘스트 내역과 완수 여부를 확인할 수 있다. 또한 매일의 달성률에 따라서 캘린더 날짜칸의 색상이 변화된다. 달성률이 높을수록 색이 진해지고 달성률이 0%이거나 퀘스트가 존재하지 않을 때는 회색으로 표시된다.

### 7. [스터디 클럽 기능]

![](https://images.velog.io/images/mygomi/post/b14c38ed-d589-4225-a58e-5127f6b83d67/ezgif.com-gif-maker%20(7).gif)

- 스터디클럽 생성/조회/삭제, 멤버 가입/탈퇴 기능을 구현하였다. 사용자 가입여부에 따라 내가 가입한 클럽과 그 외 나머지 클럽을 구분해서 렌더링해주고 있으며 가입 가능 클럽 수도 동시 4개로 제한하고 있어 이미 가입한 클럽이 4개일 때 가입 또는 생성 버튼을 누르면 안내메세지가 출력된다. 

- 클럽 생성 시 글자 수 제한을 두었고 input Modal창 내에서 실시간으로 글자 수를 체크하여 사용자에게 표시해준다. 
- 클럽 삭제/탈퇴 시에는 사용자의 의사를 다시 한 번 묻는 팝업을 띄우고 .then을 이용하여 사용자가 값을 선택한 후에 요청작업을 수행한다. 
- 전체보기 클럽은 carousel을 적용하여 화살표를 클릭해 다음 클럽 목록을 확인할 수 있다. 반응형으로 제작하여 화면 크기가 줄어듦에 따라 보여지던 클럽의 개수가 5개에서 1개까지로 줄어든다. 

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


