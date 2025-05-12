import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./styles/SigningPage.css";


const PageName = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const goToForgotPasswd = () => { navigate("/forgotpasswd") }

  const [isSwapped, setIsSwapped] = useState(location.pathname === '/signin');
  const handleToggle = () => {
    if (isSwapped) {
      navigate('/signup'); // Switch to sign up
      setIsSwapped(false);
    } else {
      navigate('/signin'); // Switch to sign in
      setIsSwapped(true);
    }
  };

  useEffect(() => {
    if (location.state && typeof location.state.showSignIn === 'boolean') {
      setIsSwapped(location.state.showSignIn);
    }
  }, [location.state]);

  const [isChecked, setIsChecked] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="fullscreen">
      {!isSwapped ? (
      <>
        <div className="parent-container">
          <div className="child left-container">
            <div className="top-left">
              <img src="./logo.png" />
              <h1>SHARELY</h1>
            </div>
          </div>

          <div className="child right-container">
            <div className="top-right">
              <h1>Create an account</h1>
              <h5>Already have an account? {""}
                <a href="#" onClick={handleToggle} className="signin-link">
                  Sign In
                </a></h5>
              <div className="info-inputs">
                <div className="first-last-name">
                  <input  type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          required
                    />
                  <input  type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          required
                    />
                </div>
                <div className="email-password-inputs">
                  <input  type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                    />
                  <input  type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter Password"
                          required
                    />
                  <input  type="password"
                          id="retyped-password"
                          name="retyped-password"
                          value={formData.retyped}
                          onChange={handleChange}
                          placeholder="Re-enter Password"
                          required
                    />
                </div>
              </div>

              <div className="terms-container">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  className="terms-checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="terms-checkbox" className="terms-label">
                  I agree to the{' '}
                  <a href="/terms" className="terms-link">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button onClick={() => navigate("/filepage")} className="signup-button">Create account</button>
              <div className="divider-with-text">
                <span>Or register with</span>
              </div>
              <div className="google-apple-button">
                <div href="/google-signup" className="google-button">
                  <img src="/google-icon.png" />
                  <h5>Google</h5>
                </div>
                <div href="/apple-signup" className="apple-button">
                  <img src="/apple-icon.png" />
                  <h5>Apple</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        ) : (
        <>
          <div style={{flexDirection: 'row-reverse'}} className="parent-container">
            <div style={{ transform: 'rotate(180deg)',
                          transformOrigin: 'center center', }} className="child left-container">
              <div className="top-left">
                <img src="./logo.png" />
                <h1>SHARELY</h1>
              </div>
            </div>

            <div className="child right-container">
              <div className="top-right">
                <h1>You again? 😐</h1>
                <h5>Don't have an account yet? {""}
                  <a href="#" onClick={handleToggle} className="signin-link">
                    Sign Up
                  </a></h5>
                
                  <div className="email-password-inputs">
                    <input  type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                      />
                    <input  type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                      />
                </div>

                <div className="forgot-container">
                  <a onClick={goToForgotPasswd} className="terms-link" style={{ cursor: 'pointer' }}>
                    Forgot password?
                  </a>
                </div>

                <div href="/signup-process" className="signup-button">
                  Sign In
                </div>
                <div className="divider-with-text">
                  <span>Or sign in with</span>
                </div>
                <div className="google-apple-button">
                  <div href="/google-signup" className="google-button">
                    <img src="/google-icon.png" />
                    <h5>Google</h5>
                  </div>
                  <div href="/apple-signup" className="apple-button">
                    <img src="/apple-icon.png" />
                    <h5>Apple</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PageName;
