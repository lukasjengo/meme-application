import React, { useContext, useEffect, forwardRef } from 'react';
import AppContext from 'context/appContext';

import MemeText from 'components/memeText/MemeText';

const Meme = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.fetchMemes();
    appContext.setCurrentMeme('https://i.imgflip.com/1ur9b0.jpg');
    //eslint-disable-next-line
  }, []);

  return (
    <div className="meme" ref={ref}>
      <img className="meme__image" src={appContext.currentMeme} alt="meme" />
      <MemeText
        inputText={appContext.inputText}
        currentStyles={appContext.currentStyles}
        positionY={0}
        type="topText"
      />
      <MemeText
        inputText={appContext.inputText}
        currentStyles={appContext.currentStyles}
        positionY={300}
        type="bottomText"
      />
    </div>
  );
});

export default Meme;
