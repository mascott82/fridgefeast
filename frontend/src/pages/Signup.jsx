import { useState } from "react";
import '../styles/Signup.css';

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState('');
    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(firstName, lastName, email, password, confirmPassword);
    };
    
    const handlePasswordChange = (e) => {
        if (e.target.value.length < 8) {
          setPasswordWarning('Password cannot be more than 8 characters.');
        } else {
          setPasswordWarning(''); // Clear the warning
        }
        setPassword(e.target.value);
      };
  
    return (
      <div className="signup-background">
        <div className="signup-container">
          <h1 className="signup-title">SIGN UP</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
              placeholder="Must be at least 8 characters"
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={8}
            />
            <button
              type="button" // Set type as button to prevent form submission
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {passwordWarning && <div className="password-warning">{passwordWarning}</div>}
          </div>
          <div className="password-container">
          <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
            <button
              type="button" // Set type as button to prevent form submission
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password-button"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
            <button type="submit" className="signup-form-button">Sign up</button>
          </form>
          <p className="login-redirect">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Signup;