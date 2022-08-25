import { createSlice } from '@reduxjs/toolkit';
import { ships } from '../assets/data/ships';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    yourId: '',
    game: '',
    step: 'mainTitle',
    isHorizontal: true,
    ships: ships,
    isMyTurn: false,
  },
  reducers: {
    setYourId: (state, action) => {
      state.yourId = action.payload;
    },
    setGame: (state, action) => {
      state.game = action.payload;
    },
    setIsHorizontal: (state) => {
      state.isHorizontal = !state.isHorizontal;
    },
    removeShip: (state, action) => {
      state.ships = state.ships.filter((el) => el.id !== action.payload);
    },
    addShip: (state, action) => {
      state.ships.push(action.payload);
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    resetShips: (state) => {
      state.ships = ships;
    },
    setIsMyTurn: (state, action) => {
      state.isMyTurn = action.payload
    }
  },
});

export default gameStateSlice.reducer;
export const { setIsHorizontal, removeShip, addShip, setStep, resetShips, setGame, setYourId, setIsMyTurn } =
  gameStateSlice.actions;
