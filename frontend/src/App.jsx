<<<<<<< HEAD
// import {useState} from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
=======
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import SearchResults from "./routes/SearchResults"
import ProtectedRoute from "./routes/ProtectedRoute"
>>>>>>> main
import "./App.css"
import {CookiesProvider, useCookies} from "react-cookie"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./components/Homepage"
import "./styles/Homepage.css"
<<<<<<< HEAD


function App() {
  // const [count, setCount] = useState(0)
=======
import "./styles/NavigationBar.css"

const RedirectTo =() =>{
  const navigate = useNavigate();
  setTimeout(() =>{navigate('/')}, 100);
  return (<></>);
}

function App() {
  const [cookies, setCookie] = useCookies(["user"])

  function handleLogin(emailAndAuthToken) {
    setCookie("user", emailAndAuthToken, {path: "/"})
    console.log("After login: emailAndAuthToken = ", emailAndAuthToken)
  }
>>>>>>> main

  return (
    <>
      <NavigationBar />
<<<<<<< HEAD
      <Homepage />
=======
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={
                cookies.user == null ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <RedirectTo />
                )
              }
            />
            <Route element={<ProtectedRoute currentUser={cookies.user} />}>
              <Route path="/searchResults" element={<SearchResults />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
>>>>>>> main
    </>
  )
}

export default App
