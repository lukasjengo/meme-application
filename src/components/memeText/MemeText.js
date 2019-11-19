import React, { useContext } from 'react';
import AppContext from 'context/appContext';
import { Rnd } from 'react-rnd';

const MemeText = ({ positionY, type }) => {
  const appContext = useContext(AppContext);
  const { currentStyles, inputText } = appContext;

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
