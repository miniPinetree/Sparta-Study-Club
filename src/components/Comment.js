import React from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import { Text, Grid } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Comment=(props)=>{
    const {cmt, user} = props;
    const dispatch = useDispatch();


    return(
        <React.Fragment>
            <Grid is_flex width="100%">
               <UserContent>
            <Text size="11px" center margin="3px 10px 0 10px" title>{user}</Text>
 <Text margin='0 0px 0px 10px' size="12px">
     |　
       {cmt}</Text>
       </UserContent>

       <Grid is_flex width="60px">
       <Text size="10px" center>21-04-18</Text>
       <FontAwesomeIcon icon={faTimes} size='0.5x' color={'#000'} className="Delete-btn"
         onClick={() => {
           
         }}/>
         </Grid>
         </Grid>
        </React.Fragment>
    );
};
export default Comment;

const UserContent = styled.div`
display:flex;
`;