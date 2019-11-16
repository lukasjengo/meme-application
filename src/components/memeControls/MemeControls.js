import React, { useContext, forwardRef } from 'react';
import AppContext from 'context/appContext';

import CustomTextInput from 'components/customTextInput/CustomTextInput';

const MemeControls = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);

  const onClick = e => {
    appContext.generateMeme(ref.current);
  };

  return (
    <div className="meme-controls">
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
    </div>
  );
});

export default MemeControls;
