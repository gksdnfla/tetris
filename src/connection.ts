import { Server, Socket } from 'socket.io';

import { disconnect } from './disconnect';
import { startGame } from './startGame';

// Interface
import { UserDataInterface } from './interface';

const arr: Array<(socket: Socket, userData: UserDataInterface) => void> = [
    disconnect,
    startGame,
];

export function connection(io: Server, userData: UserDataInterface): void {
    io.on('connection', (socket: Socket) => {
        arr.forEach(
            (fn: (socket: Socket, userData: UserDataInterface) => void) => {
                fn(socket, userData);
            }
        );
    });
}
