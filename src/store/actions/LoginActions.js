import {UPDATE_USER_DATA} from '../types'
import {LOGOUT_USER} from '../types'


export const updateUserData =(data)=>{
    // console.warn("action",data)
    return {
        type:UPDATE_USER_DATA,
        data:data
    }
}

export const logoutUser =(data)=>{
    // console.warn("action",data)
    return {
        type:LOGOUT_USER,
        data:data
    }
}