import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../Redux/Auth/action'

const Navbar = () => {

    
    const nav=useNavigate()
    const {isLoading,isError,user,token}=useSelector((store)=>store.UserReducer)
    const dispatch=useDispatch()
    const toast=useToast()
  
    
    const  handleLogout=()=>
    {
        sessionStorage.removeItem("token")
        dispatch(userLogout())
        toast({
          title: 'Logout Success',
          description: "You Logout Successfully",
          status: 'success',
          duration: 9000,
          isClosable: true,
         });
        nav("/")
    }

  return (
    <>
    <Flex justifyContent={"space-between"} p={["20px","20px","20px","20px 50px","20px 100px"]} alignItems={"center"} boxShadow={"2xl"}>
       <Link to="/"> <Heading>Todo App</Heading></Link>
       {
        token!==""? <Text  fontSize={"18px"} fontWeight={700} _hover={{bg:"teal",color:"white",borderRadius:"6px"}} p={"7px 12px"}
        onClick={handleLogout}
        ><Button bg={"none"} _hover={{bg:"teal",color:"white",borderRadius:"6px"}}>Logout</Button> </Text> :
         <Flex gap={"10px"} fontSize={"18px"} fontWeight={700}>
          <Link to={"/login"} ><Text _hover={{bg:"teal",color:"white",borderRadius:"6px"}} p={"7px 12px"}>Login</Text> </Link>
          <Link to={"/register"}><Text  _hover={{bg:"teal",color:"white",borderRadius:"6px"}} p={"7px 12px"}>Sign up</Text> </Link>
         </Flex>
       }
       
    </Flex>
       

    </>
  )
}

export default Navbar