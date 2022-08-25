def idGenerator(a, arr):
    temp = [None] * len(arr)
    i = 0
    while i < len(arr):
        temp[i] = arr[i]['id']
        i += 1
    return idGenerator(a + 1, arr) if a in temp else a


def getNumByParam(id, arr, param):
    i = 0
    while i < len(arr):
        if (id == arr[i][param]):
            return i
        i += 1


def getGameByUser(id, arr):
    i = 0
    while i < len(arr):
        if (id in arr[i]['players']):
            return i
        i += 1


def pPrint(arr):
    print()
    print('//////////////////////////////////////////////////////')
    print(arr)
    print('//////////////////////////////////////////////////////')
    print()


def printCell(state):
    stateToDisplay = {
        'empty': '_',
        'ship': '▢'
    }
    return stateToDisplay[state]

def checkIsThereShip(field):
    for el in field:
        if el['state'] == 'ship':
            return True
    return False