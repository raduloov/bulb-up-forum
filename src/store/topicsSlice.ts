import { createSlice } from '@reduxjs/toolkit';

const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
  },
  reducers: {
    addTopic(state, action) {
      const newTopic = action.payload;
      console.log(newTopic);
      // state.topics.push(newTopic);
    },
  },
});

export const topicsActions = topicsSlice.actions;

export default topicsSlice;
