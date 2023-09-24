import { GET_LOGIN_FAILURE, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, POST_REGISTER_FAILURE, POST_REGISTER_REEQUEST, POST_REGISTER_SUCCESS, USER_LOGOUT } from "./actionTypes"


const initalValue={
    isLoading:false,
    isError:false,
    token:"",
    user:{}
}

export const UserReducer=(state=initalValue,action)=>
{
   switch(action.type)
   {
      case GET_LOGIN_REQUEST:return {...state,isLoading:true};
      case GET_LOGIN_SUCCESS: return {...state,isLoading:false,token:action.payload.token,user:action.payload.user}
      case GET_LOGIN_FAILURE: return {...state,isLoading:false,isError:true}
      case POST_REGISTER_REEQUEST:return {...state,isLoading:true};
      case POST_REGISTER_SUCCESS: return {...state,isLoading:false}
      case POST_REGISTER_FAILURE :return {...state,isLoading:false,isError:true}
      case USER_LOGOUT:return {...state,...initalValue}
      default : return state
   }
}