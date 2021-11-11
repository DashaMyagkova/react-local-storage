import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getEvents, deleteEvents, deleteOneEvent, eventActions } from '@store';
import { routes, STORE_NAMES } from '@constants';

import { Box } from '@mui/material';
import { BackgroundContainer, ModalVariant, CustomTable } from '@components';

const RootTableScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { eventsList, isPending } = useSelector(store => store[STORE_NAMES.EVENTS_LIST]);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(eventActions.resetState());
  }, []);

  const handleRedirectManageEvent = () => {
    navigate(routes.manageEvent);
  };

  const handleAllDeleteClick = () => {
    dispatch(deleteEvents());
    handleCloseDeleteModal();
  };

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
  const handleOpenDeleteModal = () => setDeleteModalOpen(true);

  const handleDeleteOneEvent = data => async () => {
    await dispatch(deleteOneEvent(data));
    dispatch(getEvents());
  };

  return(
    <BackgroundContainer>
      <Box bgcolor="#D2B4DE" width="100%" py="30px" px="30px">
        <ModalVariant.DeleteModal
          isModalOpen={isDeleteModalOpen}
          onCancelClick={handleCloseDeleteModal}
          onSubmitClick={handleAllDeleteClick}
          onModalClose={handleCloseDeleteModal}
        />
        {eventsList?.length > 0 || isPending ? (
          <CustomTable
            data={eventsList}
            handleAllDeleteClick={handleOpenDeleteModal}
            handleCreateEvent={handleRedirectManageEvent}
            handleDeleteOneEvent={handleDeleteOneEvent}
          />
        ) : (
          <ModalVariant.ErrorCard onModalClick={handleRedirectManageEvent}/>
        )}
      </Box>
    </BackgroundContainer>
  );
};

export default RootTableScreen;
