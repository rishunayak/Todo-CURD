import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Auth = ({children}) => {


    
   const token=localStorage.getItem("token")

   if(token)
   {
    return children
   }
   

}

export default Auth