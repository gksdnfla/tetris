import { Socket } from 'socket.io';

// Interfaces
import { UserDataInterface } from './interface';

export function startGame(socket: Socket, userData: UserDataInterface): void {
    socket.on('startGame', (name: string) => {
        if (name) {
            if (!userData[name]) {
                userData[name] = {
                    id: socket.id,
                    renderData: initData(),
                    name,
                };
                socket.emit('canUseUsername');
            } else {
                socket.emit('nameIsDuplicate');
            }
        }
    });
}

function initData(): Array<number[]> {
    let arr: Array<number[]> = new Array(20).fill([0]);

    arr = arr.map(() => new Array(10).fill(0));

    return arr;
}
