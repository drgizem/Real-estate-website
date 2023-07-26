import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Rent, RentLoader } from './components/Rent';
import { Buy, BuyLoader } from './components/Buy';
import { HomeLoader, HomePage } from './components/HomePage';
import { RentLayout } from './components/RentLayout';
import { HomePageSale, HomeSaleLoader } from './components/HomePageSale';
import { BuyLayout } from './components/BuyLayout';

function App() {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='admin' element={<Admin/>}/>
        <Route path="rent" element={<RentLayout/>} >
          <Route index element={<Rent/>} loader={RentLoader}/>
          <Route  path=':id' element={<HomePage/>} loader={HomeLoader} />
        </Route>
        <Route path="buy" element={<BuyLayout/>} >
          <Route index element={<Buy/>} loader={BuyLoader}/>
          <Route  path=':id' element={<HomePageSale/>} loader={HomeSaleLoader} />
        </Route>
      </Route>
    )
  )


  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
}

export default App;
