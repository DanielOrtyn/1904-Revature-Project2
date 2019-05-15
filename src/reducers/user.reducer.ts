import { userTypes } from "../actions/user.actions";
import { IUserState } from ".";



const initialState: IUserState = {
  currentUser: undefined,
  errorMessage: undefined
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.FAILED_TO_LOGIN:
      return {
        ...state,
        errorMessage: 'Failed to Login try again later.'
      }
    case userTypes.INVALID_CREDENTIALS:
      return {
        ...state,
        errorMessage: 'Invalide Credentials'
      }
    case userTypes.LOGGED_IN:
      return {
        ...state,
        currentUser: action.payload.user
      }
    case userTypes.CHANGE_USER_FEILD:
      return {
        ...state,
        currentUser: action.payload.user
      }
    case userTypes.LOG_OUT:
      return {
        ...state,
        currentUser: null
      }
    default:

  }
  return state;
}