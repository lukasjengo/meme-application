import {
  FETCH_MEMES_REQUEST,
  FETCH_MEMES_SUCCESS,
  FETCH_MEMES_FAILURE,
  GENERATE_MEME_REQUEST,
  GENERATE_MEME_SUCCESS,
  GENERATE_MEME_FAILURE,
  SET_TEXT,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_MEMES_REQUEST:
      return {
        ...state,
        fetchedMemes: {
          ...state.fetchedMemes,
          isLoading: true,
        },
      };
    case FETCH_MEMES_SUCCESS:
      return {
        ...state,
        fetchedMemes: {
          data: action.payload,
          isLoading: false,
        },
      };
    case FETCH_MEMES_FAILURE:
      return {
        ...state,
        fetchedMemes: {
          ...state.fetchedMemes,
          isLoading: false,
        },
      };
    case GENERATE_MEME_REQUEST:
      return {
        ...state,
        generatedMeme: {
          ...state.generatedMeme,
          isLoading: true,
        },
      };
    case GENERATE_MEME_SUCCESS:
      return {
        ...state,
        generatedMeme: {
          data: action.payload,
          isLoading: false,
        },
      };
    case GENERATE_MEME_FAILURE:
      return {
        ...state,
        generatedMeme: {
          ...state.generatedMeme,
          isLoading: false,
        },
      };
    case SET_TEXT:
      return {
        ...state,
        inputText: {
          ...state.inputText,
          [action.payload.textType]: action.payload.text,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
