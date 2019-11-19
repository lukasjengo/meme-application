import React, { useContext } from 'react';
import AppContext from 'context/appContext';

const CustomTextInput = ({ name, label }) => {
  const appContext = useContext(AppContext);
  const { setText, inputText } = appContext;

  const onChange = e => {
    setText(e.target.name, e.target.value);
  };
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={inputText[name]}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomTextInput;
