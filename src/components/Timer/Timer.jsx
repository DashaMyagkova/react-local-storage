import React, { useEffect } from 'react';

import { number, func, oneOfType, string, bool } from 'prop-types';
import { Typography, Box, LinearProgress } from '@mui/material';

const Timer = ({ progress, setProgress, seconds, setSeconds, successCode }) => {
  useEffect(() => {
    if (!successCode) {
      const timer = setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress === 0) {
            return 0;
          }
          const diff = 5;
          return (oldProgress - diff);
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  useEffect(() => {
    if (!successCode) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds('Resume the process from table');
      }
    }
  });

  return (
    <>
      <Typography color="#2C3E50" variant="h5" textAlign="center" my="10px">
        {typeof seconds === 'number' ? `Time left ${seconds}` : seconds}
      </Typography>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} color={progress === 0 ? 'error' : 'success'} />
      </Box>
    </>
  );
};

Timer.propTypes = {
  progress: number.isRequired,
  setProgress: func.isRequired,
  seconds: oneOfType([string, number]).isRequired,
  setSeconds: func.isRequired,
  successCode: bool.isRequired,
};

export default Timer;
