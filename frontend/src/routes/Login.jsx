import { useState } from "react";
import '../styles/Login.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const APIURL = 'http://0.0.0.0:3000/login' //TODO replace this with actual backend url, this one is Mock API url
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(email, password);  //TODO: this is for debug, SHOULD be removed
      axios.post(APIURL, {email:email, password:password}).then((response)=>{
        const returnAuthToken = response.data.authToken; //TODO backend will determine this name - authToken, in here use authToken
        console.log("returnAuthToken", returnAuthToken) // TODO remove later
        setAuthToken(returnAuthToken);
        onLogin({authToken:returnAuthToken, email:email});
        navigate('/')
      }).catch((error)=>{
        console.error('Error logging in:', error);
      })      
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
    )
  };
  
  export default Login;