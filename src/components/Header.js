import React from "react"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { Image } from '../elements';
import '../scss/class.scss';
import Logo from '../images/MypageLogo.png'
import { history } from "../redux/configStore";
import { actionCreators as questActions } from "../redux/modules/quest";
import {actionCreators as userActions} from "../redux/modules/user";
import { useDispatch } from "react-redux";



const Header = (props) => {

    const dispatch = useDispatch();
  return (
    <React.Fragment>
          <HeaderBox>
              <IconBox style={{margin:'0px'}} onClick={() => {
                history.push('/mypage')}}>
            <Image src={Logo} width="55px" height="30px" margin="10px auto"/>
             </IconBox>
                <IconBox>
              <IconInnerBox >
                <FontAwesomeIcon icon={faSignOutAlt} size='2x' color={'white'} onClick={()=>{
                  dispatch(userActions.logoutDB());
                }}/>
              </IconInnerBox>
              <IconInnerBox >
                <FontAwesomeIcon icon={faBook} size='2x' color={'white'} onClick={()=>{
                  history.push('/group')
                }}/>
              </IconInnerBox>
              <IconInnerBox >
                <FontAwesomeIcon icon={faComments} size='2x' color={'white'} onClick={() => {
                    dispatch(questActions.onOffChat());
                }}/>
              </IconInnerBox>    
              <IconInnerBox className='pick-page'>
                  <FontAwesomeIcon icon={faUser} size='2x' color={'white'} onClick={()=>{
                  history.push('/mypage')
                }}/>
              </IconInnerBox>
          </IconBox>
      </HeaderBox>
    </React.Fragment>
  )
}

export default Header;

const HeaderBox = styled.div`
    width:65px;
    height: 100vh;
    background-color: #e3344e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top:0;
    left:0;
    z-index:999;
    
    @media all and (max-width:767px)
 {width:45px;
 margin:0px;
 position:fixed;
 top:0px;}
    

`

const IconBox = styled.div`
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap:30px;
    margin:25px 0px;
    @media all and (max-width:767px)
 {width:100%;}
`

const IconInnerBox = styled.div`
    border-radius: 12px;
    width:50px;
    height: 50px;
    box-sizing: border-box;
    padding-top:7px;

    @media all and (max-width:767px)
 {width:100%;}

    &:hover{
        background-color: #ed5c72;
        border:1px solid #ed5c72;
    }
`