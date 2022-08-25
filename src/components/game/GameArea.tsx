import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { socket } from '../App';
import { useEffect } from 'react';
import Field from './field/Field';
import GameSettings from './field/Settings';
import InviteScreen from './invite/InviteScreen';
import ShipsField from './ships/ShipsField';
import './style.css';
import { setStep } from '../../store/commonStateSlice';

const GameArea = () => {
  const dispatch = useAppDispatch();

  const { step, yourId } = useAppSelector(({ gameStateSlice: toolkit }) => {
    return {
      step: toolkit.step,
      yourId: toolkit.yourId,
    };
  });

  useEffect(() => {
    socket.on('roommate-disconnected', () => {
      alert('Roommate disconnected!');
      dispatch(setStep('mainTitle'));
      window.location.pathname = '';
    });
  }, [dispatch, yourId]);

  return (
    <div className='game__area'>
      {step === 'mainTitle' && <InviteScreen />}
      {step === 'placeShips' && (
        <>
          <ShipsField />
          <Field your />
          <GameSettings />
        </>
      )}
      {step === 'gameStart' && (
        <>
          <Field your />
          <Field />
        </>
      )}
    </div>
  );
};

export default GameArea;
