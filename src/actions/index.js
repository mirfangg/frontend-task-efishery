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
// Add Product Constants
export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";
// Delete Product Constants
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";
// Edit Product Constants
export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_ERROR = "EDIT_PRODUCT_ERROR";
// Request Error Constant
export const REQUEST_ERROR = "REQUEST_ERROR";

const headers = {
  headers: { "Content-Type": "application/json" },
};

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

// Add Product
const addProductRequest = () => {
  return { type: ADD_PRODUCT_REQUEST };
};

const addProductSuccess = () => {
  return { type: ADD_PRODUCT_SUCCESS };
};

const addProductError = (error) => {
  return {
    type: ADD_PRODUCT_ERROR,
    payload: error,
  };
};

export const addProduct = (newData) => {
  return (dispatch) => {
    dispatch(addProductRequest());

    axios
      .post("/list", newData, headers)
      .then(() => dispatch(addProductSuccess()))
      .catch((error) => dispatch(addProductError(error.response.data)));
  };
};

// Delete Product
const deleteProductRequest = () => {
  return { type: DELETE_PRODUCT_REQUEST };
};

const deleteProductSuccess = () => {
  return { type: DELETE_PRODUCT_SUCCESS };
};

const deleteProductError = (error) => {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: error,
  };
};

export const deleteProduct = (deleteItem) => {
  return (dispatch) => {
    dispatch(deleteProductRequest());

    axios
      .delete("/list", { headers, data: deleteItem })
      .then(() => dispatch(deleteProductSuccess()))
      .catch((error) => dispatch(deleteProductError(error.response.data)));
  };
};

// Edit Product
const editProductRequest = () => {
  return { type: EDIT_PRODUCT_REQUEST };
};

const editProductSuccess = () => {
  return { type: EDIT_PRODUCT_SUCCESS };
};

const editProductError = (error) => {
  return {
    type: EDIT_PRODUCT_ERROR,
    payload: error,
  };
};

export const editProduct = (updatedData) => {
  return (dispatch) => {
    dispatch(editProductRequest());

    axios
      .put("/list", updatedData, headers)
      .then(() => dispatch(editProductSuccess()))
      .catch((error) => dispatch(editProductError(error.response.data)));
  };
};

export const requestError = () => {
  return { type: REQUEST_ERROR };
};
