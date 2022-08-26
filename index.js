const getNumByParam = (aim, arr, param) => {
  const elem = arr.find((el) => el[param] === aim);
  if (elem) return arr.indexOf(elem);
};

const getGameByUser = (id, arr) => {
  const elem = arr.find((el) => el.players.includes(id));
  if (elem) return arr.indexOf(elem);
};

const pPrint = (arr) => {
  console.log(' ');
  console.log('//////////////users///////////////');
  arr.forEach((el) => {
    console.log('[', el, ']');
  });
  console.log('//////////////////////////////////');
  console.log('');
};

const checkIsThereAShip = (field) => {
  field.forEach((el) => {
    if (el.state === 'ship') {
      return true;
    }
    return false;
  });
};

const port = process.env.PORT || 3001;
const io = require('socket.io')(port, {
  cors: {
    origin: '*',
  },
});

const players = [];
const games = [];

io.on('connection', (socket) => {
  players.push({
    id: socket.id,
    state: 'free',
  });
  socket.join(socket.id);
  console.log('user connected', socket.id);
  pPrint(players);

  socket.on('disconnect', () => {
    const i = getNumByParam(socket.id, players, 'id');
    if (typeof i === 'number') {
      if (players[i].state !== 'free') {
        const j = getGameByUser(socket.id, games);
        if (typeof j === 'number') {
          games[j].players.pop(games[j].players.indexOf(socket.id));
          const opponent = games[j].players[0];
          socket.to(opponent).emit('roommate-disconnected');
          players[getNumByParam(opponent, players, 'id')].state = 'free';
          games.pop(j);
        }
      }
      players.pop(i);
    }
    console.log('user disconnected', socket.id);
    pPrint(players);
  });

  socket.on('get-id', () => {
    socket.emit('get-id-res', socket.id);
  });

  // ROOMS

  socket.on('room-create', (id) => {
    const i = getNumByParam(id, players, 'id');
    if (typeof i === 'number') {
      if (players[i].id === socket.id) {
        socket.emit('room-create-response', { response: 'same-user' });
        console.log('room decline same user', id);
      } else {
        const yourId = getNumByParam(socket.id, players, 'id');
        const enemyId = getNumByParam(id, players, 'id');
        players[yourId].state = 'connected';
        players[enemyId].state = 'connected';
        games.push({
          id: id,
          players: [socket.id, id],
          state: 'connected',
          fields: [
            {
              id: socket.id,
              field: [],
            },
            {
              id: id,
              field: [],
            },
          ],
        });
        socket.emit('room-create-response', { response: 'accept', game: id });
        socket.to(id).emit('room-create-response', { response: 'accept', game: id });
        console.log('room accepted /host', id, 'guest', socket.id, 'game', id);
        pPrint(players);
      }
    } else {
      socket.emit('room-create-response', {
        response: 'wrong-code',
      });
      console.log('room decline wrong code');
    }
  });

  // GAME

  socket.on('player-ready', (id, field) => {
    const gameNum = getNumByParam(id, games, 'id');
    const playerNum = getNumByParam(socket.id, games[gameNum].fields, 'id');
    const currentGame = games[gameNum];
    currentGame.fields[playerNum].field = field;
    if (currentGame.state === 'pending') {
      currentGame.players.forEach((el) => {
        if (socket.id === el) socket.emit('game-start');
        else socket.to(el).emit('game-start');
      });
      console.log('game', currentGame.id, 'started');
    } else {
      currentGame.state = 'pending';
      currentGame.players.forEach((el) => {
        if (socket.id === el) socket.emit('game-pending');
        else socket.to(el).emit('game-pending');
      });
      console.log('game', currentGame.id, 'is waiting to start');
    }
  });

  socket.on('check-cell', (id, gameId) => {
    const gameNum = getNumByParam(gameId, games, 'id');
    const currentGame = games[gameNum];
    const playerNum = getNumByParam(socket.id, currentGame.fields, 'id');
    const enemy = currentGame.fields[playerNum === 1 ? 0 : 1];
    const enemyField = enemy.field;
    const checkedCell = enemyField[id];
    console.log(socket.id, 'checked', checkedCell.id, "cell. It's", checkedCell.state);
    currentGame.players.forEach((el) => {
      if (socket.id === el)
        socket.emit('check-cell-response', {
          victim: currentGame.fields[playerNum === 1 ? 0 : 1].id,
          cell: checkedCell,
        });
      else
        socket.to(el).emit('check-cell-response', {
          victim: currentGame.fields[playerNum === 1 ? 0 : 1].id,
          cell: checkedCell,
        });
    });
    if (checkedCell.state === 'ship') {
      checkedCell.state = 'hit';
    }
    if (checkIsThereAShip(enemyField) === false) {
      currentGame.players.forEach((el) => {
        if (socket.id === el) socket.emit('game-end', enemy.id);
        else socket.to(el).emit('game-end', enemy.id);
      });
      console.log(enemy.id, 'loses!');
    }
  });
});
