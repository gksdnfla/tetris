import { Socket } from 'socket.io';

// Interfaces
import { UserDataInterface, UserInfoInterface } from './interface';

export function disconnect(socket: Socket, userData: UserDataInterface): void {
    socket.on('disconnect', () => {
        const id: string = <string>socket.id;
        const item: UserInfoInterface | undefined = <
            UserInfoInterface | undefined
        >Object.values(userData).find(
            (item: UserInfoInterface) => item.id === socket.id
        );

        if (item && item.name) {
            delete userData[item.name];
        }
    });
}
