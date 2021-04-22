import React from "react";
import axios from "axios";
import styled from "styled-components";
import "../scss/main.scss";
import Swal from "sweetalert2";
import bgImg from "./images/bg.png";
import { Text, Grid, Input, Button, Image } from "../elements";

import { emailCheck } from "../shared/common";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { config } from "../shared/config";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [verified_id, setVerifiedId] = React.useState("");
  const [nick, setNick] = React.useState("");
  const [verified_nick, setVerifiedNick] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [confirm_pwd, setConfirmPwd] = React.useState("");

  //이메일 중복 확인 API
  const verificateId = () => {
    const data = { email: id };
    axios
      .post(`${config.api}/user/email`, data)
      .then((res) => {
        if (res.data.msg === "success") {
          setVerifiedId(id);
        } else {
          Swal.fire({
            text: "이미 가입된 이메일입니다.",
            confirmButtonColor: "#E3344E",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "잠시 후 다시 시도해주세요.",
          confirmButtonColor: "rgb(118, 118, 118)",
        });
      });
  };

  //닉네임 중복확인 API
  const verificateNick = () => {
    const data = { nickname: nick };
    axios
      .post(`${config.api}/user/nickname`, data)
      .then((res) => {
        if (res.data.msg === "success") {
          setVerifiedNick(nick);
        } else {
          Swal.fire({
            text: "이미 가입된 닉네임입니다.",
            confirmButtonColor: "#E3344E",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "잠시 후 다시 시도해주세요.",
          confirmButtonColor: "rgb(118, 118, 118)",
        });
      });
  };

  const signUp = () => {
    if (id !== verified_id) {
      Swal.fire({
        text: "이메일 중복확인이 필요합니다.",
        confirmButtonColor: "#E3344E",
      });
    } else if (nick !== verified_nick) {
      Swal.fire({
        text: "닉네임 중복확인이 필요합니다.",
        confirmButtonColor: "#E3344E",
      });
    } else {
      dispatch(userActions.signupDB(verified_id, confirm_pwd, verified_nick));
    }
  };

  const inputGuide = () => {
    Swal.fire({
      text: "정보를 입력해주세요.",
      confirmButtonColor: "#E3344E",
    });
  };
  return (
    <Container>
      <InRtan>
        <LoginBox>
          <InternalBox>
            <Image
              contain
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
                  _onClick={() => {
                    verificateId(id);
                  }}
                  disabled={!emailCheck(id) ? true : false}
                >
                  {verified_id && verified_id === id ? (
                    <React.Fragment>
                      사용
                      <br />
                      가능
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      중복
                      <br />
                      확인
                    </React.Fragment>
                  )}
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
                  _onClick={verificateNick}
                  disabled={nick.length < 3 ? true : false}
                >
                  {verified_nick && verified_nick === nick ? (
                    <React.Fragment>
                      사용
                      <br />
                      가능
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      중복
                      <br />
                      확인
                    </React.Fragment>
                  )}
                </Button>
              </Grid>
              <Input
                border="none"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                margin="0"
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
              {pwd && pwd.length < 8 ? (
                <Text color="#E2344E" size="11px" margin="0 0 10px 10px">
                  8자 이상 입력해주세요.
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
            {verified_id &&
            verified_nick &&
            id.length > 2 &&
            nick.length > 2 &&
            pwd &&
            pwd === confirm_pwd ? (
              <Button _onClick={signUp}>회원가입</Button>
            ) : (
              <Button
                margin="10px 0 0 0"
                bg="#ffffff"
                color="#E2344E"
                _onClick={inputGuide}
              >
                회원가입
              </Button>
            )}
          </InternalBox>
        </LoginBox>
        <Rtan />
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
  position: relative;
`;
const InRtan = styled.div`
  width: 700px;
  height: 630px;
  position: relative;
  box-sizing: border-box;
  padding: 40px 0 0 0;
  @media all and (max-width:767px)
 { width:100%;
height:90%;
padding:80px 0 0 0;
 }
`;

const LoginBox = styled.div`
  width: 450px;
  height: 550px;
  border-radius: 15px;
  box-shadow: 1px 1px 20px #cfcfcf;
  background-color: #ffffff;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  @media all and (max-width:767px)
 { width:82%;
height:88%;
 }
`;
const InternalBox = styled.div`
  width: 65%;
  height: 77%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media all and (max-width:767px)
 { width:80%;
height:80%;
`;

const Rtan = styled.div`
  background-image: url("https://spartacodingclub.kr/static/v5/images/imageTan_Q&A.png");
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  box-sizing: border-box;
  height: 220px;
  width: 220px;
  position: absolute;
  right: 0;
  bottom: 0;
  @media all and (max-width:767px)
 { width:140px;
height:140px;
right:8px;
  bottom:0px;
 }
`;

export default SignUp;
