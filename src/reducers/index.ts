import { combineReducers } from "redux";
import { User } from "../model/user";
import { userReducer } from "./user.reducer";
import { SaleItem } from "../model/saleItem";
import { salesReducer } from "./sales.reducer";

export interface IUserState {
  currentUser?: User;
  errorMessage?: string;
}

export interface ISalesState {
  displayItem?: SaleItem;
} 

export interface IState {
  auth: IUserState;
  sales: ISalesState;
}

export const state = combineReducers<IState>({
  auth: userReducer,
  sales: salesReducer
})