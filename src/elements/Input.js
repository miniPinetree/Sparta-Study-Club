import React, {forwardRef} from 'react';
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = forwardRef((props, ref) => {
  
  const { multiLine, label, bg, border, radius, placeholder, _onChange,type, width,margin,padding,_onClick } =  props ;
  const styles = {
    width: width,
    margin: margin,
    padding:padding,
    border:border,
    radius:radius,
    bg: bg,
    multiLine:multiLine,

  }
  

  return (
     <Grid is_flex margin="0 0 10px 0">
      {label && <Text margin="0px" bold>{label}</Text>}
      <ElInput ref={ref} {...styles} type={type} placeholder={placeholder} onClick={ _onClick} onChange={_onChange}/>
      </Grid>

  );


});


Input.defaultProps = {
  placeholder: '텍스트를 입력해주세요.',
  _onChange: () => { },
  _onClick: () => { },
  type: 'text',
  value: '',
  width: '100%',
  margin: false,
  padding: false,
  bg: '#F4F4F4',
  radius:"5px",
}

const ElInput = styled.input`
height:45px;
border-radius:${(props) => props.radius};
  box-sizing: border-box;
  padding: ${(props)=> props.padding?`${props.padding};`:'19px 19px;'};
  outline: none;
  width: ${(props) => props.width};
  box-sizing: border-box;
  background-color: ${(props) => props.bg};
  ${(props)=>props.margin?`margin:${props.margin};`:''}
  ${(props)=>props.border?`border:${props.border};`:''}
  ${(props)=>props.radius?`border-radius:${props.radius};`:''}
  &::placeholder{
    color:#CACACA;
    font-weight: 500;
  }
  &:focus{
    border:1px solid #333333;
  }
`
const Label = styled.label`
`;


export default Input;