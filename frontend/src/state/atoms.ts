import {atom, RecoilState} from 'recoil';
import {User} from "../models";

export const userState:RecoilState<User | undefined> = atom({
    key: 'userState',
    default: undefined as User | undefined
});