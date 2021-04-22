import React from "react";
import styled from "styled-components";
import quest, { actionCreators as questActions } from "../redux/modules/quest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch,useSelector } from "react-redux";
import { useState } from 'react';
import {Grid} from '../elements';
import moment from 'moment';
import Daily from './Daily';

const Calendar = (props) => {
  const dispatch = useDispatch();
  const thisMonth = useSelector((state) => state.quest.calendar);
  const today = thisMonth?thisMonth:moment();
 //월의 시작과 끝 주를 계산
 const firstWeek = today.clone().startOf('month').week();
 const lastweek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
//월 이동
  const changeMonth = (move) => {
    if (move === -1) {
       let _date = today.clone().subtract(1, 'month').format('YYYYM');
       dispatch(questActions.getMonthQuestDB(_date,'subtract'));
    }
    if (move === 1) {
      let _date = today.clone().add(1, 'month').format('YYYYM');
      dispatch(questActions.getMonthQuestDB(_date,'add'));
    }
  }

 const calendarArr = () => {
  let result = [];
  let week = firstWeek;
  for (week; week <= lastweek; week++) {
   result = result.concat(
    <CalendarInnerBox key={week}>
     {//캘린더 각 주에 들어가는 날짜
      Array(7).fill(0).map((data,index) => {
      let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
      if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
       return <Daily day={days.format('D')} key={index} date={days.format('YYYY/MM/DD')} point={true}/>
      } else if (days.format('MM') !== today.format('MM')) {
       return <NotThisMonth key={index}/>
      } else {
       return <Daily day={days.format('D')} key={index} date={days.format('YYYY/MM/DD')}/>
      }
     })
     }
    </CalendarInnerBox>
   )
  }
  return result;
 }


 return (
 <React.Fragment>
   <Grid>
    {/*subtract 두번째 인자단위로 빼기. add 더하기*/ }
    <FontAwesomeIcon icon={faChevronCircleLeft} size="1x" className="month-btn"
         onClick={()=>changeMonth(-1)} style={{ cursor: 'pointer' }} />
     <Month>{thisMonth?.format('MMMM YYYY')}</Month>
     <FontAwesomeIcon icon={faChevronCircleRight} size="1x" className="month-btn"
         onClick={()=>changeMonth(1)} style={{ cursor: 'pointer' }} />
   </Grid>
   <CalendarBox>
    <WeekBox>
     <Week className="sun">SUN</Week>
     <Week>MON</Week>
     <Week>TUE</Week>
     <Week>WED</Week>
     <Week>THU</Week>
     <Week>FRI</Week>
     <Week className="sat">SAT</Week>
    </WeekBox>
    <DayBox>
     {calendarArr()}
    </DayBox>
   </CalendarBox>
  </React.Fragment>
 )
}

export default Calendar;

const Month = styled.span`
  font-family: "YESGothic-Bold";
  margin: 0px 15px;
  font-size: 18px;
  font-weight: 600;
  @media all and (max-width:767px){
    font-size: 15px;
 }
`

const CalendarBox = styled.div`
  border:1px solid black;
  margin-top: 15px;
  padding: 5px 0px 0px 0px;
  background-color: #ffffff;
   min-width:285px;
 min-height:320px;
 @media all and (max-width:767px){
  min-width:71px;
  min-height:80px;
 }

`;

const WeekBox = styled.div`
display: grid;
grid-template-columns: repeat(7,1fr);
align-items:center;
@media all and (max-width:767px){
  padding-left:10px;
}
& .sun{
    color:#E3302E;
  }
& .sat{
    color:#24A5CD;
  }
`;
const Week = styled.div`
 font-size: 12px;
 font-weight: 600;
 width:14.2%;
 min-width:40px;
 @media all and (max-width:767px){
  min-width:10px;
  font-size:10px;
 }
`;

const CalendarInnerBox = styled.div`
 display: flex;
 min-width:280px;
 @media all and (max-width:767px){
  min-width:70px;
 }
`;

const DayBox = styled.div`
 display: grid;
 padding:3px 0px 2px 3px;
 box-sizing:border-box;
 min-width:280px;
 min-height:300px;
 grid-row-gap: 0px;
 @media all and (max-width:767px){
  min-width:70px;
  min-height:65px;
 }
`;

const NotThisMonth = styled.div`
 width:14.2%;
 min-width:40px;
 height: 20%;
 min-height:60px;
 @media all and (max-width:767px){
  min-width:10px;
  min-height:25px;
 }
`;