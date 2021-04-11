import React from "react";
import styled from "styled-components";
import "../scss/main.scss";
import { emailCheck } from "../shared/common";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Input, Button, Image } from "../elements";
import bgImg from "./images/bg.png";

const SignUp = (props) => {
  // const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [nick, setNick] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [confirm_pwd, setConfirmPwd] = React.useState("");
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
            width="292px"
            height="72px"
            src="https://spartacodingclub.kr/static/v5/icons/logo_v2_hover.svg"
            margin="0 0 10px 0"
          />

          <Grid>
            <Grid is_flex>
              <Input
                radius="5px 0 0 5px"
                margin="0"
                border="none"
                placeholder="이메일을 입력해주세요"
                _onChange={(e) => {
                  setId(e.target.value);
                }}
              />
              <Button
                radius="0 5px 5px 0"
                size="12px"
                width="17%"
                padding=" 3.6px 0"
                height="45px"
                margin="0 0 10px 0"
                bg="#ffffff"
                color="#E2344E"
                _onClick={() => {}}
              >
                중복
                <br />
                확인
              </Button>
            </Grid>
            <Grid is_flex margin="0">
              <Input
                radius="5px 0 0 5px"
                margin="0"
                border="none"
                placeholder="닉네임을 입력해주세요"
                _onChange={(e) => {
                  setNick(e.target.value);
                }}
              />
              <Button
                radius="0 5px 5px 0"
                size="12px"
                width="17%"
                padding=" 3.6px 0"
                height="45px"
                margin="0 0 10px 0"
                bg="#ffffff"
                color="#E2344E"
                _onClick={() => {}}
              >
                중복
                <br />
                확인
              </Button>
            </Grid>
            {nick && nick.length < 3 ? (
              <Text color="#E2344E" size="11px" margin="0 0 10px 10px">
                3자 이상 입력해주세요.
              </Text>
            ) : (
              ""
            )}
            <Input
              border="none"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              margin="0"
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
            {pwd && pwd.length<6 ? (
              <Text color="#E2344E" size="11px" margin="0 0 10px 10px">
                6자 이상 입력해주세요.
              </Text>
            ) : (
              ""
            )}
            <Input
              border="none"
              placeholder="비밀번호를 재확인 해주세요"
              type="password"
              margin="0"
              _onChange={(e) => {
                setConfirmPwd(e.target.value);
              }}
            />
            {confirm_pwd && pwd !== confirm_pwd ? (
              <Text color="#E2344E" size="11px" margin="0 10px">
                비밀번호가 일치하지 않습니다.
              </Text>
            ) : (
              ""
            )}
          </Grid>

          <Grid>
            <Button _onClick={() => {}}>로그인</Button>
            <Button
              margin="10px 0 0 0"
              bg="#ffffff"
              color="#E2344E"
              _onClick={() => {
                //  history.push('/signup');
              }}
            >
              회원가입
            </Button>
          </Grid>
        </InternalBox>
      </LoginBox>
      <Rtan />
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
  position: relative;
`;

const LoginBox = styled.div`
  width: 450px;
  height: 660px;
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
  height: 77%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Rtan = styled.div`
  background-image: url("https://spartacodingclub.kr/static/v5/images/imageTan_Q&A.png");
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  box-sizing: border-box;
  height: 220px;
  width: 650px;
  position: absolute;
  right: 30%;
  bottom: 4%;
  @media screen and (max-width: 1067px) {
  }
`;

export default SignUp;
