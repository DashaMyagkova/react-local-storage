import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from '@constants';
import { ManageEventScreen, ValidateEventScreen, RootTableScreen } from '@screens';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.validateEvent} element={<ValidateEventScreen />}/>
      <Route path={routes.manageEvent} element={<ManageEventScreen />} />
      <Route path={routes.root} element={<RootTableScreen />}/>
    </Routes>
  </BrowserRouter>
);

export default Router;
