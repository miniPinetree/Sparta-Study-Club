import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCookie } from '../shared/Cookie';
//목표시간과 경과시간 기준 진행률
const Progress = (props) => {
  const user = useSelector((state) => state.user.user);
  const targetTime=user.studySetTime;
  //경과시간 계산
  const calProgress = () => {
    // if (progressTime<targetTime||!progressTime){}
    const _progressTime =
      (new Date().getTime() - user.startTime) / 1000 / 60 / 60;
    let rate = _progressTime/targetTime*100;
    return rate;
  };
  const [progressRate, setRate] = React.useState(calProgress);
  //일정한 주기로 진행률 업데이트
  const checkProgress =setInterval(function(){
    if(calProgress()>=100){
      clearInterval(checkProgress);
      return;
    }else{
        setRate(calProgress);
    }
  },
    //과도한 리렌더링 방지를 위해 목표시간의 10% 변동이 있을 때만 체크하여 반영
    (targetTime * 60 * 60 * 1000) / 10
  );
  React.useEffect(() => {
      return checkProgress;
  }, []);

  return (
    <ProgressBar>
      <HighLight
        width={
          progressRate<100? progressRate+"%":"100%"
        }
      />
      <Dot />
    </ProgressBar>
  );
};
Progress.defaultProps = {

};

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
