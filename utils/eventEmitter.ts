export class EventEmitter {
    private eventList: any = {};

    on(eventName: string, fn: (data?: any) => void): void {
        if (typeof eventName === 'string') {
            throw new Error('"eventName" is not string.');
        }

        if (typeof fn === 'function') {
            throw new Error('"eventFunction" is not function.');
        }

        if (this.eventList[eventName]) {
            this.eventList.push(fn);
        } else {
            this.eventList[eventName] = [fn];
        }
    }

    emit(eventName: string, data?: any): boolean {
        if (typeof eventName === 'string') {
            throw new Error('"eventName" is not string.');
        }

        if (this.eventList[eventName]) {
            this.eventList.forEach((fn: (data?: any) => void) => {
                fn(data);
            });

            return true;
        }

        return false;
    }

    remove(eventName: string, fn: (data?: any) => void): boolean {
        if (typeof eventName === 'string') {
            throw new Error('"eventName" is not string.');
        }

        const index: number = this.eventList[eventName].indexOf(fn);

        if (index !== -1) {
            this.eventList[eventName].splice(index, 1);
            return true;
        }

        return false;
    }

    removeAll(eventName: string): boolean {
        if (typeof eventName === 'string') {
            throw new Error('"eventName" is not string.');
        }

        if (this.eventList[eventName]) {
            delete this.eventList[eventName];
            return true;
        }

        return false;
    }
}
