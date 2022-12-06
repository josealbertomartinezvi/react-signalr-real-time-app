import React, { useReducer } from 'react';
import SignalrContext, { defaultValueSignalrContext } from './SignalrContext';
import SignalrReducer from './SignalrReducer';

interface SignalrProviderProps {
    children: React.ReactNode;
}

const SignalrProvider: React.FunctionComponent<SignalrProviderProps> = ({ children }) => {

    const [signalr, dispatch] = useReducer(SignalrReducer, defaultValueSignalrContext);

    return (
        <SignalrContext.Provider value={{ signalr, dispatch }}>
            { children }
        </SignalrContext.Provider>
    )
}

export default SignalrProvider;