import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import LunchItem from './components/LunchItem/LunchItem';
import BreakfastItem from './components/BreakfastItem/BreakfastItem';
import DinnerItem from './components/DinnerItem/DinnerItem';
import SingleFood from './components/SingleFood/SingleFood';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import OrderComplete from './components/OrderComplete/OrderComplete';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();
//export const cartContext=createContext();
function App() {
  const[loggedInUser,setLoggedInUser]=useState({
    isSignedIn:false
  })

  //const [cart,setCart]=useState([])
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/breakfast">
            <BreakfastItem></BreakfastItem>
            <Checkout></Checkout>
          </Route>
          <Route path="/lunch">
            <LunchItem></LunchItem>
            <Checkout></Checkout>
          </Route>
          <Route path="/dinner">
            <DinnerItem></DinnerItem>
            <Checkout></Checkout>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/singleFood/:foodId">
            <SingleFood></SingleFood>
          </Route>
          <Route exact path="/">
            <LunchItem></LunchItem>
            <Checkout></Checkout>
          </Route>
          <PrivateRoute exact path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <PrivateRoute exact path="/orderComplete">
            <OrderComplete></OrderComplete>
          </PrivateRoute>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
