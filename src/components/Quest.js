import React from "react";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import { actionCreators as questActions } from "../redux/modules/quest";
import { Text } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import '../scss/class.scss';
const Quest = (props) => {
  console.log("할일");

 const { quest } = props;
 let checked = quest.questYn;
const dispatch = useDispatch();

const changeChecked = () => {
  checked = checked ? false : true;
  dispatch(questActions.updateQuestDB(quest.questId));
 };
 
 return (
  <React.Fragment>
   <FlexBox>
    <Checkbox color="secondary"
     inputProps={{ 'aria-label': 'secondary checkbox' }}
     onClick={changeChecked} checked={checked}/>
     <Text size="15px">
     {quest.questContents}
       <FontAwesomeIcon icon={faTimes} size='1x' color={'#000'} className="Delete-btn"
         onClick={() => {
           dispatch(questActions.deleteQuestDB(quest.questId));
         }}/></Text>
    </FlexBox>
</React.Fragment>
) 
}

export default Quest;

const FlexBox = styled.div`
 display: flex;

   
 //퀘스트 삭제 시
& .Delete-btn {
  margin: 12px 0px 0px 10px;
  transform: scaleY(0);
  cursor: pointer;
  transition: all .3s;
}

 &:hover .Delete-btn{
   transform: scaleY(1);
  
 }
`

