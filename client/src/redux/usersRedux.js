import initialState from "./initialState";
import { API_URL } from "../config";
import axios from "axios";

//selectors
export const getUser = (state) => state.user;

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");
const LOAD_USER = createActionName("LOAD_USER");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

// action creators
const usersReducer = (statePart = initialState.user, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        login: action.payload.login,
        id: action.payload.id,
        avatar: action.payload.avatar,
      };
    case LOG_OUT:
      return {
        login: null,
        id: null,
        avatar: null,
      };
    case LOAD_USER:
      return {
        login: action.payload.login,
        id: action.payload.id,
        avatar: action.payload.avatar,
      };
    case ERROR_REQUEST:
      return {
        login: null,
        id: null,
        avatar: null,
      };
    default:
      return statePart;
  }
};

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });
export const loadUser = (payload) => ({ payload, type: LOAD_USER });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadLoggedUser = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}/user`, { withCredentials: true });
      if (res.data) {
        dispatch(loadUser(res.data));
      } else {
        dispatch(loadUser({ login: null, id: null, avatar: null }));
      }
    } catch (e) {
      dispatch(errorRequest({ error: e.message }));
    }
  };
};

export default usersReducer;
