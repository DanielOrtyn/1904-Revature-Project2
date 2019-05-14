import { combineReducers } from "redux";
import { User } from "../model/user";
import { userReducer } from "./user.reducer";

export interface IUserState {
  currentUser?: User,
  errorMessage?: string
} 
export interface IState {
  auth: IUserState
}

export const state = combineReducers<IState>({
  auth: userReducer
})