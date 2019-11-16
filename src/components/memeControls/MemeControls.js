import React, { useContext, forwardRef } from 'react';
import AppContext from 'context/appContext';

import CustomTextInput from 'components/customTextInput/CustomTextInput';
import SelectMemeList from 'components/selectMemeList/SelectMemeList';

const MemeControls = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);

  const onClick = e => {
    appContext.generateMeme(ref.current);
  };

  const onChange = e => {
    if (e.target.files.length === 0) {
      appContext.setCurrentMeme(appContext.fetchedMemes.data[1].url);
    } else {
      appContext.setCurrentMeme(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="meme-controls">
      <SelectMemeList fetchedMemes={appContext.fetchedMemes} />
      <CustomTextInput name="topText" label="Top text" />
      <CustomTextInput name="bottomText" label="Bottom text" />
      <button className="btn" onClick={onClick}>
        {appContext.generatedMeme.isLoading ? 'Loading...' : 'Generate meme'}
      </button>
      {appContext.generatedMeme.data && (
        <a
          className="btn"
          href={appContext.generatedMeme.data}
          alt=""
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download your image
        </a>
      )}
      <label htmlFor="fileUpload" className="btn u-ml-1">
        <input
          id="fileUpload"
          onChange={onChange}
          type="file"
          accept="image/png, image/jpeg"
        />
        Upload your meme
      </label>
    </div>
  );
});

export default MemeControls;
