import type { Tanent } from "../store"
import type { Credentials } from "../types"
import { api } from "./client"

export const login = async (credentials: Credentials) => api.post('/auth/login', credentials)
export const self = async () => api.get('/auth/self')
export const logout = async () => api.post('/auth/logout')

// users
export const getUsers = async () => (await api.get('/users')).data

// tanents
export const getTanents = async () => (await api.get<{data: {tanents: Tanent[]}}>('/tanents')).data