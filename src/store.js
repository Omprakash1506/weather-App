import { createStore, combineReducers } from "redux";

export const setWeatherData = (data) => ({
  type: "GET_WEATHER_DATA",
  payload: data
});

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_WEATHER_DATA":
      return {
        ...state,
        weatherdata: action.payload
      };
    default:
      return { ...state };
  }
};

const rootReducer = combineReducers({
  reducer
});

const store = createStore(rootReducer);

export default store;
