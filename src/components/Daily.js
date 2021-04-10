import styled from 'styled-components';
import React, { useState } from 'react';
import { Modal } from '../elements';
import '../scss/class.scss';
import {Quest } from '../components';
const Daily = (props) => {
 
    //props 전달받은 날짜 쪼개쓰기 
    const date = props.date.split('.');
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
        <DayBox onClick={openModal}>{ date_}</DayBox>
           
      <Modal open={modalOpen} close={closeModal} header={date}>

       <main> 
        
       </main>
      </Modal>
        </React.Fragment>
    )
}

export default Daily;

const DayBox = styled.div`

 box-sizing:border-box;
 padding-top:7px;
 width:54px;
 height: 60px;
 font-size:12px;
 cursor: pointer;
 
&.none {
  background-color: #eeeeee;
}

&.incompletion {
  background-color: #f5e7e7;
}

&.completion {
  background-color: #f5d6d6;
}

`

