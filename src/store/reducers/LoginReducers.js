import { UPDATE_USER_DATA } from '../types'
import { LOGOUT_USER } from '../types'


const initialState = {
    mobile:"",
    name:"",
    address:"",
    email:"",
    areaid:0,
    minbill:0,
    delcharge:0,
    dcupto:0,
    lat:0,
    lng:0,
    profile_status:""
}

export default function LoginDetails(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_DATA:

        return {
                mobile:action.data.mobile,
                name:action.data.name,
                address:action.data.address,
                email:action.data.email,
                areaid:action.data.areaid,
                minbill:action.data.minbill,
                delcharge:action.data.delcharge,
                dcupto:action.data.dcupto,
                lat:action.data.lat,
                lng:action.data.lng,
                profile_status:action.data.profile_status
            }
            
        case LOGOUT_USER:

        return {
            mobile:"",
            name:"",
            address:"",
            email:"",
            areaid:0,
            minbill:0,
            delcharge:0,
            dcupto:0,
            lat:0,
            lng:0,
            profile_status:""
        }
            
        default:
            return state
    }


}