import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Grid, Button, Text, Image } from "../elements";
import { Header, Chat } from "../components";
import Rtan from "../images/rtan.png";
import Spinner from "../shared/Spinner";
import "../scss/class.scss";

const GroupList = (props) => {
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
              <ItemBox>
            <QuestBox className="questlist">
              <Text bold>
                오늘의 퀘스트! 현재 달성률: <Point>%</Point>
              </Text>
              <TodoInput
                placeholder={"목표 시간을 선택해주세요 !"}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    Swal.fire({
                      html: "<br>목표 시간을 먼저 선택해주세요!🚩<br>",
                      confirmButtonColor: "#E3344E",
                    });
                  }
                }}
              />
              {/* 퀘스트 내역에 따라 조건부 렌더링*/}
              <QuestListBox>
                <Text size="15px" margin="80px 0px 0px 0px" color="#BBBBBB">
                  등록된 오늘의 목표가 없습니다!
                </Text>
              </QuestListBox>
            </QuestBox>
            </ItemBox>

            <ItemBox>
              <Grid margin="0px 0px 35px 0px"></Grid>
              <Grid>
                <QuestBox></QuestBox>
                <RtanBox>
                  <Image src={Rtan} width="70px" height="70px" />
                </RtanBox>
              </Grid>
            </ItemBox>
          </ContentBox>
        )}
      </ContainerBox>
    </React.Fragment>
  );
};
export default GroupList;

const ContainerBox = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const QuestListBox = styled.div`
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

const ContentBox = styled.div`
  margin: 100px auto 0px auto;
  width: 900px;
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
  padding: 10px 18.6px;
  border: 1px solid #000;
  font-weight: 800;
  background-color: #000;
  color: #ffffff;
  outline: none;
  font-size: 12px;
  &:hover {
    color: #ffd042;
  }
  :disabled {
  }
`;

const QuestBox = styled.div`
  width: 425px;
  min-height: 200px;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  
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
