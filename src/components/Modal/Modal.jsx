import React from 'react';
import { func, bool } from 'prop-types';

import { Stack, Typography, Button, Box, Modal } from '@mui/material';
import './modal.scss';

const ErrorCard = ({ onModalClick }) => (
  <Stack justifyContent="center" height="100vh" width="100%" alignItems="center">
    <Stack
      bgcolor="#EBDEF0"
      width="30%"
      px="25px"
      py="25px"
      spacing={2}
      sx={{ boxShadow: 1, borderRadius: "4px" }}
    >
      <Typography color="#2C3E50" variant="body1" textAlign="center">
        No events are available for now.
      </Typography>
      <Button variant="outlined" color="success" onClick={onModalClick}>Create it!</Button>
    </Stack>
  </Stack>
);

ErrorCard.propTypes = {
  onModalClick: func.isRequired,
};

const DeleteModal = ({ isModalOpen, onModalClose, onCancelClick, onSubmitClick }) => (
  <Modal
    open={isModalOpen}
    onClose={onModalClose}
  >
    <Box className="modal-box" maxWidth="468px" p="24px">
      <Typography variant="h6">Are you sure you want to delete all events?</Typography>
      <Stack mt="32px" flexDirection="row" justifyContent="end">
        <Button variant="text" color="secondary" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="medium"
          onClick={onSubmitClick}
          color="error"
        >
          Delete
        </Button>
      </Stack>
    </Box>
  </Modal>
);

DeleteModal.propTypes = {
  isModalOpen: bool.isRequired,
  onModalClose: func.isRequired,
  onCancelClick: func.isRequired,
  onSubmitClick: func.isRequired,
};

const ModalVariant = {
  ErrorCard,
  DeleteModal,
};

export default ModalVariant;
