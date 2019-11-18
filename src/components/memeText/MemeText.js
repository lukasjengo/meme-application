import React from 'react';
import { Rnd } from 'react-rnd';

const MemeText = ({ inputText, currentStyles, positionY, type }) => {
  return (
    <Rnd
      className={`meme__text ${inputText[type].length > 0 && 'visible'}`}
      style={{
        backgroundColor: currentStyles.backgroundColor,
        color: currentStyles.color,
      }}
      default={{
        x: 0,
        y: positionY,
        width: '100%',
      }}
      bounds="parent"
    >
      {inputText[type]}
    </Rnd>
  );
};

export default MemeText;
