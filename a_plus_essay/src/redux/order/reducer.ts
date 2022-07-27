import { OrderActions } from "./actions"
import { OrderState } from "./type"

const initialState: OrderState = {}

export const orderReducer = (state: OrderState, action: OrderActions): OrderState => {
    console.log('order state: ', state)
    console.log('order action: ', action)
    if (action.type === '@@order/GET_CHAT_MESSAGE') {
        return {
            ...state,
            
        }
    }
    if (action.type === '@@order/UPDATE_ORDER') {
        return {
            ...state,
            newOrder: true
        }
    }
    if (action.type === '@@order/UPDATED_ORDER') {
        return {
            ...state,
            newOrder: false
        }
    }
    return initialState
}