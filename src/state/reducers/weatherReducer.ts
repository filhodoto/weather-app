export interface IWeatherState {
  timezone: any;
  location: string;
  temperature: number;
  icon: any;
  feedback: string;
  loading: boolean;
}

export const weatherInitialState: IWeatherState = {
  timezone: '',
  location: '',
  temperature: 0,
  icon: null,
  feedback: '',
  loading: true,
};

export const weatherReducer = (state: IWeatherState, action: any): any => {
  switch (action.type) {
    case 'FETCH_WEATHER_SUCCESS':
      const data = action.payload;
      console.log('called FETCH_WEATHER_SUCCESS');
      const test = {
        ...state,
        timezone: data.timezone,
        location: data.name,
        icon: data.weather[0].icon,
        temperature: data.main.temp,
        feedback: data.main.temp,
      };
      console.log('test ', test);
      return test;
    default:
      break;
  }
};
