import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Adjust the path if needed
import SigningPage from './pages/SigningPage'
import ForgotPasswd from './pages/ForgotPasswd'
import OTP from './pages/OTP'
import FilePage from './pages/FilePage'; 
import EditProfileForm from './pages/EditProfileForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SigningPage />} />
        <Route path="/signin" element={<SigningPage />} />
        <Route path="/forgotpasswd" element={<ForgotPasswd />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/filepage" element={<FilePage />} />
        <Route path="/EditProfileForm" element={<EditProfileForm />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
