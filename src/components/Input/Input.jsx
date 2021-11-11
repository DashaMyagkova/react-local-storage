import React from 'react';
import { string, func, bool } from 'prop-types';

import { TextField } from '@mui/material';

const Input = ({ placeholder, value, onChange, id, name, error, helperText }) => (
  <TextField
    InputProps={{
      style: {background: "#FFFF"},
    }} 
    fullWidth
    color="success"
    placeholder={placeholder}
    variant="outlined" 
    value={value}
    onChange={onChange}
    id={id}
    name={name}
    required
    error={error}
    helperText={helperText}
    FormHelperTextProps={{style: {color: "#FFFF"}}}
  />
);

Input.propTypes = {
  placeholder: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  error: bool,
  helperText: string,
};

export default Input;
