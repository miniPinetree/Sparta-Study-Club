import React from 'react';
import styled from 'styled-components'

const Text = (props) => {
  
  const { title, bold, color, size, children, margin,_onClick} = props;
  
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    title:title

  }



  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
    
    )

}

Text.defalutProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '14px',
  margin: false,
  title:false,
  _onClick: () => { },

}


const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};  
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin:${props.margin};` : 'margin:0px')};
  ${(props)=>(props.title)? `font-family: "GmarketSansBold";`:""};
`

export default Text;