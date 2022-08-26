from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
from functions import checkIsThereShip, getGameByUser, getNumByParam, pPrint
import os

app = Flask(__name__)
app.debug = True
cors = CORS(app, resources={
            r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins=[
                    'http://localhost:3000', 'https://blackpawsstudio.github.io'])

players = []
games = []

# connect


@socketio.on('connect')
def handleConnect():
    players.append({
        'id': request.sid,
        'state': 'free',
    })
    print('user connected', request.sid)
    pPrint(players)


@socketio.on('disconnect')
def handleDisconnect():
    i = getNumByParam(request.sid, players, 'id')
    if (isinstance(i, int)):
        if (players[i]['state'] != 'free'):
            j = getGameByUser(request.sid, games)
            if (isinstance(j, int)):
                games[j]['players'].pop(games[j]['players'].index(request.sid))
                opponent = games[j]['players'][0]
                emit('roommate-disconnected', to=opponent)
                players[getNumByParam(
                    opponent, players, 'id')]['state'] = 'free'
                games.pop(j)
        players.pop(i)
        print('user disconnected', request.sid)
    pPrint(players)


@socketio.on('get-id')
def handleGetId():
    emit('git-id-res', request.sid)

# rooms


@socketio.on('room-create')
def handleCreateRoom(id):
    i = getNumByParam(id, players, 'id')
    if (isinstance(i, int)):
        if (players[i]['id'] == request.sid):
            emit('room-create-response', {'response': 'same-user'})
            print('room decline same user', id)
        else:
            join_room(id)
            emit('room-create-response',
                 {'response': 'accept', 'game': id}, to=id)
            yourId = getNumByParam(request.sid, players, 'id')
            enemyId = getNumByParam(id, players, 'id')
            players[yourId]['state'] = 'connected'
            players[enemyId]['state'] = 'connected'
            games.append({
                'id': id,
                'players': [request.sid, id],
                'state': 'connected',
                'fields': [
                    {
                        'id': request.sid,
                        'field': []
                    },
                    {
                        'id': id,
                        'field': []
                    }
                ]
            })
            print('room accepted /host', id, 'guest',
                  request.sid, 'game', id)
            pPrint(games)
            pPrint(players)
    else:
        emit('room-create-response', {'response': 'wrong-code'})
        print('room decline wrong code', id)


# game


@socketio.on('player-ready')
def handlePlayerReady(id, field):
    gameNum = getNumByParam(id, games, 'id')
    playerNum = getNumByParam(request.sid, games[gameNum]['fields'], 'id')
    games[gameNum]['fields'][playerNum]['field'] = field
    if (games[gameNum]['state'] == 'pending'):
        print('game', games[gameNum]['id'], 'started')
        emit('game-start', to=id)
    else:
        games[gameNum]['state'] = 'pending'
        emit('game-pending', to=id)
        print('game', games[gameNum]['id'], 'is waiting to start')


@socketio.on('check-cell')
def handleCheckCell(id, gameId):
    gameNum = getNumByParam(gameId, games, 'id')
    game = games[gameNum]
    playerNum = getNumByParam(request.sid, game['fields'], 'id')
    enemyField = game['fields'][0 if playerNum == 1 else 1]['field']
    checkedCell = enemyField[id]
    print(request.sid, 'checked',
          checkedCell['id'], 'cell. It\'s', checkedCell['state'])
    emit('check-cell-response',
         {'victim': game['fields'][0 if playerNum == 1 else 1]['id'], 'cell': checkedCell}, to=gameId)
    checkedCell['state'] = 'hit'
    if checkIsThereShip(enemyField) == False:
        print(game['fields'][0 if playerNum == 1 else 1]['id'], 'loses!')


if __name__ == '__main__':
    socketio.run(app, port=80)
