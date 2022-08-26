import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import './style.css';
import { io } from 'socket.io-client';
import GameArea from './game/GameArea';

export const socket = io('https://warships-api.herokuapp.com');

function App() {
  useEffect(() => {
    if (window.location.search.length) {
      const inviteLink = window.location.search;
      const newLink = inviteLink.substring(inviteLink.indexOf('?invite=') + 8);
      console.log(inviteLink, newLink);
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
