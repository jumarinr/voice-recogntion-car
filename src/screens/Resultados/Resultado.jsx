import 'moment/locale/es';

import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

import { COLORES_TYPES, IN_PROGRESS } from '../constants';

const Resultado = ({ instruccion }) => {
  if (!instruccion) {
    return null;
  }

  const color = COLORES_TYPES.get(instruccion.status);
  return (
    <div className="card text-center bg-dark text-white">
      <div className="card-header">
        <div>
          <b> ID: </b>
          {instruccion.id}
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <b>Instrucción: </b>
          {instruccion.text}
        </h5>
        <span className="d-inline-block" data-toggle="tooltip" data-placement="top" title={instruccion.error}>
          <span className={`ml-1 badge bg-${color} text-capitalize`}>
            {instruccion.status}
          </span>
        </span>

        {instruccion.status === IN_PROGRESS
          ? (
            <div className="progress mt-2">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                color={color}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '100%' }}
              />
            </div>
          )
          : null}

      </div>
      <div className="card-footer text-capitalize">
        {moment(instruccion.id).format('dddd DD MMMM YYYY hh:mm A')}
      </div>
    </div>
  );
};

Resultado.defaultProps = {
  instruccion: null,
};

Resultado.propTypes = {
  instruccion: PropTypes.shape({
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    error: PropTypes.string,
  }),
};

export default Resultado;
