import { type User } from "../store"

export const usePermissions = () =>{
    const allowedRoles = ['admin', 'manager']
    const _hasPermission = (user:User) =>{
        if(!user){
            return false
        }
        return allowedRoles.includes(user.role)
    } 

    return {
        isAllowed: _hasPermission
    }
    
    
}