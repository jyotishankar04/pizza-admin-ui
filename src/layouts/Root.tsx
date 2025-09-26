import { Outlet } from "react-router-dom"
import { self } from "../http/api"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store"
import { useEffect } from "react"


const getSelf = async () => {
  const res = await self()
  return res.data
}


const Root = () => {
  const { setUser } = useAuthStore()
  const { data: selfData,isLoading, isError,error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false,
  })    
  useEffect(() => {
    if(selfData) setUser(selfData)
  }, [selfData, setUser])
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>{error.message}</div>
  return (
    <><Outlet /></>
  )
}

export default Root