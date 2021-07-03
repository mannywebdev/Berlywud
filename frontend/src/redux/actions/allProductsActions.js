import  { ALL_PRODUCTS_REQUEST ,ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL } from '../constants/allProductConstants'
import axios from 'axios'

// allProductsLoad Action
export const allProductsLoad = () => async(dispatch) =>{
    dispatch({type: ALL_PRODUCTS_REQUEST})
    try{
        const {data} = await axios.get('/api/products')
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload : data})
    }catch(error){
        dispatch({ type: ALL_PRODUCTS_FAIL, payload : error.message})
    }
}

//productDetails Action
export const productDetails = (productId) => async(dispatch) =>{
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    try{
        const {data} = await axios.get(`/api/products/${productId}`)
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
        '/api/products',
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
      const { data } = await axios.put(`/api/products/${product._id}`, product, {
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