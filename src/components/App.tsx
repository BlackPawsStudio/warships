import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import './style.css';
import { io } from 'socket.io-client';
import GameArea from './game/GameArea';

export const socket = io('http://localhost:3001');

function App() {
  useEffect(() => {
    if (window.location.pathname.length > 1) {
      const inviteLink = window.location.pathname;
      const newLink = inviteLink.substring(inviteLink.indexOf('/') + 1);
      socket.emit('room-create', newLink);
    }
  }, []);

  return (
    <Provider store={store}>
      <div className='root'>
        <header>
          <h1>Warships!</h1>
        </header>
        <main>
          <GameArea />
        </main>
      </div>
    </Provider>
  );
}

export default App;
