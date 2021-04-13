import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

//목표시간과 경과시간 기준 진행률
const Progress = (props) => {
  const user = useSelector((state) => state.user.user);
  const targetTime=user.setTime;
  //경과시간 계산
  const calProgress = () => {
    let _progressTime =
      (new Date().getTime() - user.startTime) / 1000 / 60 / 60;
      console.log("네 하고 있어요~",_progressTime);
      return _progressTime;
  };
  const [progressTime, setTime] = React.useState(calProgress);
  //일정한 주기로 진행률 업데이트
  const checkProgress = setInterval(
    function () {
      console.log("목표시간의 10%마다반영하니?", new Date());
      setTime(calProgress);
    },
    //과도한 리렌더링 방지를 위해 목표시간의 10% 변동이 있을 때만 체크하여 반영
    (targetTime * 60 * 60 * 1000) / 10
  );
  React.useEffect(() => {
    if (progressTime<targetTime) {
      console.log("10분의 1시간 후에 실행해라!",new Date());
      return checkProgress;
    } else {
      console.log("반복종료!");
      return clearInterval(checkProgress);
    }
  }, []);

  return (
    <ProgressBar>
      <HighLight
        width={
          progressTime >= targetTime
            ? 100 + "%"
            : (progressTime / targetTime) * 100 + "%"
        }
      />
      <Dot />
    </ProgressBar>
  );
};
Progress.defaultProps = {};

export default Progress;

const ProgressBar = styled.div`
  background-color: #eee;
  width: 420px;
  margin-left: 2px;
  height: 20px;
  display: flex;
  border-radius: 15px;
  align-items: center;
  border: 2px solid #e3344e;
`;
const HighLight = styled.div`
  background-color: #e3344e;
  height: 20px;
  width: ${(props) => props.width};
  transition: width 1s;
  border-radius: 10px;
`;

const Dot = styled.div`
  background-color: #ffffff;
  border: 3px solid #e3344e;
  border-radius: 100%;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  margin: 0px 0px 0px -12px;
`;
