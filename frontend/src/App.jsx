import {useState} from "react"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
// import {useState} from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import NavigationBar from "./components/NavigationBar"
import Homepage from "./components/Homepage"
import "./styles/Homepage.css"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar />
      <Homepage />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
