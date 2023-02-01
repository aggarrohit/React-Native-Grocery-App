import {combineReducers} from 'redux'
import cartItems from './CartReducers'
import wishlistItems from './WishlistReducers'
import setDataState from './StateReducers'
import LoginDetails from './LoginReducers'

export default combineReducers({
    cartItems,
    wishlistItems,
    setDataState,
    LoginDetails
})