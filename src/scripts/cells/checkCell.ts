import { CellType } from "../../types";

const checkCell = (x: number, y: number, field: CellType[]) => {
  const id = field.find((el) => el.x === x && el.y === y);
  if (id?.state !== 'ship') {
    return true;
  }
  return false;
};

const checkAroundCell = (x: number, y: number, field: CellType[]) => {
  if (checkCell(x, y, field) &&
    checkCell(x + 1, y, field) &&
    checkCell(x - 1, y, field) &&
    checkCell(x, y + 1, field) &&
    checkCell(x, y - 1, field) &&
    checkCell(x + 1, y + 1, field) &&
    checkCell(x + 1, y - 1, field) &&
    checkCell(x - 1, y + 1, field) &&
    checkCell(x - 1, y - 1, field)) {
    return true;
  }
  return false;
}

export const checkShip = (x: number, y: number, field: CellType[], isHorizontal: boolean, size: number) => {
  if (!isHorizontal) {
    for (let i = 0; i < size; i++) {
      if (!checkAroundCell(x + i, y, field)) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < size; i++) {
      if (!checkAroundCell(x, y + i, field)) {
        return false;
      }
    }
  }
  return true;
}