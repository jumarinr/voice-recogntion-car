import React, { useState, useMemo } from 'react';

// material ui core
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// material ui icons
import HistoryIcon from '@mui/icons-material/History';
import CancelIcon from '@mui/icons-material/Cancel';

import DetectorVoz from '../DetectorVoz/DetectorVoz';
import Resultados from '../Resultados/Resultados';

const Inicio = () => {
  const [openHistory, setOpenHistory] = useState(false);

  const handleHistory = () => setOpenHistory((prev) => !prev);

  const componentSize = useMemo(() => (openHistory ? 8 : 12), [openHistory]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={componentSize}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <DetectorVoz />
          </Grid>
          <Grid item xs={12} className="text-center">
            <Button
              variant="contained"
              endIcon={openHistory ? <CancelIcon /> : <HistoryIcon />}
              className="text-capitalize"
              onClick={handleHistory}
            >
              {openHistory
                ? 'Ocultar historial'
                : 'Ver historial' }
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {openHistory
        ? (
          <Grid item xs={12} md={4}>
            <Resultados />
          </Grid>
        )
        : null }
    </Grid>
  );
};

Inicio.propTypes = {};

export default Inicio;
