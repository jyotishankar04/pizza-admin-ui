import { useMutation, useQuery } from "@tanstack/react-query";
import {  getTanents, logout } from "../http/api";
import { useAuthStore } from "../store";

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            useAuthStore.getState().logout();
        },
    });
};


// Tanents
export const useGetTenants =()=>  useQuery({
    queryKey: ['tenants'],
    queryFn: getTanents,
})