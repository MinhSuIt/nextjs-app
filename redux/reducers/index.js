import auth from '@/redux/reducers/authReducer'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    auth: auth
})
export default rootReducer