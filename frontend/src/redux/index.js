import addToBasketReducer from './addToBasket'
import allProductsReducer from './allProducts'

const redux = require("redux")
const {combineReducers,createStore}= redux

const rootReducer = combineReducers({
    Basket: addToBasketReducer,
    AllProducts : allProductsReducer,
})

const store = createStore(rootReducer)
store.subscribe(() => {
   console.log(store.getState())
})

export default store
