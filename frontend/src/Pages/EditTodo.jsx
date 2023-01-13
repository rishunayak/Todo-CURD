import { Box, Button, Center, Checkbox, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditTodo = () => {
    const navigate=useNavigate()
    const handleLogout=()=>
    {
        localStorage.removeItem("token")
        navigate("/login");
    }

    const [currentTodo,setCurrentTodo]=useState({})
   
     const {id}=useParams()
    
     const toast = useToast()
    useEffect(()=>
    { 
      axios.get(`http://localhost:3000/todos/edit/${id}`,{headers:{token:localStorage.getItem("token")}}).then(r=>setCurrentTodo(r.data))
    },[id])
    console.log(currentTodo)

    const handleUpdate=()=>
    {
        axios.patch(`http://localhost:3000/todos/edit/${id}`,currentTodo,{headers:{token:localStorage.getItem("token")}}).then(r=>{
            console.log(currentTodo)
         if(r.data.msg)
         {
            toast({
                title: 'Task',
                description: r.data.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
         }
         else
         {
            toast({
                title: 'Task Not added',
                description: "Server Error",
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
         }
           
        })
    }

  return (
    <>
         <Flex w="100%" justifyContent={["space-between","space-around","space-around"]} p={["20px 10px","20px 0px",]} boxShadow="2xl">
            <Box><Link to={"/todo"}><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Go Back</Button></Link></Box>
            <Box fontSize={"30px"} fontWeight="bold" color={"blue.500"}>Edit Todos</Box>
            <Box><Link to="/login"><Button bg={"teal"} color="white" _hover={{bg:"red"}} onClick={handleLogout}>Logout</Button></Link></Box>
         </Flex>
         
         <Center alignItems={"center"} mt="70px">
           <Box w={["90%","50%","50%","30%"]} m="auto" display="grid" gap="20px" boxShadow="2xl" p="40px" borderRadius="16px">
             <Heading textAlign="center">Edit Todo</Heading>
            <Input type={"text"} value={currentTodo.title} onChange={(e)=>setCurrentTodo({...currentTodo,title:e.target.value})} />
            <Checkbox  Checked={currentTodo.status} onChange={(e)=>setCurrentTodo({...currentTodo,status:!(e.target.value)})}>Status</Checkbox>
            <Button onClick={handleUpdate}>Submit</Button>
           </Box>
         </Center>

        


    </>
  )
}

export default EditTodo