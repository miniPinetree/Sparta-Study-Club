import React from "react";
import styled from "styled-components";
import { Grid,Text } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const LastQuest = (props) => {
 
 //useSelector로 리스트 가져와서 돌리기.
 //아래는 더미!
 let questList = [
  {
   questId: 1,
   questContents: '와이어프레임 제작하기',
   questYn: true,
  },
  {
   questId: 2,
   questContents: '메인페이지 완성하기',
   questYn: true,
  },
  {
   questId: 3,
   questContents: 'mockAPI 작업돌리기',
   questYn: false,
  },
 ]

 return (
  <Grid>
    {questList.map((q) => {
     return (
      <QeustBox key={q.questId}>
       <FontAwesomeIcon icon={faCheckSquare} size='1x' color={q.questYn?'#e3344e':'#C1C1C1'} />
       <Text margin='-5px 0px 15px 8px'>자바스크립트 공부하기</Text>
     </QeustBox>
     )
    })}
  </Grid>
 )

}

export default LastQuest;

const QeustBox = styled.div`
 display: flex;
`