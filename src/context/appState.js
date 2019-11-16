import React, { useReducer } from 'react';

import AppContext from './appContext';
import AppReducer from './appReducer';

import domtoimage from 'dom-to-image';

import {
  FETCH_MEMES_REQUEST,
  FETCH_MEMES_SUCCESS,
  FETCH_MEMES_FAILURE,
  GENERATE_MEME_REQUEST,
  GENERATE_MEME_SUCCESS,
  GENERATE_MEME_FAILURE,
  SET_TEXT,
} from './types';

const AppState = props => {
  const initialState = {
    fetchedMemes: {
      data: [],
      isLoading: false,
    },
    generatedMeme: {
      data: null,
      isLoading: false,
    },
    inputText: {
      topText: '',
      bottomText: '',
    },
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchMemes = async () => {
    try {
      dispatch({ type: FETCH_MEMES_REQUEST });
      const res = await fetch('https://api.imgflip.com/get_memes');
      const data = await res.json();
      dispatch({ type: FETCH_MEMES_SUCCESS, payload: data.data.memes });
    } catch (err) {
      dispatch({ type: FETCH_MEMES_FAILURE });
      console.error(err);
    }
  };

  const generateMeme = async memeNode => {
    try {
      dispatch({ type: GENERATE_MEME_REQUEST });
      const img = await domtoimage.toJpeg(memeNode);
      dispatch({ type: GENERATE_MEME_SUCCESS, payload: img });
    } catch (err) {
      dispatch({ type: GENERATE_MEME_FAILURE });
      // Display error
      console.error('something whent wrong', err);
    }
  };

  const setText = (textType, text) => {
    dispatch({ type: SET_TEXT, payload: { textType, text } });
  };

  return (
    <AppContext.Provider
      value={{
        fetchedMemes: state.fetchedMemes,
        generatedMeme: state.generatedMeme,
        inputText: state.inputText,
        fetchMemes,
        generateMeme,
        setText,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
