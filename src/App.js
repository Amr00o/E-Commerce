import React from 'react'
import { RouterProvider, createHashRouter, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound/NotFound'
import AuthContextProvider from './Context/AuthContext'
import ProtctedRoute from './components/ProtctedRoute/ProtctedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Address from './components/Address/Address'
import Orders from './components/Orders/Orders'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import WishList from './components/WishList/WishList'


export default function App() {

  let routers = createHashRouter([
    {path: '', element: <Layout/>, children: [
      {path: '', element: <Navigate to={'home'}/>},
      {path: 'home', element: <ProtctedRoute><Home/></ProtctedRoute>},
      {path: 'login', element: <Login/>},
      {path: 'forgotPassword', element: <ForgotPassword/>},
      {path: 'register', element: <Register/>},
      {path: 'cart', element: <ProtctedRoute><Cart/></ProtctedRoute>},
      {path: 'brands', element: <ProtctedRoute><Brands/></ProtctedRoute>},
      {path: 'categories', element: <ProtctedRoute><Categories/></ProtctedRoute>},
      {path: 'address/:cartId', element: <ProtctedRoute><Address/></ProtctedRoute>},
      {path: 'allorders', element: <ProtctedRoute><Orders/></ProtctedRoute>},
      {path: 'ProductDetails/:id', element: <ProtctedRoute><ProductDetails/></ProtctedRoute>},
      {path: 'wishlist', element: <ProtctedRoute><WishList/></ProtctedRoute>},
      {path: '*', element: <NotFound/>},
    ]}
  ])

  return <>
  <AuthContextProvider>
    <RouterProvider router={routers}></RouterProvider>
  </AuthContextProvider>
  </>
}