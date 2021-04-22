import styled from 'styled-components';
import React, { useState } from 'react';
import { Modal } from '../elements';
import { LastQuest } from '../components';
import '../scss/class.scss';
import { useSelector } from "react-redux";

const Daily = (props) => {
  const questList = useSelector((state)=> state.quest.monthQuest);
  const today = questList.find((q) => q.day === props.date);
  // 퀘스트 달성률에 따른 색상 변화
  const questRateBg = !today || today?.questRate === 0 ? '#F2F2F2' : today.questRate === 100 ? '#FBCECE' : '#FCE3E3';
  //날짜 형식 일치
    const date = props.date.split('/');
    const date_ = date[2];
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    return (
        <React.Fragment>
        <DayBox onClick={openModal} style={{backgroundColor:questRateBg}}>{ date_}</DayBox>
        <Modal open={modalOpen} close={closeModal} header={date} rate={today?.questRate}>
          <main> 
            <LastQuest questList={today?.quest}/>
          </main>
          </Modal>
        </React.Fragment>
    )
}
export default Daily;

const DayBox = styled.div`
 box-sizing:border-box;
 padding-top:7px;
 width:14.2%;
 min-width:40px;
 min-height:60px;
 height: 20%;
 font-size:12px;
 cursor: pointer;
 font-weight: 600;
 @media all and (max-width:767px){
  min-width:10px;
  min-height:25px;
  padding-top:0;
 }
`

