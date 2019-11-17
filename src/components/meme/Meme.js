import React, { useContext, useEffect, forwardRef } from 'react';
import AppContext from 'context/appContext';

const Meme = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.fetchMemes();
    appContext.setCurrentMeme('https://i.imgflip.com/1ur9b0.jpg');
    //eslint-disable-next-line
  }, []);

  return (
    <div className="meme" ref={ref}>
      <img className="meme__image" src={appContext.currentMeme} alt="" />
      <div
        className={`meme__text ${appContext.inputText.topText.length > 0 &&
          'visible'}`}
        style={{
          backgroundColor: appContext.currentStyles.backgroundColor,
          color: appContext.currentStyles.color,
        }}
      >
        {appContext.inputText.topText}
      </div>
      <div
        className={`meme__text ${appContext.inputText.bottomText.length > 0 &&
          'visible'}`}
        style={{
          backgroundColor: appContext.currentStyles.backgroundColor,
          color: appContext.currentStyles.color,
        }}
      >
        {appContext.inputText.bottomText}
      </div>
    </div>
  );
});

export default Meme;
