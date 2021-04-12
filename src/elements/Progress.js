import React from "react";
import styled from "styled-components";

const Progress = (props) => {
 //더미.. 3시간 기준 1시간
 let time = 60;
 let goalTime = 180;

 return (
  <ProgressBar>
   <HighLight width={(time / goalTime) * 100 + '%'} />
   <Dot/>
  </ProgressBar>
)
}

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