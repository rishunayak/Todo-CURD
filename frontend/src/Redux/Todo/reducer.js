import { DELETE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS, PATCH_TODO_FAILURE, PATCH_TODO_REQUEST, PATCH_TODO_SUCCESS, POST_TODO_FAILURE, POST_TODO_REQUEST, POST_TODO_SUCCESS } from "./actionTypes"


const initalValue={
    isLoading:false,
    isError:false,
    todos:[]
}


export const TodoReducer=(state=initalValue,action)=>
{
    switch(action.type)
    {
        case GET_TODO_REQUEST : return {...state,isLoading:true}
        case GET_TODO_SUCCESS : return {...state,isLoading:false,todos:action.payload}
        case GET_TODO_FAILURE : return {...state,isLoading:false,isError:true}

        case PATCH_TODO_REQUEST : return {...state,isLoading:true}
        case PATCH_TODO_SUCCESS :{
            console.log(action.payload)
            const updatedTodo=state.todos.map((ele)=>{
                if(ele._id==action.payload._id)
                {
                    return action.payload
                }else{return ele}
            })
            return {...state,isLoading:false,todos:[...updatedTodo]}
        } 
        case PATCH_TODO_FAILURE : return {...state,isLoading:false,isError:true}

        case POST_TODO_REQUEST : return {...state,isLoading:true}
        case POST_TODO_SUCCESS : return {...state,isLoading:false,todos:[...state.todos,action.payload.todo]}
        case POST_TODO_FAILURE : return {...state,isLoading:false,isError:true}

        case DELETE_TODO_REQUEST : return {...state,isLoading:true}
        case DELETE_TODO_SUCCESS :
         {
             const updatedTodo=state.todos.filter((ele)=>ele._id!=action.payload)
             return {...state,isLoading:false,todos:[...updatedTodo]}
         }     
        case DELETE_TODO_FAILURE : return {...state,isLoading:false,isError:true}

        default:return state
    }
}