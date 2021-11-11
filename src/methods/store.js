import {createAsyncThunk} from '@reduxjs/toolkit';

const createCommonAsyncThunk = (name, request) => {
  return createAsyncThunk(name, async (body, { rejectWithValue }) => {
    const { response, error } = await request(body || null);

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  });
};

export {
  createCommonAsyncThunk,
};
