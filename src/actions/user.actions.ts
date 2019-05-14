import { environment } from "../environment";
import { User } from "../model/user";

export const userTypes = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  FAILED_TO_LOGIN: 'FAILED_TO_LOGIN',
  LOGGED_IN: 'LOGGED_IN',
  CHANGE_USER_FEILD: "CHANGE_USER"
}

export const login = (username: string, password: string, history: any) => async(dispatch) => {
  try {
    const resp = await fetch(environment.context + '/users/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: {
        'content-type': 'application/json'
      }
    })
    console.log(resp);

    if (resp.status === 401) {
      dispatch({
        type: userTypes.INVALID_CREDENTIALS
      })
    } else if (resp.status === 200) {
      // redirect to spaceships page
      const user = await resp.json();
      dispatch({
        payload: {
          user
        },
        type: userTypes.LOGGED_IN
      })
      history.push('/spaceships');
    } else {
      dispatch({
        type: userTypes.FAILED_TO_LOGIN
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export const update = (newUser: User) => async(dispatch) => {
  dispatch({
    payload: {
      user: newUser
    },
    type: userTypes.CHANGE_USER_FEILD
  })
}