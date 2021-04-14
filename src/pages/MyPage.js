import React from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as questActions } from "../redux/modules/quest";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import Chart from "../components/Chart";
import "../scss/class.scss";
import moment from 'moment';
import { Calendar, Header, Quest, Chat } from "../components";
import { Image, Text, Grid, Progress } from "../elements";
import Rtan from "../images/rtan.png";
const MyPage = (props) => {
  const dispatch = useDispatch();
  //리덕스 내 데이터가 변경되면 리렌더링된다.
  const user = useSelector((state) => state.user.user);
  const dayQuest = useSelector((state) => state.quest.dayQuest);
  let dayRate = Math.round((dayQuest.filter((q) => q.questYn === true).length / dayQuest.length)*100);
  let chatOnOff = useSelector((state) => state.quest.chat);

  React.useEffect(() => {
    //두개로..
    let date = moment().format('YYYYM');
  //dispatch(questActions.getMonthQuestDB(date));

  }, []);


  //서버연결시 아래 줄 삭제
//  const [ time, selectTime ] = React.useState(user.setTime);

  //회원에게 랜덤으로 보이는 멘트.

  const greeting = () => {
    const ment = [
      "오늘도 달려볼까요?",
      "천리길도 Hello World 부터!",
      "코딩할 준비 되셨죠?",
      "딱 코딩하기 좋은 날씨에요!",
      "어서 시작하러 가봐요!",
    ];
    const idx = Math.floor(Math.random() * ment.length);
    return ment[idx];
  };
//목표 시간 설정 함수
  const setTargetTime = (e) => {
    const btnVal = Number(e.target.innerText.slice(0,1));
    console.log(btnVal);
    //자정이 되기까지 남은 시간 (분까지 반영하기 위해 -1함).
    let remainTime = 24 - new Date().getHours() - 1;
    if(remainTime<btnVal){
      //자정(초기화 기준 시간)을 넘기는 선택지에 알림을 띄운다.
      Swal.fire({
        html: `하루가 ${remainTime}시간밖에 남지 않았어요. 😥<br>
        다른 시간을 선택해주세요.`,
        confirmButtonColor: "#E3344E",
      });

    }else{
      console.log(new Date().getTime(),btnVal);
      dispatch(userActions.setTimeDB(new Date().getTime(),btnVal));
  }
  };

  const addDayQeust = (e) => {
    
    if (e.target.value.length === 0) {
      Swal.fire({
        html: '<br> 내용을 입력해주세요!✏️<br>',
        confirmButtonColor: "#E3344E",
      })
      return false;
    }
    dispatch(questActions.addQuestDB(e.target.value));
    e.target.value = '';
  }


  return (
    <React.Fragment>
      <ContainerBox style={chatOnOff ? { paddingLeft: '230px' } : {}}>
        <Header />
        <Chat chat={chatOnOff}/>
        <ContentBox>
          <ItemBox>
            <Mentbox>
              <Image
                src="data:image/png;base64,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"
                width="40px"
                height="40px"
              />
              <Text size="18px" margin="7px" bold>
                <Point>'{user?.nickname}님'</Point> {greeting()}
              </Text>
            </Mentbox>
            {/* 시간 설정 시 더미표시.
                    <Mentbox>
                        <Image src="data:image/png;base64,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" width="40px" height="40px"/>
                        <div>
                        <Text size="18px" margin="-1px 0px 0px 7px" bold><Point>'{user.nickname}님'</Point> {greeting()}</Text>
                        <Text size="12px" margin="0px 0px 0px 11px">{user.setTime}시간/3시간</Text>
                        </div>
                    </Mentbox> */}
            {user?.setTime ? (
              <ProgressBox>
                <Progress/>
              </ProgressBox>
            ) : (
              <BtnBox>
                <TimeBtn onClick={setTargetTime}>1시간</TimeBtn>
                <TimeBtn onClick={setTargetTime}>2시간</TimeBtn>
                <TimeBtn onClick={setTargetTime}>3시간</TimeBtn>
                <TimeBtn onClick={setTargetTime}>4시간</TimeBtn>
                <TimeBtn onClick={setTargetTime}>5시간</TimeBtn>
                <TimeBtn onClick={setTargetTime}>6시간</TimeBtn>
              </BtnBox>
            )}
            <QuestBox className="questlist">
              <Text bold>
                오늘의 퀘스트! 현재 달성률: <Point>{dayRate?dayRate:0}%</Point>
              </Text>
              <TodoInput placeholder={user?.setTime ? `${user?.nickname}님, 오늘의 목표를 정해주세요:)` :
                "목표 시간을 선택해주세요 !"} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      if (!user.setTime) {
                        Swal.fire({
                          html: '<br>목표 시간을 먼저 선택해주세요!🚩<br>',
                          confirmButtonColor: '#E3344E',
                        })
                      } else {
                        addDayQeust(e);  
                      }
                    }
                  }
                }/>
              {/* 퀘스트 내역에 따라 조건부 렌더링*/ }
              <QuestListBox>
                {dayQuest.length === 0 ? <Text size="15px" margin="80px 0px 0px 0px" color="#BBBBBB">등록된 오늘의 목표가 없습니다!</Text> :
                  dayQuest.map((q) => {
                    return <Quest quest={q} key={q.questId}/>
                  })
                }
              </QuestListBox>
            </QuestBox>
          </ItemBox>
          <ItemBox>
            <Grid margin="0px 0px 35px 0px">
              <Chart />
            </Grid>
            <Grid>
              <QuestBox>
                <Calendar />
              </QuestBox>
              <RtanBox>
                <Image src={Rtan} width="70px" height="70px" />
              </RtanBox>
            </Grid>
          </ItemBox>
        </ContentBox>
      </ContainerBox>
    </React.Fragment>
  );
};
export default MyPage;

const ContainerBox = styled.div`
  box-sizing: border-box;
  width: 100%;

`;

const QuestListBox = styled.div`
  margin-top: 18px;
  max-height: 515px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
  width:17px;
  height: 100vh;
  background: transparent;
  }
 
 &::-webkit-scrollbar-thumb{
  background-color:transparent;
  border-radius: 20px;
  height: 50px;
  background-clip: padding-box;
  border: 4px solid transparent;
  }
`;

const ContentBox = styled.div`
  margin: 100px auto 0px auto;
  width: 900px;
  display: flex;
  gap: 35px;
`;

const ItemBox = styled.div`
  padding: 15px;
`;
const Mentbox = styled.div`
  display: flex;
  font-family: "GmarketSansBold";
`;
const Point = styled.span`
  color: #e3344e;
`;
const BtnBox = styled.div`
  display: flex;
  margin: 20px 0px 25px 0px;
 
  & :first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  & :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const ProgressBox = styled.div`
  margin: 20px 0px 25px 0px;
`;

const TimeBtn = styled.button`
    cursor: pointer;
    padding:10px 18.6px;
    border:1px solid #000;
    font-weight: 800;
    background-color: #000;
    color:#ffffff;
    outline: none;
    font-size:12px;
    &:hover{
        color:#ffd042;
    }
    :disabled{

    }
  
`;

const QuestBox = styled.div`
  width: 425px;
  min-height: 300px;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  &.questlist {
    margin-left: 3px;
  }
`;
const TodoInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #000;
  width: 255px;
  outline: none;
  text-align: center;
  padding: 7px;
  margin-top: 7px;
`;
const RtanBox = styled.div`
  position: relative;
  z-index: 30;
  top: -50px;
  left: 365px;
`;
