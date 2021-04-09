import React from "react";
import styled from "styled-components";

const Image = (props)=>{
    const { src, width, height, margin } = props;

    const styles ={
        src: src,
        width:width,
        height:height,
        margin:margin,
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
    margin:"0",
    };

    const ImageDefault = styled.div`
    top:0;
    width: ${(props)=>props.width};
    ${(props)=>props.height? `height:${props.height}`:""};
    background-image: url("${(props)=>props.src}");
    background-size:cover;
    background-position:center;
    box-sizing:border-box;
    margin:${(props)=>props.margin};
    `;

export default Image;