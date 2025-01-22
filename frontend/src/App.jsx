import React from 'react';
import {Routes,Route} from "react-router-dom";
import { HomePage,SignupPage,LoginPage,ProfilePage,Setting } from './pages';
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
    <Navbar/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/settings' element={<Setting/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>

    </Routes>

    <Toaster/>
    </div>
  )
}

export default App