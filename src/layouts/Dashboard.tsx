import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"

const Dashboard = () => {
    const {user} = useAuthStore()
    if(user === null){
        return <Navigate to="/auth/login" />     
    }

  return (
    <div className="">
        <h1>Dashboard</h1>  
        <Outlet/>
    </div>
  )
}

export default Dashboard