import React from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import { actionCreators as cmtActions } from "../redux/modules/comment";
import { Text, Grid } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Comment=(props)=>{
    const {cmt} = props;
 

    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user.user);

    return(
        <React.Fragment>
            <Grid is_flex width="100%">
               <UserContent>
            <Text size="11px" center margin="3px 10px 0 10px" title>{cmt.nickname}</Text>
 <Text margin='0 0px 0px 10px' size="12px">
     |　
       {cmt.cmtContents}</Text>
       </UserContent>

       <Grid is_flex width="60px">
       <Text size="10px" center>{cmt.createdDt.slice(2,10)}</Text>
       {user.nickname===cmt.nickname?
        <FontAwesomeIcon icon={faTimes} size='0.3x' color={'#000'} className="Delete-btn"
        onClick={() => {
          dispatch(cmtActions.deleteCmtDB(cmt.cmtId));
        }}/>
        :
        null
       }
      
         </Grid>
         </Grid>
        </React.Fragment>
    );
};
export default Comment;

const UserContent = styled.div`
display:flex;
`;