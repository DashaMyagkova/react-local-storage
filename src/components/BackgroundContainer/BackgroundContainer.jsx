import React from "react";
import { node } from 'prop-types';

import { Box } from '@mui/material';

const BackgroundContainer = ({ children }) => (
  <Box height="100vh" width="100%" bgcolor="#D2B4DE">
    {children}
  </Box>
);

BackgroundContainer.propTypes = {
  children: node.isRequired,
};

export default BackgroundContainer;
