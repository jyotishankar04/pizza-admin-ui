import type { CreateUserRequest, Tanent } from "../types"
import type { Credentials } from "../types"
import { api } from "./client"

export const login = async (credentials: Credentials) => api.post('/auth/login', credentials)
export const self = async () => api.get('/auth/self')
export const logout = async () => api.post('/auth/logout')

// users
export const getUsers = async (queryParams: string) => (await api.get(`/users?${queryParams}`)).data
export const createUser = async (user:CreateUserRequest) => api.post('/users', user)

// tanents
export const getTanents = async () => (await api.get<{data: {tanents: Tanent[]}}>('/tanents')).data
export const getTanent = async (id: string) => (await api.get(`/tanents/${id}`)).data