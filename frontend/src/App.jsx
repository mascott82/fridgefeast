import {useState} from "react"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ProtectedRoute from "./pages/ProtectedRoute"
// import {useState} from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./components/Homepage"
import "./styles/Homepage.css"
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const RedirectTo =() =>{
  const navigate = useNavigate();
  navigate('/');
  return (<></>);
}

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(emailAndAuthToken) {
    setCookie("user", emailAndAuthToken, { path: "/" });
    console.log("After login: emailAndAuthToken = ", emailAndAuthToken)
  }
  

  return (
    <>
      <NavigationBar />
      <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={cookies.user == null ? <Login onLogin={handleLogin}/> : <RedirectTo />} />
          <Route element={<ProtectedRoute currentUser={cookies.user}/>}>
          </Route>
        </Routes>
      </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
