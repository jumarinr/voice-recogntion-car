import _ from 'lodash';

import axios from 'axios';

import {
  ACTIONS, FAIL, HEADERS, IN_PROGRESS, SUCCESS,
} from '../constants';

// eslint-disable-next-line new-cap
export const recognition = new window.webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'es-CO';

export const replaceItem = (newItem) => {
  const instaStorage = localStorage.getItem('instrucciones');
  const local = JSON.parse(instaStorage) || [];
  const newList = _.clone(local);
  const index = _.findIndex(newList, { id: newItem.id });

  if (index !== -1) {
    newList[index] = newItem;
  }

  localStorage.setItem('instrucciones', JSON.stringify(newList));
  window.dispatchEvent(new Event('storage'));
};

/**
 * función para procesar la voz
 * @param {String} voice
 */
export const processVoice = (voice) => ACTIONS.reduce((acum, actual) => {
  const isValid = actual.pattern.test(voice);

  if (isValid) {
    return actual;
  }

  return acum;
}, null);

export const handleRecognition = (openMicroValue) => {
  if (openMicroValue) {
    recognition.start();
    return;
  }

  recognition.stop();
};

recognition.onerror = (error) => {
  console.log(error);
};

const sendPetition = async ({ instruccionActual, accion }) => {
  const data = {
    accion,
  };

  try {
    await axios.post('http://192.168.178.77:5000/instruccion', data, HEADERS);

    replaceItem({
      ...instruccionActual,
      status: SUCCESS,
    });
  } catch (error) {
    console.log(error);
    const { message } = error;

    replaceItem({
      ...instruccionActual,
      error: message,
      status: FAIL,
    });
  }
};

recognition.onresult = async (event) => {
  const instruccionActual = {
    text: event.results[0][0].transcript,
    id: Date.now(),
    status: IN_PROGRESS,
  };

  const action = processVoice(instruccionActual.text);

  if (!action) {
    Object.assign(instruccionActual, {
      status: FAIL,
      error: 'La instrucción no fue reconocida. Intente nuevamente',
    });
  }

  const instrucciones = JSON.parse(localStorage.getItem('instrucciones')) || [];
  instrucciones.push(instruccionActual);

  const instruccionesOrdered = _.orderBy(instrucciones, ['id'], ['desc']);
  localStorage.setItem('instrucciones', JSON.stringify(instruccionesOrdered));
  window.dispatchEvent(new Event('storage'));

  if (!instruccionActual.error) {
    await sendPetition({
      instruccionActual,
      accion: action.accion,
    });
  }
};
