import React, { useContext, useEffect, forwardRef } from 'react';
import AppContext from 'context/appContext';

import MemeText from 'components/memeText/MemeText';

const Meme = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);
  const { fetchMemes, setCurrentMeme, currentMeme } = appContext;

  useEffect(() => {
    fetchMemes();
    setCurrentMeme('https://i.imgflip.com/24y43o.jpg');
    //eslint-disable-next-line
  }, []);

  return (
    <div className="meme" ref={ref}>
      <img className="meme__image" src={currentMeme} alt="meme" />
      <MemeText positionY={0} type="topText" />
      <MemeText positionY={200} type="bottomText" />
    </div>
  );
});

export default Meme;
