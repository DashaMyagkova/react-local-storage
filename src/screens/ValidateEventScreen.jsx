import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateEvent } from '@store';
import { VALID_CODE, STORE_NAMES, routes } from '@constants';

import { Typography, Box, Stack, Button } from '@mui/material';
import { BackgroundContainer, Input, Timer } from '@components';

const ValidateEventScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(100);
  const [seconds, setSeconds] = useState(20);
  const [successCode, setSuccessCode] = useState(false);

  const { createdEvent, isEventValidated } = useSelector(store => store[STORE_NAMES.EVENTS_LIST]);

  useEffect(() => {
    if (isEventValidated) {
      toast.success('Success!');
      setTimeout(() => {
        navigate(routes.root);
      }, 2000);
    }
  }, [isEventValidated]);

  const handleSubmitCode = () => {
    setSuccessCode(true);
    dispatch(updateEvent(createdEvent.createdAt));
  };

  const validate = values => {
    const errors = {};
    if (!values.code) {
      errors.code = 'Field is required';
    } else if (!VALID_CODE.test(values.code)) {
      errors.code = 'Invalid code';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validate,
    onSubmit: handleSubmitCode,
  });

  const handleReturn = () => {
    navigate(routes.root);
  };

  return (
    <BackgroundContainer>
      <Stack justifyContent="center" height="100vh" width="100%" alignItems="center">
        <Box bgcolor="white" borderRadius="4px" sx={{ boxShadow: 1 }} pt="25px" width="50%">
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center"
            pb="25px" 
          >
            <Typography variant="h4" color="#1E8449">Please input a validation code.</Typography>
          </Stack>
          <Stack sx={{borderTop: 1, borderColor: "#D5D8DC", bgcolor: "#EBDEF0"}} direction="row">
            <Stack sx={{bgcolor: "#EBDEF0"}} width="45%" px="15px" py="30px">
              <Timer 
                progress={progress}
                setProgress={setProgress}
                seconds={seconds}
                setSeconds={setSeconds}
                successCode={successCode}
              />
              {typeof seconds === 'string' && (
                <Button variant="contained" color="error" onClick={handleReturn} fullWidth sx={{mt: "20px"}}>
                  Return
                </Button>
              )}
            </Stack>
            <Stack
              sx={{background: "linear-gradient(180deg, rgba(147,130,180,1) 13%, rgba(65,49,88,1) 85%)"}}
              width="55%"
              px="15px"
              py="20px"
              justifyContent="center"
            >
              <form onSubmit={formik.handleSubmit}>
                <Input 
                  placeholder="Enter code ****" 
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  id="code"
                  name="code"
                  error={formik.touched.code && formik.errors.code}
                  helperText={formik.touched.code && formik.errors.code}
                />
                {typeof seconds === 'number' && (
                  <Button variant="contained" color="success" type="submit" fullWidth sx={{mt: "20px"}}>Submit</Button>
                )}
              </form>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </BackgroundContainer>
  );
};

export default ValidateEventScreen;
