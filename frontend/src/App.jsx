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
    </>
  )
}

export default App
