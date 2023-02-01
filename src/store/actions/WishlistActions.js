import {UPDATE_WISHLIST} from '../types'


export const updateWishlist =(data)=>{
    // console.warn("action",data)
    return {
        type:UPDATE_WISHLIST,
        data:data
    }
}