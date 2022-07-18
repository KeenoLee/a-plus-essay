import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";
import { AuthActions } from "./auth/actions";

export type AppActions = AuthActions
export type AppDispatch = ThunkDispatch<RootState, {} ,AppActions>