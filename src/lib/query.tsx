import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
import { useAuthStore } from "../store";

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            useAuthStore.getState().logout();
        },
    });
};