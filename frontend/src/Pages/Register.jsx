import React from 'react'
import {Box,Input,Button,Heading,useToast, Flex} from "@chakra-ui/react"
import { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const initalValue={
        fname:"",
        email:"",
        password:"",
        age:""
    }
    const toast = useToast()
    const [register,setRegister]=useState(initalValue)

    const handleRegister=()=>
    {
        console.log(typeof register.age)
        register.age=+register.age
        console.log(register)
        if(register.fname==="" || register.email==="" || register.password==="" || register.age==="")
        {
            toast({
                title: 'Account created Failed.',
                description: "Please Fill all the details before Register.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        else
        {
            axios.post("http://localhost:3000/users/register",register).then((r)=>{
            if(r.data.msg)
            {
                toast({
                    title: 'Account created.',
                    description: r.data.msg,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                   });
                   setRegister(initalValue)
                   navigate("/login");


            }
            else
            {
                
                toast({
                    title: 'Account creating Failed.',
                    description: r.data,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                   })
            }
          })
        }
        
    }

  return (
    <Box >

        <Flex w="100%" justifyContent={["space-between","space-around","space-around"]} p={["20px 10px","20px 0px",]} boxShadow="2xl">
            <Box><Link to={"/"}><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Go Back</Button></Link></Box>
            <Box fontSize={"30px"} fontWeight="bold" color={"blue.500"}>SignUp Page</Box>
            <Box><Link to="/login"><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Login</Button></Link></Box>
         </Flex>
     
      <Box w={["90%","50%","50%","30%"]} m="auto" display="grid" gap="20px" boxShadow="2xl" p="40px" borderRadius="16px" mt="50px">
        <Heading textAlign="center">Register Now</Heading>
        <Input type="text" value={register.fname} onChange={(e)=>setRegister({...register,fname:e.target.value})} placeholder="Enter Full Name"/>
        <Input type="number" placeholder="Enter Age" value={register.age} onChange={(e)=>setRegister({...register,age:(e.target.value)})}/>
        <Input  type="email" placeholder="Enter Email" value={register.email} onChange={(e)=>setRegister({...register,email:e.target.value})}/>
        <Input type="password" placeholder="Enter Password" value={register.password} onChange={(e)=>setRegister({...register,password:e.target.value})}/>
        <Button w="100%" onClick={handleRegister} bg={"teal"} color="white" _hover={{bg:"red"}}>Register</Button>
      </Box>
    </Box>
  )
}

export default Register