import React from 'react';
import './App.css';
import Navbar from './Navbar'
import Carousel from './Carousel'
import Home from './Home'
import Cart from './Cart';
import Footer from './Footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Productmain from './Productmain'
import Signin from './Signin';

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
            <Carousel/>
            <Home/>
            <Footer/>
          </Route>
          <Route path="/cart/:productId?">
            <Cart/>
          </Route>
          <Route path="/productpage/:productId">
            <Productmain/>
          </Route>
          <Route path="/signin">
            <Signin/>
          </Route>
        </Switch>
        </main> 
      </div>
    </BrowserRouter>
  );
}

export default App;
