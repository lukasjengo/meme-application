import React, { useReducer } from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';

import domtoimage from 'dom-to-image';
import uuid from 'uuid';

import dataURItoBlob from 'utils/uriToBlob';

import {
  FETCH_MEMES_REQUEST,
  FETCH_MEMES_SUCCESS,
  FETCH_MEMES_FAILURE,
  GENERATE_MEME_REQUEST,
  GENERATE_MEME_SUCCESS,
  GENERATE_MEME_FAILURE,
  SET_TEXT,
  SET_CURRENT_MEME,
  SET_CURRENT_STYLES,
  SET_ALERT,
  REMOVE_ALERT
} from './types';

const AppState = props => {
  const initialState = {
    fetchedMemes: {
      data: [],
      isLoading: false
    },
    generatedMeme: {
      data: null,
      fileName: null,
      isLoading: false
    },
    currentMeme: null,
    inputText: {
      topText: '',
      bottomText: ''
    },
    currentStyles: {
      backgroundColor: '#000000',
      color: '#ffffff'
    },
    alerts: []
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setAlert = (msg, type) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 5000);
  };

  const fetchMemes = async () => {
    try {
      dispatch({ type: FETCH_MEMES_REQUEST });
      const res = await fetch('https://api.imgflip.com/get_memes');
      const data = await res.json();
      dispatch({ type: FETCH_MEMES_SUCCESS, payload: data.data.memes });
    } catch (err) {
      dispatch({ type: FETCH_MEMES_FAILURE });
      setAlert(err.message, 'danger');
    }
  };

  const generateMeme = async memeNode => {
    try {
      dispatch({ type: GENERATE_MEME_REQUEST });
      const img = await domtoimage.toJpeg(memeNode);
      const blob = dataURItoBlob(img);
      const formData = new FormData();
      formData.append('file', blob);
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/meme`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      dispatch({
        type: GENERATE_MEME_SUCCESS,
        payload: { data: img, fileName: data.filename }
      });
      setAlert('Meme successfully generated', 'success');
    } catch (err) {
      dispatch({ type: GENERATE_MEME_FAILURE });
      setAlert('Something went wrong when generating meme', 'danger');
    }
  };

  const setText = (textType, text) => {
    dispatch({ type: SET_TEXT, payload: { textType, text } });
  };

  const setCurrentMeme = memeUrl => {
    dispatch({ type: SET_CURRENT_MEME, payload: memeUrl });
  };

  const setCurrentStyles = (styleType, value) => {
    dispatch({ type: SET_CURRENT_STYLES, payload: { styleType, value } });
  };

  return (
    <AppContext.Provider
      value={{
        fetchedMemes: state.fetchedMemes,
        generatedMeme: state.generatedMeme,
        inputText: state.inputText,
        currentMeme: state.currentMeme,
        currentStyles: state.currentStyles,
        alerts: state.alerts,
        fetchMemes,
        generateMeme,
        setText,
        setCurrentMeme,
        setCurrentStyles,
        setAlert
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
