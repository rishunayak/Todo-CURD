import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Auth = ({children}) => {


   const toast = useToast()
   const {isLoading,isError,user,token}=useSelector((store)=>store.UserReducer)

   if(token)
   {
    return children
   }
   toast({
      title: 'Not Authorized',
      description: "you are required to login first",
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
   
  return <Navigate to={"/login"}/>

}

export default Auth