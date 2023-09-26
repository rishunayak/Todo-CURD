import { Box, Button, Center, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../Redux/Auth/action';
const Login = () => {

    const initalValue={
        email:"",
        password:""
    }

    const navigate = useNavigate();
    const toast = useToast()
    const [login,setLogin]=useState(initalValue)
    const dispatch=useDispatch()
    const {isLoading}=useSelector((store)=>store.UserReducer)
    const handleLogin=()=>
    {

       
        if(login.email==="" || login.password==="")
        {
            toast({
                title: 'Login Failed.',
                description: "Please Fill all the details before Login.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        else
        {
          dispatch(userLogin(login)).then((r)=>{

            if(r.payload.token)
            {
                toast({
                    title: 'Login.',
                    description: "Login Successfull",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  });
                  sessionStorage.setItem("token",r.payload.token);
       
                  navigate("/todo")
                
            }
            else
            {
                 toast({
                title: 'Login Fail.',
                description: "Wrong Credentials",
                status: 'error',
                duration: 9000,
                isClosable: true,
                })
               
            }
            
            })
        }

    }

  return (
    <Box>
     

         <Center alignItems={"center"} mt="70px">
           <Box w={["90%","50%","50%","30%"]} m="auto" display="grid" gap="20px" boxShadow="2xl" p="40px" borderRadius="16px">
             <Heading textAlign="center">Login Now</Heading>
             <Input  type="email" placeholder="Enter Email" value={login.email} onChange={(e)=>setLogin({...login,email:e.target.value})}/>
             <Input type="password" placeholder="Enter Password" value={login.password} onChange={(e)=>setLogin({...login,password:e.target.value})}/>
             <Button isLoading={isLoading} w="100%" onClick={handleLogin} bg={"teal"} color="white" _hover={{bg:"red"}}>Login</Button>
           </Box>
         </Center>
    </Box>
  )
}

export default Login