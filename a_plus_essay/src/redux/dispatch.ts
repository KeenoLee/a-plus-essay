import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";
import { AuthActions } from "./auth/actions";
import { OrderActions } from "./order/actions";

export type AppActions = AuthActions | OrderActions
export type AppDispatch = ThunkDispatch<RootState, {} ,AppActions>