import React from "react";
import styled from "styled-components";

const Image = (props)=>{
    const { contain, src, width, height, margin } = props;

    const styles ={
        src: src,
        width:width,
        height:height,
        margin: margin,
        contain:contain,
       
    }
    return (
        <React.Fragment>
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
       );
    
}

Image.defaultProps = {
    src: "",
    width: "100%",
    margin: "0",
    contain:false,
    };

    const ImageDefault = styled.div`
    top:0;
    width: ${(props)=>props.width};
    ${(props)=>props.height? `height:${props.height}`:""};
    background-image: url("${(props)=>props.src}");
    background-position:center;
    background-repeat:no-repeat;
    box-sizing:border-box;
    background-size: ${(props) => props.contain? "contain":"cover"};
    margin:${(props) => props.margin};
    `

export default Image;