import React from "react";
import ReactDOM from "react-dom";
import { Carousel, Radio } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const PositionCarouselDemo = (props) => {
    const {mountNode}=props;
  const [dotPosition, setDotPosition] = React.useState('top');

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <>
      <Carousel dotPosition={dotPosition}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default PositionCarouselDemo;