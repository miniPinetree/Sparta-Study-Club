import React from "react"
import styled from "styled-components";
import { emailCheck } from "../shared/common";
import {useDispatch, useSelector} from "react-redux";
import { Text, Grid, Input, Button, Image } from "../elements";

const LogIn=(props)=>{

    // const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");
  
    const login = () => {
  //입력 값 정합성 체크 후 login API 요청
      if (id === "" || pwd === "") {
        window.alert("아이디와 비밀번호를 입력해주세요.");
        return;
      }
      if (!emailCheck(id)) {
        window.alert("이메일 형식이 맞지 않습니다.");
      }
    //   dispatch(userActions.loginDB(id, pwd));
    };

    return(
<React.Fragment>
<Container>
      <LoginBox>
        <Grid>
        <Image src="https://spartacodingclub.kr/static/v5/icons/logo_v2_hover.svg"/>
        </Grid>
        <Input border="none" placeholder="이메일을 입력해주세요" _onChange={(e) => {}}/>
        <Input  border="none" placeholder="비밀번호를 입력해주세요" type="password" margin="10px 0px" _onChange={(e) => {}}/>
    
        <Button margin="17px 0px 0px 0px" _onClick={() => { }}>로그인</Button>
        <Button margin="10px" bg="#ffffff" color="#5f0080" _onClick={() => {
        //   history.push('/signup');
        }}>회원가입</Button>
     </LoginBox>
     <Grid>
     <Rtan />
     </Grid>
     </Container>
</React.Fragment>
    );
}
const Container = styled.div`
width:30%;
height:100%;
min-width:450px;
background-color:gray;
margin:auto;
`;

const LoginBox = styled.div`
  width:300px;
  /* max-width:300px; */
  margin: 0px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding:90px 0px 120px 0px;
  
`;

const FindIdPw = styled.ul`
  font-size:13px;
  display: flex;
  gap:5px;
  
  & li:nth-child(1)::after{
    content: '|';
    font-size: 6px;
    font-weight: 600;
    margin-left: 5px;
    position: relative;
    top:-2px;
  }
    
  }
`;

const Rtan = styled.img`
width:200px;
src:"https://spartacodingclub.kr/static/v5/images/imageTan_Q&A.png";
`;

export default LogIn;