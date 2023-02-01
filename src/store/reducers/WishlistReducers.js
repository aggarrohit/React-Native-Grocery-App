import { UPDATE_WISHLIST } from '../types'


const initialState = {
    cartData: []
}

export default function wishlistItems(state = [], action) {
    switch (action.type) {
        case UPDATE_WISHLIST:
            return action.data
                
            
        default:
            return state
    }


}