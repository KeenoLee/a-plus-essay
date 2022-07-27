import { authReducer } from "./auth/reducer";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AuthState } from "./auth/type";
import { OrderState } from "./order/type";
import { orderReducer } from "./order/reducer";

export interface RootState {
    auth: AuthState
    order: OrderState
}

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
