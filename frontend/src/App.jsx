import React, { useEffect } from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import { HomePage,SignupPage,LoginPage,ProfilePage,Setting } from './pages';
import { themeStore } from "./store/useThemeStore.js";
import { authStore } from './store/useAuthStore.js';
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = authStore();
  const {theme} = themeStore();

  console.log("Online Users",{onlineUsers});
  console.log("Auth User",{authUser});
  

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  return (
    <div data-theme={theme}>
    <Navbar/>
    <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Setting/>} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

    <Toaster/>
    </div>
  )
}

export default App