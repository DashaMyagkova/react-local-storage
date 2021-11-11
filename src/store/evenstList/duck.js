import {
  createSlice,
  // createAsyncThunk,
  isAnyOf,
} from '@reduxjs/toolkit';

import { createCommonAsyncThunk } from '@methods';

import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES,
} from '@constants';

import api from './api';

const { EVENTS_LIST } = STORE_NAMES;

const initialState = {
  ...INITIAL_STATE,
  eventsList: [],
  createdEvent: null,
  isEventValidated: false,
};

const createEventThunkName = `${EVENTS_LIST}/createEvent`;
const getEventsThunkName = `${EVENTS_LIST}/getEvents`;
const deleteEventsThunkName = `${EVENTS_LIST}/deleteEvents`;
const updateEventThunkName = `${EVENTS_LIST}/updateEvent`;
const deleteOneEventThunkName = `${EVENTS_LIST}/deleteOneEvent`;

export const createEvent = createCommonAsyncThunk(createEventThunkName, api.createEvent);

export const getEvents = createCommonAsyncThunk(getEventsThunkName, api.getEvents);

export const deleteEvents = createCommonAsyncThunk(deleteEventsThunkName, api.deleteEvents);

export const updateEvent = createCommonAsyncThunk(updateEventThunkName, api.updateEvent);

export const deleteOneEvent = createCommonAsyncThunk(deleteOneEventThunkName, api.deleteOneEvent);

const eventSlice = createSlice({
  name: EVENTS_LIST,
  initialState,
  reducers: {
    resetState: state => {
      return {
        ...state,
        createdEvent: null,
        isEventValidated: false,
      };
    },
    setCreatedEvent: (state, action) => {
      const { event } = action.payload;
      return {
        ...state,
        createdEvent: event,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          createEvent.pending,
          getEvents.pending,
          deleteEvents.pending,
          updateEvent.pending,
          deleteOneEvent.pending,
        ),
        state => {
          if (!state.isPending) {
            return {
              ...state,
              ...PENDING_STATE,
            };
          }
          return state;
        },
      )
      .addMatcher(
        isAnyOf(
          createEvent.rejected,
          getEvents.rejected,
          deleteEvents.rejected,
          updateEvent.rejected,
          deleteOneEvent.rejected,
        ),
        state => {
          if (state.isPending) {
            const newState = {
              ...state,
              ...REJECTED_STATE,
            };

            return newState;
          }
          return state;
        },
      )
      .addMatcher(isAnyOf(createEvent.fulfilled),
        (state, action) => ({
          ...state,
          ...FULFILLED_STATE,
          createdEvent: action.payload.data,
        }),
      )
      .addMatcher(
        isAnyOf(
          getEvents.fulfilled,
          deleteEvents.fulfilled,
        ),
        (state, action) => {
          const { events } = action.payload;
          return {
            ...state,
            ...FULFILLED_STATE,
            eventsList: events,
          };
        },
      )
      .addMatcher(isAnyOf(updateEvent.fulfilled),
        state => {
          return {
            ...state,
            ...FULFILLED_STATE,
            isEventValidated: true,
          };
        },
      )
      .addMatcher(isAnyOf(deleteOneEvent.fulfilled),
        state => {
          return {
            ...state,
            ...FULFILLED_STATE,
          };
        },
      );
  },
});

const { actions: eventActions, reducer: eventReducer } = eventSlice;

export {
  eventActions,
  eventReducer,
};
