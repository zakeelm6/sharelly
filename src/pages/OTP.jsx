import React, { useState } from 'react';
import "./styles/SigningPage.css";


const PageName = () => {
  const [formData, setFormData] = useState({
    otp: ''
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
                    <h1>Enter your OTP</h1>
                    <h5>{""}</h5>
                    <div className="info-inputs">
                        <div className="email-password-inputs">
                            <input  type='text'
                                    id="otp"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                        </div>
                    </div>
                <div href="/signup-process" className="signup-button">
                    Confirm
                </div>
            </div>

            </div>
        </div>
    </div>
  );
};

export default PageName;
