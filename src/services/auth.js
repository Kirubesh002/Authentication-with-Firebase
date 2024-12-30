import { getUserData, removeUserData } from "./storage"


export const Authenticated =()=>{
    return getUserData() !=null ? true :false
}
export const logout = ()=>{
    removeUserData();
}