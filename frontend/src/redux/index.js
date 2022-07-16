import {
  allProductsReducer,
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from "./reducer/allProductsReducer";
import thunk from "redux-thunk";
import { cartReducer } from "./reducer/cartReducers";
import {
  resetPasswordReducer,
  sendEmailForResetPasswordReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducer/userReducer";
import {
  myOrdersListReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducer/orderReducers";

const redux = require("redux");
const { combineReducers, createStore, compose, applyMiddleware } = redux;

const initialState = {
  UserSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  Cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
};
const rootReducer = combineReducers({
  AllProducts: allProductsReducer,
  ProductDetails: productDetailsReducer,
  Cart: cartReducer,
  UserSignin: userSigninReducer,
  SendResetPassword: sendEmailForResetPasswordReducer,
  ResetPassword: resetPasswordReducer,
  UserRegister: userRegisterReducer,
  OrderCreate: orderCreateReducer,
  OrderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  MyOrders: myOrdersListReducer,
  UserDetails: userDetailsReducer,
  UserUpdateProfile: userUpdateProfileReducer,
  ProductCreate: productCreateReducer,
  ProductUpdate: productUpdateReducer,
  ProductDelete: productDeleteReducer,
  OrderList: orderListReducer,
  OrderDelete: orderDeleteReducer,
  OrderDeliver: orderDeliverReducer,
  UserList: userListReducer,
  UserDelete: userDeleteReducer,
  UserUpdate: userUpdateReducer,
  ProductCategoryList: productCategoryListReducer,
  ProductReviewCreate: productReviewCreateReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
