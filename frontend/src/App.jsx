import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import ProtectedRoute from "./routes/ProtectedRoute"
import "./App.css"
import {CookiesProvider, useCookies} from "react-cookie"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./components/Homepage"
import "./styles/Homepage.css"
import "./styles/NavigationBar.css"

const RedirectTo =() =>{
  const navigate = useNavigate();
  setTimeout(() =>{navigate('/')}, 100);
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
          <Route path="/login" element={cookies.user == null ? <Login onLogin={handleLogin}/> : <RedirectTo/>} />
          <Route element={<ProtectedRoute currentUser={cookies.user}/>}>
          </Route>
        </Routes>
      </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
