import React from 'react'
import Home from "./Pages/Home"
import ProductList from "./Pages/ProductList"
import Product from "./Pages/Product"
import Register from './Pages/Register'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Success from './Pages/Success'
import LandingPage from './Pages/landingPage/LandingPage'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { useSelector } from "react-redux"
import Order from './Pages/Orders'



const App = () => {

  const user = useSelector((state) => state.user.currentUser)
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  )
};

export default App;