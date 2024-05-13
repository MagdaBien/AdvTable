import initialState from "./initialState";

//selectors
export const getUser = (state) => state.user;

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");

// action creators
const usersReducer = (statePart = initialState.user, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = (payload) => ({ type: LOG_OUT, payload });

export default usersReducer;
