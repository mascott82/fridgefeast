import { useNavigate } from 'react-router-dom';
import { useEffect } from "react"

const Logout = ({onLogout}) => {
    // clear session cookie to null
    onLogout();
    // redirect to home
    const navigate = useNavigate()
    useEffect(()=>{    
      const makeDelay = setTimeout(() => {
        navigate("/")
      }, 100);
      return () => clearTimeout(makeDelay);
    },[navigate])
    
    return <></>
};
export default Logout