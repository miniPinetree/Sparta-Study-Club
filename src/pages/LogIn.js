import React from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import '../scss/main.scss';
import bgImg from "./images/bg.png";
import {history} from "../redux/configStore";
import { Text, Grid, Input, Button, Image } from "../elements";

import { emailCheck } from "../shared/common";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

const LogIn = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  //로그인 API 호출
  const login = () => {
    if (id === "" || pwd === "") {
      Swal.fire({
        text: "정보를 입력해주세요.",
        confirmButtonColor: "#E3344E",
      })
      return;
    }
    else if (!emailCheck(id)) {
      Swal.fire({
        text: "올바른 이메일 형식이 아닙니다.",
        confirmButtonColor: "#E3344E",
      })
      return;
    }else{
      dispatch(userActions.loginDB(id, pwd));
    }
  };

  React.useEffect(()=>{

  },[])

  return (

      <Container>
       <InRtan>
        <LoginBox>
          <InternalBox>
            <Image
            contain="true"
            height="20%"
              
              src="https://spartacodingclub.kr/static/v5/icons/logo_v2_hover.svg"
            />

            <Grid>
              <Input
              margin="15px 0 0 0"
                border="none"
                placeholder="이메일을 입력해주세요"
                _onChange={(e) => {
                  setId(e.target.value)
                }}
              />
                
              <Input
                border="none"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                _onChange={(e) => {
                  setPwd(e.target.value)
                }}
              />
               {pwd && pwd.length < 8 ? (
              <Text color="#E2344E" size="11px" margin="0 10px">
                8자 이상 입력해주세요.
              </Text>
            ) : (
              ""
            )}
            </Grid>
           
            <Grid>
              <Button _onClick={login}>로그인</Button>
              <Button
                margin="10px 0 0 0"
                bg="#ffffff"
                color="#E2344E"
                _onClick={() => {
                    props.history.push('/signup');
                }}
              >
                회원가입
              </Button>
            </Grid>
          </InternalBox>
         
        </LoginBox>
        <Rtan/>
        </InRtan>
      </Container>

  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-image: url("${bgImg}");
  justify-content: center;
  align-items: center;
  display: flex;
  position:relative;
  font-family: "Spoqa Han Sans";
`;
const InRtan = styled.div`
width:700px;
height:630px;
position:relative;
box-sizing:border-box;
padding:40px 0 0 0;
@media all and (max-width:767px)
 { width:100%;
height:90%;
padding:80px 0 0 0;
 }
`;
const LoginBox = styled.div`
width:450px;
height:550px;
  border-radius: 15px;
  box-shadow: 1px 1px 20px #cfcfcf;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  @media all and (max-width:767px)
 { width:82%;
height:80%;
 }
`;
const InternalBox = styled.div`
  width: 65%;
  height: 73%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media all and (max-width:767px)
 { width:80%;
height:80%;
 }
`;

const Rtan = styled.div`
 background-image: url("https://spartacodingclub.kr/static/v5/images/imageTan_Q&A.png");
    background-position:center;
    background-size:contain;
    background-repeat:no-repeat;
    box-sizing:border-box;
  height:220px;
  width:220px;
  position:absolute;
  right:0;
  bottom:0;
  @media all and (max-width:767px)
 { width:140px;
height:140px;
right:10px;
  bottom:37px;
 }
`;

export default LogIn;
