import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import Ship from '../ships/Ship';
import Cell from './Cell';
import './style.css';
import { socket } from '../../App';
import { setCell, setEnemyCell } from '../../../store/fieldsSlice';
import { setIsMyTurn } from '../../../store/commonStateSlice';

const Field = ({ your }: { your?: boolean }) => {
  const dispatch = useAppDispatch();

  const { field, enemyField } = useAppSelector(({ fieldsSlice: toolkit }) => {
    return {
      field: toolkit.yourField,
      enemyField: toolkit.enemyField,
    };
  });

  const { isHorizontal, ships, step, isMyTurn, yourId } = useAppSelector(
    ({ gameStateSlice: toolkit }) => {
      return {
        isHorizontal: toolkit.isHorizontal,
        ships: toolkit.ships,
        step: toolkit.step,
        isMyTurn: toolkit.isMyTurn,
        yourId: toolkit.yourId,
      };
    }
  );

  const { isSelected } = useAppSelector(({ dragStateSlice: toolkit }) => {
    return {
      isSelected: toolkit.isSelected,
    };
  });

  useEffect(() => {
    socket.on('check-cell-response', ({ victim, cell }) => {
      if (cell.state === 'empty') {
        cell.state = 'miss';
      } else if (cell.state === 'ship' || cell.state === 'hit') {
        cell.state = 'hit';
      }
      if (yourId && victim && victim === yourId) {
        dispatch(setCell(cell));
        if (cell.state !== 'hit') {
          dispatch(setIsMyTurn(true));
        } else dispatch(setIsMyTurn(false));
      } else if (yourId && victim && victim !== yourId) {
        dispatch(setEnemyCell(cell));
        if (cell.state === 'hit') {
          dispatch(setIsMyTurn(true));
        } else dispatch(setIsMyTurn(false));
      }
    });
  }, [dispatch, yourId, field, enemyField]);

  return (
    <div>
      <div className='field__title'>
        {your ? (
          <>
            <div>Your field</div>
            {step === 'placeShips' ? (
              <div
                style={{
                  transform: `scale(${200 / (isSelected?.size || 20)}%)${
                    !isHorizontal ? ' rotate(90deg)' : ' '
                  }`,
                }}
              >
                {ships.length !== 0 && (
                  <Ship
                    id={isSelected?.id || 0}
                    type={isSelected?.type || 'boat'}
                    size={isSelected?.size || 0}
                  />
                )}
              </div>
            ) : (
              step === 'gameStart' && <div>{isMyTurn ? 'Your' : 'Enemy'} turn</div>
            )}
          </>
        ) : (
          'Enemy field'
        )}
      </div>
      <div className='container game__field'>
        {your
          ? field.map((el) => <Cell key={el.id} id={el.id} x={el.x} y={el.y} state={el.state} />)
          : enemyField.map((el) => (
              <Cell key={el.id} id={el.id} x={el.x} y={el.y} state={el.state} isEnemy />
            ))}
      </div>
    </div>
  );
};

export default Field;
