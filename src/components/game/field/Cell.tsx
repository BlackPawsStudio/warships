import { useState } from 'react';
import { checkShip } from '../../../scripts/cells/checkCell';
import { removeShip, setIsHorizontal } from '../../../store/commonStateSlice';
import { setIsSelected } from '../../../store/dragStateSlice';
import { resetHoverField, setCell } from '../../../store/fieldsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { CellType } from '../../../types';
import { socket } from '../../App';
import './style.css';

const Cell = ({ id, x, y, state, isEnemy }: CellType & { isEnemy?: boolean }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  const dispatch = useAppDispatch();

  const { isSelected } = useAppSelector(({ dragStateSlice: toolkit }) => {
    return {
      isSelected: toolkit.isSelected,
    };
  });

  const { yourField } = useAppSelector(({ fieldsSlice: toolkit }) => {
    return {
      yourField: toolkit.yourField,
    };
  });

  const { isHorizontal, step, game, isMyTurn } = useAppSelector(({ gameStateSlice: toolkit }) => {
    return {
      isHorizontal: toolkit.isHorizontal,
      step: toolkit.step,
      game: toolkit.game,
      isMyTurn: toolkit.isMyTurn,
    };
  });

  const display = (hover: string) => {
    if (isSelected) {
      if (
        (isHorizontal && y + isSelected.size <= 10) ||
        (!isHorizontal && x + isSelected.size <= 10)
      ) {
        for (let i = 0; i < isSelected.size; i++) {
          if (checkShip(x, y, yourField, isHorizontal, isSelected.size)) {
            setIsAvailable(true);
            dispatch(
              setCell(
                isHorizontal
                  ? {
                      x: x,
                      y: y + i,
                      state: hover,
                    }
                  : {
                      x: x + i,
                      y: y,
                      state: hover,
                    }
              )
            );
          }
        }
      } else setIsAvailable(false);
    }
  };

  const placeShip = () => {
    if (isAvailable && isSelected) {
      display('ship');
      dispatch(removeShip(isSelected.id));
      dispatch(setIsSelected(null));
      setIsAvailable(false);
    }
  };

  const rotateShip = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await dispatch(setIsHorizontal());
    await dispatch(resetHoverField());
  };

  const checkEnemyCell = () => {
    if (isMyTurn) {
      socket.emit('check-cell', id, game);
    }
  };

  return (
    <div
      className={`cell ${isEnemy ? 'cell_enemy' : ''}`}
      style={{
        background:
          state === 'hover'
            ? '#00f'
            : state === 'miss'
            ? '#fff'
            : state === 'hit'
            ? '#f00'
            : state === 'ship'
            ? '#0f0'
            : '#555',
      }}
      onMouseMove={() => display('hover')}
      onMouseLeave={() => display('empty')}
      onClick={() => (step === 'placeShips' ? placeShip() : checkEnemyCell())}
      onContextMenu={(e) => rotateShip(e)}
    ></div>
  );
};

export default Cell;
