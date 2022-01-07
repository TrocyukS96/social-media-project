import {Dispatch} from "redux";
import {authAPI} from "../components/api/api";
import {stopSubmit} from "redux-form";

type AuthType = {
    id: any,
    email: any,
    login: any,
    isAuth:boolean

}


const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth:false
}
type setAuthUsersDataAT = ReturnType<typeof setAuthUsersData>

type ActionsType = setAuthUsersDataAT
export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case "SET_AUTH_USERS_DATA": {
            return {
                ...state, ...action.payload,
            }
        }

        default:
            return state
    }
}
export const setAuthUsersData = (id: any, email: any, login: any, isAuth:boolean) => {
    return ({type: "SET_AUTH_USERS_DATA", payload: {id, email, login, isAuth}} as const)

}

//thunks
export const getAuthData = () => (dispatch:Dispatch) => {
    debugger
    authAPI.me()

        .then(data => {
            if (data.resultCode === 0) {
                debugger
                let {email, id,login} = data.data
                dispatch(setAuthUsersData(id, email, login, true))
            }
        })
}
export const login = (email:string, password:string, rememberMe:boolean = false) => (dispatch:any) => {
    authAPI.loginUser(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {

                dispatch(getAuthData())
            }else{
                let message = response.data.messages.length>0 ? response.data.messages : 'some Error'
                dispatch(stopSubmit('loginForm', {_error:message}))
            }
        })
}
export const logOut = () => (dispatch:Dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {

                dispatch(setAuthUsersData(null, null, null, false))
            }
        })
}

///возвращаемое значение мы типизируем после круглых кавычек в функциях
