import React from 'react';
import './App.css';
import Navbar from './Navbar'
import Carousel from './Carousel'
import Home from './Home'
import Checkout from './Checkout';
import Footer from './Footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Productmain from './Productmain'

function App() {
 
  
  return(
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar/>
            <Carousel/>
            <Home/>
            <Footer/>
          </Route>
          <Route path="/checkout">
            <Navbar/>
            <Checkout/>
          </Route>
          <Route path="/productpage/:productId">
            <Navbar/>
            <Productmain/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
