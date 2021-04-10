import React from "react"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Image } from '../elements';
import Logo from '../images/MypageLogo.png'

const Header = (props) => {
  return (
    <React.Fragment>
      <HeaderBox>
          <Image src={Logo} width="55px" height="30px" margin="10px 0px" cursor/>
          <IconBox>
              <IconInnerBox className='logout'>
                  <FontAwesomeIcon icon={faSignOutAlt} size='2x' color={'white'}/>
              </IconInnerBox>
              <IconInnerBox className='study'>
                  <FontAwesomeIcon icon={faBook} size='2x' color={'white'} />
              </IconInnerBox>
              <IconInnerBox className='mypage pick-page'>
                  <FontAwesomeIcon icon={faUser} size='2x' color={'white'}/>
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
    

`

const IconBox = styled.div`
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap:30px;
    margin:25px 0px;
`

const IconInnerBox = styled.div`
    border-radius: 12px;
    width:50px;
    height: 50px;
    box-sizing: border-box;
    padding-top:7px;
    
    &:hover{
        background-color: #ed5c72;
        border:1px solid #ed5c72;
    }
`