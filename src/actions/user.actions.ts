import { environment } from "../environment";
import { User } from "../model/user";

export const userTypes = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    FAILED_TO_LOGIN: 'FAILED_TO_LOGIN',
    LOGGED_IN: 'LOGGED_IN',
    CHANGE_USER_FEILD: "CHANGE_USER"
}

export const login = (username: string, password: string, history: any) => async (dispatch) => {
    try {
        const resp = await fetch(environment.context + '/Auth/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username, password }),
            headers: {
                'content-type': 'application/json'
            }
        })
        if (resp.status === 401) {
            dispatch({
                type: userTypes.INVALID_CREDENTIALS
            })
        } else if (resp.status >= 200 && resp.status < 300) {
            const user = await resp.json();
            console.log(user);

            dispatch({
                payload: {
                    user
                },
                type: userTypes.CHANGE_USER_FEILD
            })
            history.push('/home');
        } else {
            dispatch({
                type: userTypes.FAILED_TO_LOGIN
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export const update = (newUser: User) => async (dispatch) => {
    dispatch({
        payload: {
            user: newUser
        },
        type: userTypes.CHANGE_USER_FEILD
    })
}