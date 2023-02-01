import {SET_IS_SEARCH} from '../types'


export const setIsSearch =(data)=>{
    // console.warn("action",data)
    return {
        type:SET_IS_SEARCH,
        data:data
    }
}