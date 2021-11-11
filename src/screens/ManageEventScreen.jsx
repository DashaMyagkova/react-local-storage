import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createEvent, getEvents } from '@store';
import { EVENT_NAME, LOCATION, STORE_NAMES, routes } from '@constants';

import { Typography, Box, Stack, Checkbox, Button } from '@mui/material';
import { BackgroundContainer, DatePiker, Input } from '@components';

const ManageEventScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createdEvent } = useSelector(store => store[STORE_NAMES.EVENTS_LIST]);

  const [isDateKnown, setIsDateKnown] = useState(true);

  useEffect(() => {
    if (createdEvent) {
      toast.success('Event has been created!');
      setTimeout(() => {
        navigate(routes.validateEvent);
      }, 2000);
    }
  }, [createdEvent]);

  const handleCreateEvent = () => {
    if (isDateKnown) {
      const eventData = {
        name: formik.values.eventName,
        location: formik.values.location,
        startDate: formik.values.fromDate,
        endDate: formik.values.tillDate,
        createdAt: new Date().toISOString(),
      };
      dispatch(createEvent(eventData));
    } else {
      const eventData = {
        name: formik.values.eventName,
        location: formik.values.location,
        startDate: '-/-/-',
        endDate: '-/-/-',
        createdAt: new Date().toISOString(),
      };
      dispatch(createEvent(eventData));
    }
    dispatch(getEvents());
  };

  const validate = values => {
    const errors = {};
    if (!values.eventName) {
      errors.eventName = 'Field is required';
    } else if (!EVENT_NAME.test(values.eventName)) {
      errors.eventName = 'Name should contain only letters, numbers and punctuation';
    }

    if (!values.location) {
      errors.location = 'Field is required';
    } else if (!LOCATION.test(values.location)) {
      errors.location = 'Name should contain only letters, numbers and ". , -"';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      eventName: '',
      location: '',
      fromDate: new Date(),
      tillDate: new Date(),
    },
    validate,
    onSubmit: handleCreateEvent,
  });

  const handleChangeDateKnown = () => setIsDateKnown(!isDateKnown);

  return(
    <BackgroundContainer>
      <Stack justifyContent="center" height="100vh" width="100%" alignItems="center">
        <Box bgcolor="white" borderRadius="4px" sx={{ boxShadow: 1 }} pt="25px" width="50%">
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center"
            pb="25px" 
          >
            <Typography variant="h4" color="#1E8449">SET UP YOUR</Typography>
            <Typography variant="h4" bgcolor="#1E8449" color="#FFFF" pr="2px">EVENT</Typography>
          </Stack>
          <Stack sx={{borderTop: 1, borderColor: "#D5D8DC"}} direction="row">
            <Box bgcolor="#EBDEF0" width="45%" px="15px" pt="15px">
              <Typography color="#2C3E50" variant="body1">
                You will be able to add full event details in your organizer dashboard
              </Typography>
            </Box>
            <Stack
              sx={{background: "linear-gradient(180deg, rgba(147,130,180,1) 13%, rgba(65,49,88,1) 85%)"}}
              width="55%"
              px="15px"
              py="20px"
            >
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                  <Input 
                    placeholder="Event Name" 
                    onChange={formik.handleChange}
                    value={formik.values.eventName}
                    id="eventName"
                    name="eventName"
                    error={formik.touched.eventName && formik.errors.eventName}
                    helperText={formik.touched.eventName && formik.errors.eventName}
                  />
                  <Input 
                    placeholder="Location" 
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    id="location"
                    name="location"
                    error={formik.touched.location && formik.errors.location}
                    helperText={formik.touched.location && formik.errors.location}
                  />
                  <DatePiker 
                    onChange={date => formik.setFieldValue('fromDate', date)}
                    value={formik.values.fromDate}
                  />
                  <DatePiker 
                    onChange={date => formik.setFieldValue('tillDate', date)}
                    value={formik.values.tillDate}
                  />
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography color="#FFFF" variant="subtitle1">{`Don't know the date yet`}</Typography>
                    <Checkbox
                      checked={!isDateKnown}
                      onChange={handleChangeDateKnown}
                      sx={{color: "#FFFF"}}
                      color="success"
                    />
                  </Stack>
                  <Button variant="contained" color="success" type="submit">CREATE EVENT</Button>
                </Stack>
              </form>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </BackgroundContainer>
  );
};

export default ManageEventScreen;
