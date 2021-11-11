import React from 'react';
import { func, object } from 'prop-types';
import enGB from 'date-fns/locale/en-GB';

import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { default as DateInput } from '@mui/lab/DatePicker';

import './datePicker.scss';

const DatePiker = ({ value, onChange}) => {
  const currentDate = new Date();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={enGB}
    >
      <DateInput
        value={value}
        onChange={onChange}
        minDate={currentDate}
        renderInput={params => (
          <TextField {...params} 
            sx={{background: "#FFFF", borderRadius: '4px'}} 
            color="success"
          />
        )}
      />
    </LocalizationProvider>
  );
};

DatePiker.propTypes = {
  value: object.isRequired,
  onChange: func.isRequired,
};

export default DatePiker;
