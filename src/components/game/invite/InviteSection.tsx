import { socket } from '../../App';
import Button from '../../commonUi/Button';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGame, setStep, setYourId } from '../../../store/commonStateSlice';

const InviteSection = ({ text }: { text?: boolean }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const { yourId } = useAppSelector(({ gameStateSlice: toolkit }) => {
    return {
      yourId: toolkit.yourId,
    };
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('get-id');
    });
    socket.on('get-id-res', (id) => {
      dispatch(setYourId(id));
    });
    socket.on('room-create-response', (res) => {
      if (res.response === 'accept') {
        console.log('accepted');
        dispatch(setGame(res.game));
        dispatch(setStep('placeShips'));
      } else {
        alert(`Error ${res.response}!`);
      }
    });
  }, [dispatch]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.hostname}${window.location.pathname}?invite=` + yourId
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const confirm = () => {
    if (!text) {
      if (inviteLink.includes(window.location.hostname)) {
        const newLink = inviteLink.substring(inviteLink.indexOf('?invite=') + 8);
        socket.emit('room-create', newLink);
      } else {
        alert(`Wrong invite code!`);
        setInviteLink('');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteLink(e.target.value);
  };

  return (
    <div className='invite__section'>
      {text ? (
        <>
          <h4>Welcome to Warships!</h4>
          <label className='invite__label'>I'll think of this text later</label>
        </>
      ) : (
        <>
          <div>
            <label className='invite__label'>Invite your friend!</label>
            <div className='invite__input_label'>
              {isCopied ? (
                <label className='invite__input'>Copied!</label>
              ) : (
                <>
                  <input type='text' className='invite__input' defaultValue={yourId} disabled />
                  <Button onClick={copyLink}>Copy</Button>{' '}
                </>
              )}
            </div>
          </div>
          <div>
            <label className='invite__label'>Or insert invite link here</label>
            <div className='invite__input_label'>
              <input type='text' className='invite__input' onChange={handleChange} />
              <Button onClick={confirm}>Confirm</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InviteSection;
