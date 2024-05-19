import initialState from "./initialState";
import { API_URL } from "../config";
import axios from "axios";

//selectors
export const getAllAds = (state) => state.ads.data;
export const getAdById = ({ ads }, id) => ads.data.find((ad) => ad._id === id);
export const isLoadingAds = (state) => state.ads.pending;
export const isErrorAds = (state) => state.ads.error;

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const START_REQUEST = createActionName("START_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");
const LOAD_ADS = createActionName("LOAD_ADS");
const ADD_AD = createActionName("ADD_AD");
const EDIT_AD = createActionName("EDIT_AD");
const REMOVE_AD = createActionName("REMOVE_AD");

// action creators
export const startRequest = () => ({ type: START_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest);
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(loadAds(res.data));
    } catch (e) {
      dispatch(errorRequest({ error: e.message }));
    }
  };
};

export const getAllFoundAds = (searchPhrase) => {
  return async (dispatch) => {
    dispatch(startRequest);
    try {
      let res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`);
      //console.log("res in redux: ", res);
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      if (res.status === 200) {
        dispatch(loadAds(res.data));
      }
    } catch (e) {
      dispatch(errorRequest({ error: e.message }));
    }
  };
};

export const addAdRequest = (newAd) => {
  //console.log("added adv: ", newAd);
  return (dispatch) => {
    const fd = new FormData();
    fd.append("_id", newAd._id);
    fd.append("title", newAd.title);
    fd.append("adContent", newAd.adContent);
    fd.append("published", newAd.published);
    fd.append("adPhoto", newAd.adPhoto);
    fd.append("price", newAd.price);
    fd.append("location", newAd.location);
    fd.append("user", newAd.user);

    const options = {
      method: "POST",
      body: fd,
    };

    fetch(API_URL + "/ads", options).then(() => dispatch(addAd(newAd)));
  };
};

export const editAdRequest = (chosenAd) => {
  return (dispatch) => {
    //console.log("chosenAd: ", chosenAd);
    const fd = new FormData();
    //fd.append("_id", chosenAd._id);
    fd.append("title", chosenAd.title);
    fd.append("adContent", chosenAd.adContent);
    fd.append("published", chosenAd.published);
    fd.append("adPhoto", chosenAd.adPhoto);
    fd.append("price", chosenAd.price);
    fd.append("location", chosenAd.location);
    //fd.append("user", chosenAd.user);

    const options = {
      method: "PUT",
      body: fd,
    };

    fetch(API_URL + "/ads/" + chosenAd._id, options).then(() =>
      dispatch(editAd({ ...chosenAd, id: chosenAd }))
    );
  };
};

export const removeAdRequest = (id) => {
  //console.log("hello from delete: ", id);
  return (dispatch) => {
    const options = {
      method: "DELETE",
    };

    fetch(API_URL + "/ads/" + id, options).then(() => dispatch(removeAd(id)));
  };
};

const adsReducer = (statePart = initialState.ads, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        data: statePart.data,
        pending: true,
        error: null,
      };
    case LOAD_ADS:
      return {
        data: action.payload,
        pending: false,
        error: null,
      };
    case ERROR_REQUEST:
      return {
        data: statePart.data,
        pending: false,
        error: action.payload.error,
      };
    case ADD_AD:
      return {
        data: statePart.data,
        pending: false,
        error: action.payload.error,
      };
    case EDIT_AD:
      return {
        data: statePart.data.map((ad) =>
          ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
        ),
        pending: false,
        error: action.payload.error,
      };
    case REMOVE_AD:
      return {
        data: statePart.data.filter((ad) => ad.id !== action.payload),
        pending: false,
        error: false,
      };
    default:
      return statePart;
  }
};

export default adsReducer;
