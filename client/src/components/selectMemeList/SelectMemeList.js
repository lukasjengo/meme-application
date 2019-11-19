import React, { useContext } from 'react';
import AppContext from 'context/appContext';

import Spinner from 'components/spinner/Spinner';
import SelectMemeListItem from 'components/selectMemeListItem/SelectMemeListItem';

const SelectMemeList = () => {
  const appContext = useContext(AppContext);
  const { setCurrentMeme, fetchedMemes } = appContext;

  const onClick = e => {
    setCurrentMeme(e.target.src);
  };
  return fetchedMemes.isLoading ? (
    <Spinner />
  ) : (
    <ul className="meme-list">
      {fetchedMemes.data.map((meme, index) =>
        index < 15 ? (
          <SelectMemeListItem
            onClick={onClick}
            key={meme.id}
            url={meme.url}
            name={meme.name}
          />
        ) : null
      )}
    </ul>
  );
};

export default SelectMemeList;
