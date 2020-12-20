import {
  SELECT_KEY_INDEX,
  SELECT_CAPO,
  OPEN_CHORDS_MODAL,
  CLOSE_CHORDS_MODAL,
} from './types';

export const selectKeyIndex = (payload) => ({type: SELECT_KEY_INDEX, payload});

export const selectCapo = (payload) => ({type: SELECT_CAPO, payload});

export const openChordsModal = () => {
  console.log('Chords Modal Button clicked');
  return {
    type: OPEN_CHORDS_MODAL,
    payload: true,
  };
};

export const closeChordsModal = () => ({
  type: CLOSE_CHORDS_MODAL,
  payload: false,
});
