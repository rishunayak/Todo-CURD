import React from 'react'
import {Box,Input,Button,Heading,useToast, Flex} from "@chakra-ui/react"
import { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { userRegister } from '../Redux/Auth/action'

const Register = () => {
    const navigate = useNavigate();
    const initalValue={
        fname:"",
        email:"",
        password:"",
        age:""
    }
    const [buttonLoad,setButtonLoad]=useState(false)
    const toast = useToast()
    const [register,setRegister]=useState(initalValue)
    const dispatch=useDispatch()

    const handleRegister=()=>
    {
      
        register.age=+register.age
        setButtonLoad(true)
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
            dispatch(userRegister(register)).then((r)=>{
            if(r.payload.status==1)
            {
                toast({
                    title: 'Account created.',
                    description: r.payload.msg,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                   });
                   setRegister(initalValue)
                   setRegister(false)
                   navigate("/login");


            }
            else
            {
                
                toast({
                    title: 'Account creating Failed.',
                    description: r.payload,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                   })
                   setRegister(false)
            }
          })
        }
        setButtonLoad(false)
    }

  return (
    <Box >

        
     
      <Box w={["90%","50%","50%","30%"]} m="auto" display="grid" gap="20px" boxShadow="2xl" p="40px" borderRadius="16px" mt="50px">
        <Heading textAlign="center">Register Now</Heading>
        <Input type="text" value={register.fname} onChange={(e)=>setRegister({...register,fname:e.target.value})} placeholder="Enter Full Name"/>
        <Input type="number" placeholder="Enter Age" value={register.age} onChange={(e)=>setRegister({...register,age:(e.target.value)})}/>
        <Input  type="email" placeholder="Enter Email" value={register.email} onChange={(e)=>setRegister({...register,email:e.target.value})}/>
        <Input type="password" placeholder="Enter Password" value={register.password} onChange={(e)=>setRegister({...register,password:e.target.value})}/>
        <Button w="100%" isLoading={buttonLoad} onClick={handleRegister} bg={"teal"} color="white" _hover={{bg:"red"}}>Register</Button>
      </Box>
    </Box>
  )
}

export default Register