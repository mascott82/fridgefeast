
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import NavigationBar from "./components/NavigationBar"


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <NavigationBar />
  <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
  </BrowserRouter>
  </>
    )
}

export default App
