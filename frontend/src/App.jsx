import {useState} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {CookiesProvider, useCookies} from "react-cookie"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./components/Homepage"
import "./App.css"
import "./styles/Homepage.css"
import "./styles/NavigationBar.css"

function App() {
  const [cookies, setCookie] = useCookies(["user"])

  function handleLogin(user) {
    setCookie("user", user, {path: "/"})
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
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
