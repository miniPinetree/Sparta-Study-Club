import React from "react";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import { Text } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import '../scss/class.scss';
const Quest = (props) => {
 const [checked, setChecked] = React.useState(true);
 const { quest} = props;
 const handleChange = (event) => {
    setChecked(event.target.checked);
 };
 

 return (
  <React.Fragment>
      <FlexBox>
    <Checkbox color="secondary"
     inputProps={{ 'aria-label': 'secondary checkbox' }}
     onClick={handleChange}/>
     <Text margin='9px 0px 0px 0px' size="15px">
     {quest}  
     </Text>
     <FontAwesomeIcon icon={faTimes} size='1x' color={'#000'} className="Delete-btn"/>
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

