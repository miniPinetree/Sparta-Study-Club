import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = (props) => {
  return (
    
    <Outter>
      <FontAwesomeIcon icon={faSpinner} size="3x" color={'#e3344e'} spin={true}/>
    </Outter>
  )

}

export default Spinner;

const Outter = styled.div`
  position: fixed;
  top:0;
  left:0;
  width:100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;`