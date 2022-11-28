import React, { useState, useEffect, useMemo } from 'react';

// material ui core
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// material ui icons
import MicOffIcon from '@mui/icons-material/MicOff';
import MicNoneIcon from '@mui/icons-material/MicNone';

import './styles.css';

import { IN_PROGRESS } from '../constants';
import { handleRecognition, recognition } from './utils';

import Resultado from '../Resultados/Resultado';

const DetectorVoz = () => {
  const [openMicro, setOpenMicro] = useState(false);
  const [instruccion, setInstruccion] = useState(null);

  const handleMicro = () => setOpenMicro((openMicroValue) => !openMicroValue);

  useEffect(() => {
    try {
      handleRecognition(openMicro);
    } catch (error) {
      console.error(error);
    }
  }, [openMicro]);

  recognition.onspeechend = () => setOpenMicro(false);

  useEffect(() => {
    const loadInstrucciones = () => {
      const local = JSON.parse(localStorage.getItem('instrucciones')) || [];

      const [lastInstruccion = null] = local;

      setInstruccion(lastInstruccion);
    };

    const removeInstrucciones = () => {
      setInstruccion(null);
    };

    window.addEventListener('storage', loadInstrucciones);

    loadInstrucciones();

    return () => {
      window.removeEventListener('storage', removeInstrucciones);
    };
  }, []);

  const bloquearCarro = useMemo(() => instruccion?.status === IN_PROGRESS, [instruccion]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} className="text-center">
        <IconButton
          aria-label="voice"
          onClick={handleMicro}
          color={openMicro ? 'error' : 'success'}
          disabled={bloquearCarro}
        >
          {openMicro
            ? <MicOffIcon sx={{ fontSize: 100 }} />
            : <MicNoneIcon sx={{ fontSize: 100 }} />}
        </IconButton>
      </Grid>
      <Grid item xs={12} className="text-center">
        <Typography variant="h4" className="text-info-color">
          Presione el botón para mover el vehículo
        </Typography>
      </Grid>

      <Grid item xs={10} md={4}>
        <Resultado instruccion={instruccion} />
      </Grid>
    </Grid>
  );
};

DetectorVoz.propTypes = {};

export default DetectorVoz;
