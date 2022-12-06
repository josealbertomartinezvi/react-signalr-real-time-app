import { Action, SignalrActions, SignalrState } from './SignalrContext';

const SignalrReducer = (state: SignalrState, action: Action) => {
    
  switch (action.type) {
    case SignalrActions.UPDATE_CONNECTION:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export default SignalrReducer;