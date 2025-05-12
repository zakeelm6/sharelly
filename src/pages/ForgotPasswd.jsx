import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/SigningPage.css";


const PageName = () => {
    const navigate = useNavigate();
    const goToOtp = () => {
        navigate('/otp'); }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fullscreen">
        <div className="parent-container">
            <div className="child left-container">
                <div className="top-left">
                    <img src="./logo.png" />
                    <h1>SHARELY</h1>
                </div>
            </div>

            <div className="child right-container">
                <div className="top-right">
                    <h1>Resetting Password</h1>
                    <h5>{""}</h5>
                    <div className="info-inputs">
                        <div className="email-password-inputs">
                            <input  type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                        </div>
                        <div className="invalid-email">
                            <a className="terms-link" style={{ color: 'red' }}>
                                Invalid Email
                            </a>
                        </div>
                    </div>
                <div onClick={goToOtp} className="signup-button">
                    Reset my Password
                </div>
            </div>

            </div>
        </div>
    </div>
  );
};

export default PageName;
