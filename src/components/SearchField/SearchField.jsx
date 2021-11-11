import React from 'react';
import { func, string } from 'prop-types';

import { Paper, InputBase, IconButton } from '@mui/material';

import SearchIcon from '@material-ui/icons/Search';

const SearchField = ({ onChange, value }) => (
  <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search"
      value={value}
      onChange={onChange}
    />
    <IconButton type="submit" sx={{ p: '10px' }}>
      <SearchIcon />
    </IconButton>
  </Paper>
);

SearchField.propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
};

export default SearchField;
