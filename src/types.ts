export type CellState = 'empty' | 'ship' | 'miss' | 'hit' | 'hover';

export interface CellType {
  id: number;
  x: number;
  y: number;
  state: CellState;
}

type ShipTypes = '' | 'boat' | 'cruiser' | 'destroyer' | 'carrier';

export interface ShipType {
  id: number;
  type: ShipTypes;
  size: number;
  amount?: number;
}

export type ShipState = 'alive' | 'sunk' | 'destroyed';