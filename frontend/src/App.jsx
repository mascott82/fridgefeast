import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import Favourites from "./routes/Favourites"
import SearchResults from "./routes/SearchResults"
import ProtectedRoute from "./routes/ProtectedRoute"
import "./App.css"
import { CookiesProvider, useCookies } from "react-cookie"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./routes/Homepage"
import "./styles/Homepage.css"
import "./styles/NavigationBar.css"

const RedirectTo = () => {
  const navigate = useNavigate()
  useEffect(()=>{    
    const makeDelay = setTimeout(() => {
      navigate("/")
    }, 100);
    return () => clearTimeout(makeDelay);
  },[navigate])
  
  return <></>
}

function App() {
  const [cookies, setCookie] = useCookies(["user"])

  function handleLogin(emailAndAuthToken) {
    setCookie("user", emailAndAuthToken, { path: "/" , maxAge: 24*60*60})
  }

  return (
    <>
      <NavigationBar />
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
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
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
