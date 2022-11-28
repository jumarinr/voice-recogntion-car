import React, { useEffect, useState } from 'react';

// material ui core
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Resultado from './Resultado';

const Resultados = () => {
  const [instrucciones, setInstrucciones] = useState([]);

  useEffect(() => {
    const loadInstrucciones = () => {
      const local = JSON.parse(localStorage.getItem('instrucciones')) || [];
      setInstrucciones(local);
    };

    const removeInstrucciones = () => {
      setInstrucciones([]);
    };

    window.addEventListener('storage', loadInstrucciones);

    loadInstrucciones();

    return () => {
      window.removeEventListener('storage', removeInstrucciones);
    };
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} className="text-center">
        <Typography variant="h4" className="text-info-color">
          Historial de movimientos
        </Typography>
      </Grid>
      {instrucciones.map((instruccion) => (
        <Grid item xs key={instruccion.id}>
          <Resultado instruccion={instruccion} />
        </Grid>
      ))}
    </Grid>
  );
};

Resultados.propTypes = {};

export default Resultados;
