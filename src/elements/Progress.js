import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

//목표시간과 경과시간 기준 진행률
const Progress = (props) => {
const timeInfo = useSelector(state => state.user.user);
let _progressTime = (new Date().getTime() - timeInfo.startTime)/1000/60/60;
let goalTime = timeInfo.setTime;

const [progressTime, setTime] = React.useState(_progressTime);


 return (
  <ProgressBar>
   <HighLight width={(progressTime / goalTime) * 100 + '%'} />
   <Dot/>
  </ProgressBar>
)

}
Progress.defaultProps={

};

export default Progress;

const ProgressBar = styled.div`
 background-color: #eee;
 width:420px;
 margin-left:2px;
 height:20px;
 display: flex;
 border-radius :15px;
 align-items: center;
 border:2px solid #e3344e;
`
const HighLight = styled.div`
 background-color: #e3344e;
 height: 20px;
 width: ${props => props.width};
 transition: width 1s;
 border-radius: 10px;
`

const Dot = styled.div`
 background-color: #ffffff;
 border:3px solid #e3344e;
 border-radius: 100%;
 box-sizing: border-box;
 width:32px;
 height: 32px;
 margin: 0px 0px 0px -12px;
`