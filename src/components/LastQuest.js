import React from "react";
import styled from "styled-components";
import { Grid,Text } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const LastQuest = (props) => {

  const { questList } = props;
  console.log(questList);

  //지정한 퀘스트 없을 때..
  if (!questList) {
    return (
      <Text>지정한 퀘스트가 없습니다!</Text>
    )
  }

  return (
  <Grid>
    {questList.map((q) => {
     return (
      <QeustBox key={q.questId}>
       <FontAwesomeIcon icon={faCheckSquare} size='1x' color={q.questYn?'#e3344e':'#C1C1C1'} />
         <Text margin='-5px 0px 15px 8px'>{q.questContents}</Text>
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