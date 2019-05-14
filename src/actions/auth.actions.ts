import { environment } from "../environment";
import { userTypes } from "./user.actions";


export const login = (username: string, password: string, history: any) => async(dispatch) => {
  try {
    const resp = await fetch(environment.context + '/User', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: {
        'content-type': 'application/json'
      }
    })

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
        type: userTypes.CHANGE_USER_FEILD
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