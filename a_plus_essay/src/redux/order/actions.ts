import { Dispatch } from "redux"
import { env } from "../../env/env"
import { ChatMessage, OrderInfo } from "./type"

function getChatMessage(orderInfo: OrderInfo, chatMessage: ChatMessage) {
    return {
        type: '@@order/GET_CHAT_MESSAGE',
        orderInfo,
        chatMessage
    }
}
export function updateOrder() {
    return {
        type: '@@order/UPDATE_ORDER'
    }
}
export function updatedOrder() {
    return {
        type: '@@order/UPDATE_ORDER'
    }
}

export type OrderActions = 
ReturnType<typeof getChatMessage> |
ReturnType<typeof updateOrder> |
ReturnType<typeof updatedOrder>

export function fetchChatMessage(userId: number, is_Tutor: boolean) {
    return async (dispatch: Dispatch<OrderActions>) => {
        const res = await fetch(`${env.BACKEND_URL}/chat-message/${userId}/${is_Tutor}`)
        const result = await res.json()
        console.log('result from fetch chat message: ', result)

    }
}