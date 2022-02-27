import { Server } from 'socket.io';

import { connection } from './connection';

const arr = [connection];

export function init(io: Server): void {
    arr.forEach((fn: (io: Server) => void) => fn(io));
}
