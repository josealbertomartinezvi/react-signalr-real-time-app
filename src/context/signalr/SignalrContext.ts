import { HubConnection } from '@microsoft/signalr';
import { createContext } from 'react';

export enum SignalrActions {
    UPDATE_CONNECTION = 'update_connection',
}

export type UserType = {
    name: string | undefined;
    email: string | undefined;
};

export interface SignalrState{
    connectionInfo: HubConnection | undefined,
    roomState: number | undefined,
    user: UserType,
    room: string,
}

export type Action = {
    type: SignalrActions;
    payload: Partial<SignalrState>;
};

export type Dispatch = (action: Action) => void;

export type SignalrContextType = {
    signalr: SignalrState;
    dispatch: Dispatch;
};

export const defaultValueSignalrContext = {
    connectionInfo: undefined,
    roomState: undefined,
    user: {
        name: '',
        email: ''
    },
    room: '',
};

export const defaultValue = {
    signalr: defaultValueSignalrContext,
    dispatch() {},
}

const SignalrContext = createContext<SignalrContextType>(defaultValue);

export default SignalrContext;