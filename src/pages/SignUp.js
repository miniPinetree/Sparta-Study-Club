import React from "react"
import styled from "styled-components";
import { emailCheck } from "../shared/common";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Input, Button, Image } from "../elements";
import bgImg from "./images/bg.png";

const SignUp=(props)=>{
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
 
   return (
 
       <Container>
        
         <LoginBox>
           <InternalBox>
             <Image
               height="18%"
               src="https://spartacodingclub.kr/static/v5/icons/logo_v2_hover.svg"
             />
 
             <Grid>
               <Input
               label="이메일"
               margin="15px 0 0 0"
                 border="none"
                 placeholder="이메일을 입력해주세요"
                 _onChange={(e) => {}}
               />
                <Input
                label="닉네임"
                 border="none"
                 placeholder="닉네임을 입력해주세요"
                 type="password"
                 margin="2px 0px"
                 _onChange={(e) => {}}
               />
               <Input
                label="비밀번호"
                 border="none"
                 placeholder="비밀번호를 입력해주세요"
                 type="password"
                 margin="2px 0px"
                 _onChange={(e) => {}}
               />
               <Input
                 border="none"
                 placeholder="비밀번호를 재확인 해주세요"
                 type="password"
                 margin="2px 0px"
                 _onChange={(e) => {}}
               />
             </Grid>
             <Grid>
               <Button _onClick={() => {}}>로그인</Button>
               <Button
                 margin="10px 0 0 0"
                 bg="#ffffff"
                 color="#E2344E"
                 _onClick={() => {
                   //   history.push('/signup');
                 }}
               >
                 회원가입
               </Button>
             </Grid>
           </InternalBox>
          
         </LoginBox>
         <Rtan/>
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
 `;
 
 const LoginBox = styled.div`
 width:35%;
 height:90%;
 min-width:346px;
 min-height:550px;
   max-width: 450px;
   max-height: 800px;
   border-radius: 15px;
   box-shadow: 1px 1px 20px #cfcfcf;
   background-color: #ffffff;
   margin: 0px auto;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   margin: auto;
 `;
 const InternalBox = styled.div`
   width: 65%;
   height: 73%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
 `;
 
 const Rtan = styled.div`
  background-image: url("https://spartacodingclub.kr/static/v5/images/imageTan_Q&A.png");
     background-position:center;
     background-size:contain;
     background-repeat:no-repeat;
     box-sizing:border-box;
   height:220px;
   width:220px;
   position:relative;
   bottom:-28%;
   left:-34%;
   @media screen and (max-width: 1067px) {
    width:20%;
    position:fixed;
 }
 `;

export default SignUp;