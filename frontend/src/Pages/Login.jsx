import { Box, Button, Center, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Login = () => {

    const initalValue={
        email:"",
        password:""
    }
    const navigate = useNavigate();
    const toast = useToast()
    const [login,setLogin]=useState(initalValue)

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
            axios.post("http://localhost:3000/users/login",login).then((r)=>{
             
            if(r.data.token)
            {
                toast({
                    title: 'Login.',
                    description: "Login Successfull",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  });localStorage.setItem("token",r.data.token);
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
        <Flex w="100%" justifyContent={["space-between","space-around","space-around"]} p={["20px 10px","20px 0px",]} boxShadow="2xl">
            <Box><Link to={"/"}><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Go Back</Button></Link></Box>
            <Box fontSize={"30px"} fontWeight="bold" color={"blue.500"}>Login Page</Box>
            <Box><Link to="/register"><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Sign Up</Button></Link></Box>
         </Flex>

         <Center alignItems={"center"} mt="70px">
           <Box w={["90%","50%","50%","30%"]} m="auto" display="grid" gap="20px" boxShadow="2xl" p="40px" borderRadius="16px">
             <Heading textAlign="center">Login Now</Heading>
             <Input  type="email" placeholder="Enter Email" value={login.email} onChange={(e)=>setLogin({...login,email:e.target.value})}/>
             <Input type="password" placeholder="Enter Password" value={login.password} onChange={(e)=>setLogin({...login,password:e.target.value})}/>
             <Button w="100%" onClick={handleLogin} bg={"teal"} color="white" _hover={{bg:"red"}}>Login</Button>
           </Box>
         </Center>
    </Box>
  )
}

export default Login