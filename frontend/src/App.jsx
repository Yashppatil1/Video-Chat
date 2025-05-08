import {Navigate, Route  , Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import   {Toaster } from "react-hot-toast";
import { useEffect ,useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { axiosInstance } from './lib/axios.js';




const App = () => {
  // const { data:authData, isLoading, error } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get("/auth/me");
  //     return res.data;
  //   },
  //   retry : false , 
  // });

  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5001/api/auth/me", {
        method: "GET",
        credentials: "include", // this sends cookies!
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch auth user");
      }
  
      const data = await res.json();
      return data;
    },
    retry: false,
  });

  const authUser = authData?.user;

  console.log(authData);
  if (isLoading) return <div>Loading...</div>;
  

if (error) {
  console.error("AUTH ERROR", error);
  return <div>Error loading user data</div>;
}

 
    
 

  return (
    <div className="h-screen" data-theme="forest">
       
       
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login"/>}  />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/notifications" element={authUser ?<NotificationsPage /> : <Navigate to="/login"/>} />
        <Route path="/call" element={authUser ?<CallPage /> : <Navigate to="/login"/>} />
        <Route path="/chat" element={authUser ?<ChatPage /> : <Navigate to="/login"/>} />
        <Route path="/onboarding" element={authUser ?<OnboardingPage /> : <Navigate to="/login"/>} />
        
        

        
      </Routes>
      <Toaster /> 

    </div>
  );
}
export default App;
