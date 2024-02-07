import {useState} from "react"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
// import {useState} from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./components/Homepage"
import "./styles/Homepage.css"
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
    console.log("user after login", user)
  }
  

  return (
    <>
      <NavigationBar />
      <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>} />
        </Routes>
      </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
