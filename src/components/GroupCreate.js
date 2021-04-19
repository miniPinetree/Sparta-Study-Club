import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as groupActions} from "../redux/modules/group";
import Swal from "sweetalert2";
import "../scss/modal.scss";
import styled from "styled-components";
import { Grid, Button, Text, Image, Input } from "../elements";
import Community from "../images/Community.png";
import TextField from '@material-ui/core/TextField';


const GroupCreate=(props)=>{
const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);
    const { open, close, header,rate } = props;

    const [name, setName] = React.useState();
    const [desc, setDesc] = React.useState();

    const checkLength=(e, maxlength)=>{
      let inputVal = e.target.value;
      if(inputVal.length>maxlength){
        inputVal = inputVal.substr(0,maxlength)
      }
    }

    const addNewGroup = ()=>{
    if(name.length>8 || desc.length>20){
      Swal.fire({
        text: "입력 가능한 글자 수를 초과하였습니다.",
        confirmButtonColor: "#E3344E",
      });
    }else if(name && desc){
      dispatch(groupActions.addGroupDB(name, desc));
      window.location.reload();
    }
    }

    return (
      
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        <Text>스터디클럽 만들기</Text>
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <Grid is_flex margin="0 10px 0 32px" width="85%" height="120px">
                            <Grid>
                            <Text title bold>원하는 스터디클럽을 </Text>
                            <Text title bold>못 찾으셨나요? </Text>
                            <Text title bold><Point>나만의 클럽</Point>을 만드세요! </Text>
                            </Grid>
                        <Image src={Community} width="220px" height="100%" contain margin="0" />
                        </Grid>
                        <InputBox>
                    <TextField
          id="outlined-textarea"
          label="클럽 이름(8자 이내)"
          multiline
          fullWidth 
          variant="outlined"
          color="secondary"
          onChange={(e)=>{
            setName(e.target.value);
          }}
         
        />
<AlertText>
         {name?.length > 8 ? (
                <Text color="#E2344E" size="11px" margin="0">
                  8자 이내로 입력해주세요.
                </Text>
              ) : name?.length>0 && name?.length<=8? (
                <Text color="#E2344E" size="11px" margin="0">
                  {name?.length}/8
                </Text>)
                : ""
              }
</AlertText>
                        <TextField
          id="outlined-multiline-static"
          label="클럽 소개(20자 이내)"
          multiline
          fullWidth 
          rows={3}
          variant="outlined"
          color="secondary"
          onChange={(e)=>{
            setDesc(e.target.value);
          }}
          

        />
        <AlertText>
        {desc && desc.length > 20 ? (
                <Text color="#E2344E" size="11px" margin="0">
                  20자 이내로 입력해주세요.
                </Text>
              ) : desc?.length>0 && desc?.length<=20? (
                <Text color="#E2344E" size="11px" margin="0">
                  {desc?.length}/20
                </Text>)
                : ""}
              </AlertText>
        </InputBox>
                    </main>
                    <footer>
                    <button className="close" onClick={addNewGroup}> 저장 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}
export default GroupCreate;


const Point = styled.span`
    color: #e3344e;
`

const InputBox = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin:auto;
justify-content:space-around;
width:350px;
height:200px;

`;

const AlertText = styled.div`
width:100%;
display:flex;
justify-content:flex-end;
`;