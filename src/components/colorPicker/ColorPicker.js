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

  const onChangeComplete = color => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    appContext.setCurrentStyles(styleType, rgba);
  };
  return (
    <div>
      <div className="color-picker">
        <span className="color-picker__text">{children}</span>
        <button
          style={{ backgroundColor: appContext.currentStyles[styleType] }}
          className="btn color-picker__btn"
          onClick={onClick}
        ></button>
      </div>
      {displayPicker ? (
        <div className="color-picker__popover">
          <div className="color-picker__cover" onClick={onClose} />
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
