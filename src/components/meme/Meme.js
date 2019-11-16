import React, { useContext, useEffect, forwardRef, Fragment } from 'react';
import AppContext from 'context/appContext';

import Spinner from 'components/spinner/Spinner';

const Meme = forwardRef((props, ref) => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.fetchMemes();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="meme" ref={ref}>
      {appContext.fetchedMemes.isLoading ||
      appContext.fetchedMemes.data.length < 1 ? (
        <Spinner />
      ) : (
        <Fragment>
          <img
            className="meme__image"
            src={appContext.fetchedMemes.data[1].url}
            alt=""
          />
          <div
            className={`meme__text ${appContext.inputText.topText.length > 0 &&
              'visible'}`}
          >
            {appContext.inputText.topText}
          </div>
          <div
            className={`meme__text ${appContext.inputText.bottomText.length >
              0 && 'visible'}`}
          >
            {appContext.inputText.bottomText}
          </div>
        </Fragment>
      )}
    </div>
  );
});

export default Meme;
