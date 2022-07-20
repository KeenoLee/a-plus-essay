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

export type OrderActions = 
ReturnType<typeof getChatMessage>

export function fetchChatMessage(userId: number, is_Tutor: boolean) {
    return async (dispatch: Dispatch<OrderActions>) => {
        const res = await fetch(`${env.BACKEND_URL}/chat-message/${userId}/${is_Tutor}`)
        const result = await res.json()
        console.log('result from fetch chat message: ', result)

    }
}