import React from 'react';
import styled from "styled-components";
const Input = (props) => {
  
  const { placeholder, _onChange,type, width,margin,padding,_onClick } =  props ;

  const styles = {
    width: width,
    margin: margin,
    padding:padding,
  }
  

  return (
    <React.Fragment>
    
      <ElInput {...styles} type={type} placeholder={placeholder} onClick={ _onClick} onChange={_onChange}/>
    
    </React.Fragment>
  )


}


Input.defaultProps = {
  placeholder: '텍스트를 입력해주세요.',
  _onChange: () => { },
  _onClick: () => { },
  type: 'text',
  value: '',
  width: '100%',
  margin: false,
  padding: false,
}

const ElInput = styled.input`
  box-sizing: border-box;
  border:1px solid #ccc;
  border-radius: 3px;
  padding: ${(props)=> props.padding?`${props.padding};`:'19px 19px;'};
  outline: none;
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props)=>props.margin?`margin:${props.margin};`:''}
  &::placeholder{
    color:#CACACA;
    font-weight: 500;
  }
  &:focus{
    border:1px solid #333333;
  }
`
const Label = styled.label`
`


export default Input;