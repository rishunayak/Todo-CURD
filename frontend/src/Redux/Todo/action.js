import axios from "axios"
import { DELETE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS, PATCH_TODO_FAILURE, PATCH_TODO_REQUEST, PATCH_TODO_SUCCESS, POST_TODO_FAILURE, POST_TODO_REQUEST, POST_TODO_SUCCESS } from "./actionTypes"



export const getTodo=()=>dispatch=>
{
   dispatch({type:GET_TODO_REQUEST})
   return axios.get("http://localhost:3000/todos",{headers:{token:sessionStorage.getItem("token")}}).then((r)=>dispatch({type:GET_TODO_SUCCESS,payload:r.data}))
   .catch((err)=>dispatch({type:GET_TODO_FAILURE}))
}


export const postTodo=(todo)=>dispatch=>
{
   dispatch({type:POST_TODO_REQUEST})
   return axios.post("http://localhost:3000/todos",todo,{headers:{token:sessionStorage.getItem("token")}})
   .then((r)=>dispatch({type:POST_TODO_SUCCESS,payload:r.data}))
   .catch((err)=>dispatch({type:POST_TODO_FAILURE}))
}

export const patchTodo=(todo)=>dispatch=>
{
    
    console.log(sessionStorage.getItem("token"))
   dispatch({type:PATCH_TODO_REQUEST})
   return axios.patch(`http://localhost:3000/todos/${todo._id}`,todo,{headers:{token:sessionStorage.getItem("token")}})
   .then((r)=>dispatch({type:PATCH_TODO_SUCCESS,payload:todo,msg:r.data}))
   .catch((err)=>dispatch({type:PATCH_TODO_FAILURE}))
}

export const deleteTodo=(id)=>dispatch=>
{
   dispatch({type:DELETE_TODO_REQUEST})
   return axios.delete(`http://localhost:3000/todos/${id}`,{headers:{token:sessionStorage.getItem("token")}}).then((r)=>dispatch({type:DELETE_TODO_SUCCESS,payload:id,msg:r.data}))
   .catch((err)=>dispatch({type:DELETE_TODO_FAILURE}))
}
