import { GET_LOGIN_FAILURE, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, POST_REGISTER_FAILURE, POST_REGISTER_REEQUEST, POST_REGISTER_SUCCESS, USER_LOGOUT } from "./actionTypes"
import axios from "axios"

export const userLogin=(data)=>dispatch=>
{
    
    dispatch({type:GET_LOGIN_REQUEST})
    return axios.post("http://localhost:3000/users/login",data).then((r)=>dispatch({type:GET_LOGIN_SUCCESS,payload:r.data}))
    .catch((err)=>dispatch({type:GET_LOGIN_FAILURE}))
}


export const userRegister=(data)=>dispatch=>
{
    dispatch({type:POST_REGISTER_REEQUEST})
    return axios.post("http://localhost:3000/users/register",data).then((r)=>dispatch({type:POST_REGISTER_SUCCESS,payload:r.data}))
    .catch((err)=>dispatch({type:POST_REGISTER_FAILURE}))
}
export const userLogout=()=>dispatch=>
{
   return dispatch({type:USER_LOGOUT})
}