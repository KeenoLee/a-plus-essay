import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Order } from "./pages/OrderStatus/OrderListPage";

export type AppParamList = {
    Tabs: undefined
    Chatroom: { id: number, token: string, title: string }
    'Home Drawer': undefined;
    Welcome: undefined;
    ChatList: undefined;
    'Success Register': undefined;
    'Order Submission': undefined;
    'Thank You': undefined;
    'Tutor Information': undefined;
    'Select Tutor': { order: Order };
    'Sign up': undefined;
    Register: undefined;
    Message: undefined;
    Status: undefined;
    // 'A Plus Essay': undefined
    'Login': undefined
    'Account': undefined
    'Pending': undefined
    'View Matched Order': { order: Order }
    'OrderList': { orderStatus: string }
    'About Us': undefined
    'Comment': undefined
}

export type AppRouteName = keyof AppParamList

export function useAppNavigation() {
    return useNavigation<NavigationProp<AppParamList, AppRouteName>>()

}