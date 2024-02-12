import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { CookiesProvider, useCookies } from "react-cookie"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import Logout from "./routes/Logout"
import Favourites from "./routes/Favourites"
import SearchResults from "./routes/SearchResults"
import ProtectedRoute from "./routes/ProtectedRoute"
import Homepage from "./routes/Homepage"
import RecipePage from "./routes/RecipePage"
import NavigationBar from "./components/NavigationBar"
import "./App.css"
import "./styles/Homepage.css"
import "./styles/NavigationBar.css"
import "./styles/RecipeCard.css"

const RedirectTo = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const makeDelay = setTimeout(() => {
      navigate("/home")
    }, 100)
    return () => clearTimeout(makeDelay)
  }, [navigate])

  return <></>
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"])

  function handleLogin(userIdAndAuthToken) {
    // console.log("userIdAndAuthToken", userIdAndAuthToken)
    setCookie("user", userIdAndAuthToken, { path: "/", maxAge: 24 * 60 * 60 })
  }

  function handleLogout() {
    setCookie("user", null, { path: "/" })
    removeCookie("user", {"path":"/"})
    console.log('setCookie("user", null, { path: "/" })')
  }

  return (
    <>
      <NavigationBar />
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={
                cookies.user == null ? (
                  <Signup />
                ) : (
                  <RedirectTo />
                )
              } />
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
            <Route path="/searchResults" element={<SearchResults />} />
            <Route element={<ProtectedRoute currentUser={cookies.user} />}>
              <Route
                path="/favourites"
                element={<Favourites userIdAuthToken={cookies.user}/>}
              />
            </Route>
            <Route path="/home" element={<Homepage sessionCookie={cookies.user}/>} />
            <Route
              path="/logout"
              element={<Logout onLogout={handleLogout} />}
            />
            <Route path="/recipes/:id" element={<RecipePage />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
