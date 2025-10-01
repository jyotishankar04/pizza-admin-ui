import { Navigate, Outlet } from "react-router-dom"
import { self } from "../http/api"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store"
import { useEffect } from "react"
import LoadingComponent from "../components/Loading"
import { AxiosError } from "axios"


const getSelf = async () => {
  const res = await self()
  return res.data
}

const Root = () => {
  const { setUser } = useAuthStore()
  const { data: selfData, isLoading, isError, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    retry: (failureCount, error) => {
      if(error instanceof AxiosError && error.response?.status === 401) return false
      return failureCount < 2
    },
  })
  useEffect(() => {
    if (selfData) setUser(selfData.data)
  }, [selfData, setUser])
 useEffect(() => {
    if (isError) <Navigate to="/auth/login" replace={true} />
  }, [isError, error])
  if (isLoading) return <LoadingComponent size="xl" text="Loading..." />
  // if (isError) return <div>{error.message}</div>


  return (
    <><Outlet /></>
  )
}

export default Root