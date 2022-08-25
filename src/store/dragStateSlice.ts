import { createSlice } from '@reduxjs/toolkit';
import { ShipType } from '../types';

const initialState: { isSelected: ShipType | null} = {
  isSelected: null,
};

const dragStateSlice = createSlice({
  name: 'drag',
  initialState: {
    ...initialState,
  },
  reducers: {
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
  },
});

export default dragStateSlice.reducer;
export const { setIsSelected } = dragStateSlice.actions;
