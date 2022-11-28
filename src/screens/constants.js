export const IN_PROGRESS = 'in progress';
export const FAIL = 'fail';
export const SUCCESS = 'success';

export const COLORES_TYPES = new Map([
  [IN_PROGRESS, 'warning'],
  [FAIL, 'danger'],
  [SUCCESS, 'success'],
]);

const REGEX_ADELANTE = /(muévete hacia adelante|Ve hacia adelante|Adelante|Arranca hacia adelante|Avanza|inicia)/imug;
const REGEX_PARAR = /(Parar|Detenerse|Stop|Para|Detente)/imug;
const REGEX_DERECHA = /(ve a la derecha|derecha|ir a la derecha|gira a la derecha|gira derecha|a la derecha)/imug;
const REGEX_IZQUIERDA = /(ve a la izquierda|izquierda|ir a la izquierda|gira a la izquierda|gira izquierda|a la izquierda)/imug;
const REGEX_ATRAS = /(muévete hacia atras|Ve hacia atras|atrás|Arranca hacia atras|retroceder|giro 360|360)/imug;

const ACTION_ADELANTE = 'adelante';
const ACTION_ATRAS = 'atras';
const ACTION_DERECHA = 'derecha';
const ACTION_IZQUIERDA = 'izquierda';
const ACTION_PARAR = 'parar';

export const ACTIONS = [
  {
    pattern: REGEX_ADELANTE,
    accion: ACTION_ADELANTE,
  },
  {
    pattern: REGEX_ATRAS,
    accion: ACTION_ATRAS,
  },
  {
    pattern: REGEX_DERECHA,
    accion: ACTION_DERECHA,
  },
  {
    pattern: REGEX_IZQUIERDA,
    accion: ACTION_IZQUIERDA,
  },
  {
    pattern: REGEX_PARAR,
    accion: ACTION_PARAR,
  },
];

export const HEADERS = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
