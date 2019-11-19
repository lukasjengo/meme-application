import React from 'react';

const SelectMemeListItem = ({ url, name, onClick }) => (
  <li className="meme-list__item" onClick={onClick}>
    <img className="meme-list__img" src={url} alt={name} />
  </li>
);

export default SelectMemeListItem;
