import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
  </BrowserRouter>
    )
}

export default App
