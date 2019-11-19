import React, { useContext, forwardRef } from 'react';
import AppContext from 'context/appContext';

import CustomTextInput from 'components/customTextInput/CustomTextInput';
import SelectMemeList from 'components/selectMemeList/SelectMemeList';
import ColorPicker from 'components/colorPicker/ColorPicker';

const MemeControls = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);
  const {
    generateMeme,
    setCurrentMeme,
    fetchedMemes,
    generatedMeme,
  } = appContext;

  const onClick = e => {
    generateMeme(ref.current);
  };

  const onChange = e => {
    if (e.target.files.length === 0) {
      setCurrentMeme(fetchedMemes.data[6].url);
    } else {
      setCurrentMeme(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="meme-controls">
      <SelectMemeList />
      <CustomTextInput name="topText" label="Top text" />
      <CustomTextInput name="bottomText" label="Bottom text" />
      <div className="color-picker-container">
        <ColorPicker styleType="backgroundColor">Background color</ColorPicker>
        <ColorPicker styleType="color">Font color</ColorPicker>
      </div>
      <button className="btn btn--primary" onClick={onClick}>
        {generatedMeme.isLoading ? 'Loading...' : 'Generate meme'}
      </button>
      <label htmlFor="fileUpload" className="btn btn--secondary u-ml-1">
        <input
          id="fileUpload"
          onChange={onChange}
          type="file"
          accept="image/png, image/jpeg"
        />
        Upload your meme
      </label>
      {generatedMeme.data && (
        <a
          className="btn btn--primary u-ml-1"
          href={generatedMeme.data}
          alt=""
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download your image
        </a>
      )}
      {generatedMeme.fileName && (
        <div className="meme-info-container">
          <label htmlFor="">Your meme link:</label>
          <input
            type="text"
            value={`${process.env.REACT_APP_SERVER_URL}/uploads/${generatedMeme.fileName}`}
            readOnly
          />
          <label htmlFor="">Image HTML code:</label>
          <input
            type="text"
            value={`<img src="${process.env.REACT_APP_SERVER_URL}/uploads/${generatedMeme.fileName}"/>`}
            readOnly
          />
        </div>
      )}
    </div>
  );
});

export default MemeControls;
