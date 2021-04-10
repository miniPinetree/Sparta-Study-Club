import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import {Grid,Text} from '../elements';
import moment from 'moment';
import { useState } from 'react';

const Calendar = (props) => {
 
 const [getMoment, setMoment] = useState(moment());
 const today = getMoment;
 //오늘이 들어간 시작하는 이번달 주가 1년중에서 몇번째 주인지.
 const firstWeek = today.clone().startOf('month').week();
 //끝나는 주가 1이면 53주로. 아니라면 이번달 끝나는 주로 바로 사용.
 const lastweek = today.clone().endOf('month').week() === 1? 53 : today.clone().endOf('month').week();

 return (
 <React.Fragment>
   <Grid>
    {/*subtract 두번째 인자단위로 빼기. add 더하기*/ }
    <FontAwesomeIcon icon={faChevronCircleLeft} size="1x" className="month-btn"
     onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')) }} style={{cursor:'pointer'}}/>
     <Month>{today.format('MMMM YYYY')}</Month>
     <FontAwesomeIcon icon={faChevronCircleRight} size="1x" className="month-btn"
     onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} style={{cursor:'pointer'}}/>
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
   </CalendarBox>
  </React.Fragment>
 )
}

export default Calendar;

const Month = styled.span`
  font-family: "YESGothic-Bold";
  margin: 0px 15px;
  font-size: 18px;
`

const CalendarBox = styled.div`
  border:1px solid black;
  margin-top: 15px;
  padding: 5px 0px 5px 0px;
`;

const WeekBox = styled.div`
display: grid;
grid-template-columns: repeat(7,1fr);
align-items:center;

& .sun{
    color:#E3302E;
  }
& .sat{
    color:#24A5CD;
  }
`

const Week = styled.div`
 font-size: 12px;
 font-weight: 600;
`