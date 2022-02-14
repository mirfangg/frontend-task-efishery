import axios from "../utils/axios";

// Product List Constants
export const GET_PRODUCTS_LIST_REQUEST = "GET_PRODUCTS_LIST_REQUEST";
export const GET_PRODUCTS_LIST_SUCCESS = "GET_PRODUCTS_LIST_SUCCESS";
export const GET_PRODUCTS_LIST_ERROR = "GET_PRODUCTS_LIST_ERROR";
// Size Options Constants
export const GET_SIZE_OPTIONS_REQUEST = "GET_SIZE_OPTIONS_REQUEST";
export const GET_SIZE_OPTIONS_SUCCESS = "GET_SIZE_OPTIONS_SUCCESS";
export const GET_SIZE_OPTIONS_ERROR = "GET_SIZE_OPTIONS_ERROR";
// Area Options Constants
export const GET_AREA_OPTIONS_REQUEST = "GET_AREA_OPTIONS_REQUEST";
export const GET_AREA_OPTIONS_SUCCESS = "GET_AREA_OPTIONS_SUCCESS";
export const GET_AREA_OPTIONS_ERROR = "GET_AREA_OPTIONS_ERROR";

// const headers = {
//   headers: { "Content-Type": "application/json" },
// };

// Get Products List
const getProductsListRequest = () => {
  return { type: GET_PRODUCTS_LIST_REQUEST };
};

const getProductsListSuccess = (productsList) => {
  return {
    type: GET_PRODUCTS_LIST_SUCCESS,
    payload: productsList,
  };
};

const getProductsListError = (error) => {
  return {
    type: GET_PRODUCTS_LIST_ERROR,
    payload: error,
  };
};

export const getProductsList = () => {
  return (dispatch) => {
    dispatch(getProductsListRequest());

    axios
      .get("/list")
      .then((response) => dispatch(getProductsListSuccess(response.data)))
      .catch((error) => dispatch(getProductsListError(error.response.data)));
  };
};

// Get Size Options
const getSizeOptionsRequest = () => {
  return { type: GET_SIZE_OPTIONS_REQUEST };
};

const getSizeOptionsSuccess = (sizeOptionsList) => {
  return {
    type: GET_SIZE_OPTIONS_SUCCESS,
    payload: sizeOptionsList,
  };
};

const getSizeOptionsError = (error) => {
  return {
    type: GET_SIZE_OPTIONS_ERROR,
    payload: error,
  };
};

export const getSizeOptions = () => {
  return (dispatch) => {
    dispatch(getSizeOptionsRequest());

    axios
      .get("/option_size")
      .then((response) => dispatch(getSizeOptionsSuccess(response.data)))
      .catch((error) => dispatch(getSizeOptionsError(error.response.data)));
  };
};

// Get Area Options
const getAreaOptionsRequest = () => {
  return { type: GET_AREA_OPTIONS_REQUEST };
};

const getAreaOptionsSuccess = (areaOptionsList) => {
  return {
    type: GET_AREA_OPTIONS_SUCCESS,
    payload: areaOptionsList,
  };
};

const getAreaOptionsError = (error) => {
  return {
    type: GET_AREA_OPTIONS_ERROR,
    payload: error,
  };
};

export const getAreaOptions = () => {
  return (dispatch) => {
    dispatch(getAreaOptionsRequest());

    axios
      .get("/option_area")
      .then((response) => dispatch(getAreaOptionsSuccess(response.data)))
      .catch((error) => dispatch(getAreaOptionsError(error.response.data)));
  };
};
