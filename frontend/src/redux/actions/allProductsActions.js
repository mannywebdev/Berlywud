import  { ALL_PRODUCTS_REQUEST ,ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL } from '../constants/allProductConstants'
import axios from 'axios'
import { API_BASE_URL } from '../../Config.js'

// allProductsLoad Action
export const allProductsLoad = ({pageNumber = '',name='',category='',min=0,max=0,rating=0,order = ''}) => async(dispatch) =>{
    dispatch({type: ALL_PRODUCTS_REQUEST})
    try{
        const {data} = await axios.get(API_BASE_URL + `/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`)
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload : data})
    }catch(error){
        dispatch({ type: ALL_PRODUCTS_FAIL, payload : error.message})
    }
}

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(API_BASE_URL + `/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

//productDetails Action
export const productDetails = (productId) => async(dispatch) =>{
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    try{
        const {data} = await axios.get(API_BASE_URL + `/api/products/${productId}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL , payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST  });
    const {
      UserSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        API_BASE_URL + '/api/products',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
      UserSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(API_BASE_URL + `/api/products/${product._id}`, product, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message = 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      UserSignin: { userInfo },
    } = getState();
    try {
      const { data } = axios.delete(API_BASE_URL + `/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};

export const createReview = (productId, review) => async (dispatch,getState) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  const {UserSignin: { userInfo },} = getState();
  try {
    const { data } = await axios.post(API_BASE_URL + `/api/products/${productId}/reviews`,review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};