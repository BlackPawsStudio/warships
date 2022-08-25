import { createSlice } from '@reduxjs/toolkit';
import { CellType } from '../types';

const data: CellType[] = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    data.push({ id: i + j, x: i, y: j, state: 'empty' });
  }
}
data.map((el, id) => (el.id = id));

const fieldsSlice = createSlice({
  name: 'yourField',
  initialState: {
    yourField: data,
    enemyField: data,
  },
  reducers: {
    setField: (state, action) => {
      state.yourField = action.payload;
    },
    setCell: (state, action) => {
      const id = state.yourField.find(
        (el) => el.x === action.payload.x && el.y === action.payload.y
      );
      if (id) {
        state.yourField[id.id].state = action.payload.state;
      }
    },
    setEnemyCell: (state, action) => {
      const id = state.enemyField.find(
        (el) => el.x === action.payload.x && el.y === action.payload.y
      );
      if (id) {
        state.enemyField[id.id].state = action.payload.state;
      }
    },
    resetHoverField: (state) => {
      state.yourField.map((el) => (el.state === 'hover' ? (el.state = 'empty') : el.state));
    },
    resetField: (state) => {
      state.yourField = data;
    },
  },
});

export default fieldsSlice.reducer;
export const { setField, setCell, resetHoverField, resetField, setEnemyCell } = fieldsSlice.actions;
