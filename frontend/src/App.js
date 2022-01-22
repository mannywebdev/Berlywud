import React from 'react';
import './App.css';
import Navbar from './Navbar'

import Home from './Home'
import Cart from './Cart';
import Footer from './Footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Productmain from './Productmain'
import Signin from './Signin';
import Register from './Register';
import Shippingaddress from './Shippingaddress';
import Payment from './Payment';
import Orderdetails from './Orderdetails';
import Orderhistory from './Orderhistory';
import Myprofile from './Myprofile';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';
import OrderList from './OrderList';
import UserList from './UserList';
import UserEdit from './UserEdit';
import Searchscreen from './Searchscreen';
import Carousel ,{CarouselItem} from './Carousel'
import i1 from './images/i1.png'
import i2 from './images/i2.png'
import i3 from './images/i3.png'
import i4 from './images/i4.png'
import bannermain from './images/bannermain.png'

function App() { 
  return(
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar/>
        </header>
        <main>
        <Switch>
          <Route exact path="/">
            <Carousel>
              <CarouselItem><img className="carouselimg" src={bannermain} alt=""/></CarouselItem>
              {/* <CarouselItem><img className="carouselimg" src={i2} alt=""/></CarouselItem>
              <CarouselItem><img className="carouselimg" src={i3} alt=""/></CarouselItem>
              <CarouselItem><img className="carouselimg" src={i1} alt=""/></CarouselItem> */}
            </Carousel>
            <Home/>
            <Footer/>
          </Route>
          <Route path="/cart/:productId?">
            <Cart/>
          </Route>
          <Route exact path="/productpage/:productId">
            <Productmain/>
          </Route>
          <Route exact path="/productpage/:productId/edit">
            <ProductEdit/>
          </Route>
          <Route path="/shipping">
            <Shippingaddress/>
          </Route>
          <Route path="/payment">
            <Payment/>
          </Route>
          <Route path="/order/:id">
            <Orderdetails/>
          </Route>
          <Route path="/orderhistory">
            <Orderhistory/>
          </Route>
          <Route path="/signin">
            <Signin/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route exact path="/search/name/:name?">
            <Searchscreen/>
          </Route>
          <Route exact path="/search/category/:category">
            <Searchscreen/>
          </Route>
          <Route exact path="/search/category/:category/name/:name">
            <Searchscreen/>
          </Route>
          <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber">
            <Searchscreen/>
          </Route>
          <PrivateRoute component={Myprofile} path="/profile"></PrivateRoute>
          <AdminRoute component={ProductList} path="/productlist"></AdminRoute>
          <AdminRoute component={ProductList} path="/productlist/pageNumber/:pageNumber"></AdminRoute>
          <AdminRoute component={OrderList}  path="/orderlist"></AdminRoute>
          <AdminRoute component={UserList}  path="/userlist"></AdminRoute>
          <AdminRoute component={UserEdit} path="/user/:id/edit"></AdminRoute>
        </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
