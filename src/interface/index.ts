export interface UserDataInterface {
    [name: string]: UserInfoInterface;
}

export type UserInfoInterface = {
    id: string;
    name: string;
    renderData: Array<number[]>;
};
