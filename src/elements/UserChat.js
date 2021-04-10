import React from "react"
import styled from "styled-components";
import { Grid, Text} from './';
const UserChat = (props) => {
 //사용자 채팅
 return (
  <Grid padding='5px 15px 0px 15px'>
   <Grid is_flex>
    <Text bold color='#e3344e'>😊 영은</Text>
    <Text size='12px' color='#434141'>10:52 PM</Text>
   </Grid>
   <Text size='15px' color='#434141' margin='4px 0px 10px 7px'>채팅방!</Text>
  </Grid>
 
  )

}

export default UserChat;