import { setIsMyTurn, resetShips, setStep } from '../../../store/commonStateSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import Button from '../../commonUi/Button';
import './style.css';
import { resetField } from '../../../store/fieldsSlice';
import { socket } from '../../App';

const GameSettings = () => {
  const [isPending, setIsPending] = useState(false);

  const { ships, game, yourId } = useAppSelector(({ gameStateSlice: toolkit }) => {
    return {
      ships: toolkit.ships,
      game: toolkit.game,
      yourId: toolkit.yourId
    };
  });

  const { yourField } = useAppSelector(({ fieldsSlice: toolkit }) => {
    return {
      yourField: toolkit.yourField,
    };
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('game-start', () => {
      dispatch(setStep('gameStart'));
      if (game === yourId) {
        dispatch(setIsMyTurn(true))
      }
    });

    socket.on('game-pending', () => {
      if (ships.length === 0) setIsPending(true);
    });
  }, [dispatch, ships, yourId, game]);

  const confirmReady = () => {
    socket.emit('player-ready', game, yourField);
  };

  const reset = () => {
    dispatch(resetShips());
    dispatch(resetField());
  };

  return (
    <div>
      <div className='field__title'>Game Info</div>
      <div className='container settings__field'>
        <h4>Game controls</h4>
        <label>'Left mouse click to place ship'</label>
        <label>'Right mouse click to rotate ship'</label>
        {isPending ? (
          <Button disabled>Waiting for your opponent...</Button>
        ) : (
          <>
            <Button onClick={confirmReady} disabled={ships.length !== 0}>
              Proceed to game
            </Button>
            <Button onClick={reset}>Reset</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameSettings;
