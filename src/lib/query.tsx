import { useMutation, useQuery } from "@tanstack/react-query";
import {  createUser, getTanents, logout } from "../http/api";
import { useAuthStore } from "../store";
import type { CreateUserRequest } from "../types";

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            useAuthStore.getState().logout();
        },
    });
};

// User mutation
export const useCreateUser = () => useMutation({
    mutationKey: ['createUser'],
    mutationFn: (user: CreateUserRequest) => createUser(user),
})



// Tanents
export const useGetTenants =()=>  useQuery({
    queryKey: ['tenants'],
    queryFn: getTanents,
})