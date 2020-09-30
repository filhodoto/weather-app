export interface IAppState {
  loading: boolean;
}

export const initialAppState: IAppState = {
  loading: true,
};

export const appReducer = (state: IAppState, action: any): any => {
  console.log('action ', action);
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      console.log('OTHER ACTION TYPE');
      break;
  }
};
