import { SET_IS_SEARCH } from '../types'


const initialState = {
    isSearch: false
}

export default function setDataState(state = false, action) {
    switch (action.type) {
        case SET_IS_SEARCH:
            return action.data
                
            
        default:
            return state
    }


}