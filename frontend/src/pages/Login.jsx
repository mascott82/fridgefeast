import { useState } from "react";
import '../styles/Login.css';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(email, password);  //TODO: this is for debug, SHOULD be removed
      //TODO: POST request to backend endpoint with login info -> axios
      onLogin({ email, password });
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
  
    return (
      <div className="login-background">
        <div className="login-container">
          <h1 className="login-title">LOG IN</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="button-container"><button type="submit" className="login-form-button">Login</button></div>
          </form>

          <div className="signup-redirect-container">
            <p className="signup-redirect">
            Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default Login;