import axios from "axios";
import { API_URL } from "../config";

/* INITIAL STATE */

//selectors
export const getAllAds = (state) => state.ads.data;
export const getAdById = ({ ads }, id) => ads.data.find((ad) => ad.id === id);
export const isLoadingAds = (state) => state.ads.request.pending;
export const isErrorAds = (state) => state.ads.request.error;

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const ADD_AD = createActionName("ADD_AD");
const EDIT_AD = createActionName("EDIT_AD");
const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");
const LOAD_ADS = createActionName("LOAD_ADS");

// action creators
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

/* THUNKS */
/*
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/ads`);
      console.log("res", res);
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      dispatch(loadAds(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};
*/
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: "START_REQUEST" }));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: "END_REQUEST" }));
    } catch (e) {
      dispatch(errorRequest({ name: "ERROR_REQUEST", error: e.message }));
    }
  };
};

export const addAdRequest = (newAd) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAd),
    };

    fetch(API_URL + "/ads", options).then(() => dispatch(addAd(newAd)));
  };
};

export const editAdRequest = (chosenAd) => {
  return (dispatch) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chosenAd),
    };

    fetch(API_URL + "/ads/" + chosenAd.id, options).then(() =>
      dispatch(editAd(chosenAd))
    );
  };
};

/* REDUCER */

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    default:
      return statePart;
  }
};

export default adsReducer;
