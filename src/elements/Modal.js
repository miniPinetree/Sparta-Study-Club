import React from 'react';
import "../scss/modal.scss";
import Text from './Text';
import styled from "styled-components";
const Modal = ( props ) => {
   
    const { open, close, header,rate } = props;

    return (
      
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        <Text>{header[1]}월 {header[2]}일 달성률! <Point>{rate?rate:'0'}%</Point></Text>
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="close" onClick={close}> close </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;

const Point = styled.span`
    color: #e3344e;
`