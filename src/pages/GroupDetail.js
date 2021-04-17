import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Grid, Button, Text, Image } from "../elements";
import { Header, Chat } from "../components";
import Runtan from "../images/runtan.gif";
import Jump from "../images/jump.png";
import Cheer from "../images/cheer.png";
import Fire from "../images/fire.png";
import Dino from "../images/dino_kill.png";
import Trophy from "../images/trophy.png";
import Spinner from "../shared/Spinner";
import Quest from "../components/Quest";
import Comment from "../components/Comment";
import moment from 'moment';

const GroupDetail = (props) => {
  const chatOnOff = useSelector((state) => state.quest.chat);
  const loading = useSelector((state) => state.quest.isLoading);

  return (
    <React.Fragment>
      <ContainerBox style={chatOnOff ? { paddingLeft: "230px" } : {}}>
        <Header />
        <Chat chat={chatOnOff} />
        {loading ? (
          <Spinner />
        ) : (
          <ContentBox>
            <ListBox>
              {/* 버튼 스타일
              <GroupBox className="questlist">
              <TextBox>
                <Text size="15px" bold>
                  그룹이름
                </Text>
                <Text size="12px" margin="1px 3px 0px 0">
                  여기는 파이썬으로 알고리즘을 푸는 방이예요(30자 제한)
                </Text>
                </TextBox>
                <Button size="11px" width="38px" radius="0 10px 10px 0 ">></Button>
              </GroupBox> */}
              <BoxTitle>
                <Image src={Runtan} width="50px" height="50px" contain />
                
              </BoxTitle>
              <GroupBox>
                <Text bold margin="0 0 10px 0">
                알고보면 알기쉬운 알고리즘
                </Text>
                <Text size="14px">
               💪 네카라쿠배 코테 대비반 🏋️‍♂️
                </Text>
                <TodoInput
                  placeholder={`미송님! 각오 한 마디 남겨주세요!`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                    }
                  }}
                />
              </GroupBox>
              <CmtList>
                  <Comment user={"알고왕"} cmt={"🔥🔥 알고리즘 갖고말겠어"} />
                  <Comment user={"해시브라운"} cmt={"1일 1알고리즘이 목표예요"} />
                  <Comment user={"삐약이"} cmt={"오늘 가입했어요 잘 부탁드려욧!"} />
                  <Comment user={"우따따"} cmt={"저 오늘 백준 골드 티어 됐어요 🤩 축하해주세요"} />
                </CmtList>
            </ListBox>

            <RankList>
              <BoxTitle>명예의 전당</BoxTitle>
              <Grid>
                <Rank className="first">
                  <Image src={Trophy} width="27px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Jump} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Jump} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Fire} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Fire} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
              </Grid>
              <Image src={Dino} width="220px" height="80px" margin="30px 0 0 0" contain />
            </RankList>
          </ContentBox>
        )}
      </ContainerBox>
    </React.Fragment>
  );
};
export default GroupDetail;

const ContainerBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  margin: 60px auto 0px auto;
  padding: 0px 100px 0 130px;
  width: 85%;

  gap: 35px;
  display: flex;
  justify-content: center;
`;
const BoxTitle = styled.div`
  color: #e3344e;
  font-size: 24px;
  font-family: "GmarketSansBold";
  letter-spacing: 1.2px;
  position: absolute;
  top: -23px;
  display: flex;
`;
const ListBox = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 30px;
  
  & :last-child {
    margin: 0px;
  }
  position: relative;
`;

const GroupBox = styled.div`
  width: 400px;
  height: 140px;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  align-items: center;
  padding: 15px 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 20px;
  justify-content:space-between;
  display:flex;
  flex-direction:column;
`;

const RankList = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 30px;
  position: relative;
  justify-content: space-between;
`;

const Rank = styled.div`
margin: 13px auto 0 auto;
width:210px;
height:48px;
box-sizing:border-box;
background-color: ${(props) => (props.className ? "#FCE3E3;" : "#ffffff;")}
    padding: 4px 23px;
    border-radius: 103px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    white-space: pre-line;

`;
const Point = styled.span`
  color: #e3344e;
`;

const CmtList = styled.div`
  margin-top: 18px;
  max-height: 515px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 17px;
    height: 100vh;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
    height: 50px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

const TodoInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid #e3344e;
  width: 240px;
  outline: none;
  text-align: center;
  padding: 7px;
  margin-top: 7px;
`;
