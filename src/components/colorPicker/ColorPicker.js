import React, { useState, useContext } from 'react';
import AppContext from 'context/appContext';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ styleType, children }) => {
  const appContext = useContext(AppContext);

  const [displayPicker, setDisplayPicker] = useState(false);

  const onClick = () => {
    setDisplayPicker(!displayPicker);
  };

  const onClose = () => {
    setDisplayPicker(false);
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  const onChangeComplete = color => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    appContext.setCurrentStyles(styleType, rgba);
  };
  return (
    <div>
      <button className="btn" onClick={onClick}>
        {children}
      </button>
      {displayPicker ? (
        <div style={popover}>
          <div style={cover} onClick={onClose} />
          <ChromePicker
            color={appContext.currentStyles[styleType]}
            onChangeComplete={onChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
