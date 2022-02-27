import { Server } from 'socket.io';

export function connection(io: Server): void {
    io.on('connection', () => {
        console.log('connected');
    });
}
