import {
  GET_PRODUCTS_LIST_REQUEST,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_ERROR,
  GET_SIZE_OPTIONS_REQUEST,
  GET_SIZE_OPTIONS_SUCCESS,
  GET_SIZE_OPTIONS_ERROR,
  GET_AREA_OPTIONS_REQUEST,
  GET_AREA_OPTIONS_SUCCESS,
  GET_AREA_OPTIONS_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  REQUEST_ERROR,
} from "../actions";

let initialState = {
  productsList: [],
  sizeOptionsList: [],
  areaOptionsList: [],
  isLoading: false,
  isLoadingButton: false,
  isLoadingComponent: false,
  isRequestSuccess: null,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        productsList: action.payload,
        isLoading: false,
      };

    case GET_PRODUCTS_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_SIZE_OPTIONS_REQUEST:
      return {
        ...state,
        isLoadingComponent: true,
      };

    case GET_SIZE_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoadingComponent: false,
        sizeOptionsList: action.payload,
      };

    case GET_SIZE_OPTIONS_ERROR:
      return {
        ...state,
        isLoadingComponent: false,
        error: action.payload,
      };

    case GET_AREA_OPTIONS_REQUEST:
      return {
        ...state,
        isLoadingComponent: true,
      };

    case GET_AREA_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoadingComponent: false,
        areaOptionsList: action.payload,
      };

    case GET_AREA_OPTIONS_ERROR:
      return {
        ...state,
        isLoadingComponent: false,
        error: action.payload,
      };

    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingButton: true,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoadingButton: false,
        isRequestSuccess: true,
      };

    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingButton: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isRequestSuccess: true,
        isLoadingButton: false,
      };

    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      };

    case REQUEST_ERROR: {
      return {
        ...state,
        isRequestSuccess: null,
        error: null,
      };
    }

    case EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingButton: true,
      };

    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoadingButton: false,
        isRequestSuccess: true,
      };

    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
