import React from "react"
import styled from "styled-components";
import '../scss/class.scss';
import { Calendar, Header,Quest } from '../components';
import { Image,Text,Grid } from '../elements';
const MyPage=(props)=>{
    return(
<React.Fragment>
    <Header />
    <ContentBox>
        <ItemBox>
            <Mentbox>            
                <Image src="data:image/png;base64,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" width="40px" height="40px"/>
                <Text size="18px" margin="7px" bold><Point>'미송님'</Point> 오늘도 달려볼까요?</Text>
            </Mentbox>
            <BtnBox>
                <TimeBtn>1시간</TimeBtn>
                <TimeBtn>2시간</TimeBtn>
                <TimeBtn>3시간</TimeBtn>
                <TimeBtn>4시간</TimeBtn>
                <TimeBtn>5시간</TimeBtn>
                <TimeBtn>6시간</TimeBtn>
            </BtnBox>
       
            <QuestBox className="questlist">
                <Text bold>오늘의 퀘스트! 현재 달성률: <Point>60%</Point></Text>                           
                <TodoInput placeholder="미송님, 오늘의 목표를 정해주세요:)" />
                    { /*목표 추가 시 리스트 여기서 map*/}
                <QuestListBox>
                    {/* 목표가 없을 때.. */}
                    {/* <Text size="15px" margin="80px 0px 0px 0px" color="#BBBBBB">등록된 오늘의 목표가 없습니다!</Text> */}
                    <Quest quest="리액트 복습하기"/>
                    <Quest quest="자바스크립트 문법 공부하기"/>
                    <Quest quest="waka-time 알아보기"/>
                </QuestListBox>
            </QuestBox>        
        </ItemBox>        
        <ItemBox>
            <Grid>
                <QuestBox>            
                    <Calendar />
               </QuestBox>             
            </Grid>
            
        </ItemBox>
    </ContentBox>
</React.Fragment>
    );
}
export default MyPage;

const QuestListBox = styled.div`
    
    margin-top: 18px;
`

const ContentBox = styled.div`
    margin: 100px auto;
    width:1000px;
    border:1px solid red;
    display: flex;
    gap:35px;
`

const ItemBox = styled.div`
    border:1px solid blue;
    padding:15px;
`
const Mentbox = styled.div`
    display: flex;
    font-family: "GmarketSansBold";
`
const Point = styled.span`
    color:#e3344e;
`
const BtnBox = styled.div`
    display: flex;
    margin: 20px 0px 25px 0px;
    
    & :first-child{
        border-top-left-radius: 10px;
        border-bottom-left-radius:10px;
    }
    & :last-child{
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`

const TimeBtn = styled.button`
    cursor: pointer;
    padding:10px 17px;
    border:1px solid #000;
    font-weight: 800;
    background-color: #000;
    color:#ffffff;

    &:hover{
        color:#ffd042;
    }
`

const QuestBox = styled.div`
    width:425px;
    min-height: 300px;
    background-color: rgb(255,255,255,0.4);
    border-radius: 10px;
    box-shadow: 0px 1px 8px #dfdbdb;
    text-align:center;
    padding:20px;
    box-sizing:border-box;
    font-size: 17px;   
    &.questlist{
        margin-left:3px;
    }
`
const TodoInput = styled.input`
    background-color: transparent;
    border:none;
    border-bottom:1px solid #000;
    width:255px;
    outline: none;
    text-align: center;
    padding:7px;
    margin-top:7px;
`