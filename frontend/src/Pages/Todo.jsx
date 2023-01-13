import { Box, Button, Flex, Table, Tbody, Td, Th, Tr, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Todo = () => {
   
    const [notification,setNotification]=useState(0)
    const toast = useToast()
    const navigate=useNavigate()
    const handleLogout=()=>
    {
        localStorage.removeItem("token")
        navigate("/login");
    }

    const [todos,setTodos]=useState([]);
    useEffect(()=>
    {
        axios.get("http://localhost:3000/todos",{headers:{token:localStorage.getItem("token")}}).then(r=>setTodos(r.data))
    },[notification])

    const handleUpdate=(task)=>
    {
        task.status=!task.status
        axios.patch(`http://localhost:3000/todos/update/${task._id}`,task,{headers:{token:localStorage.getItem("token")}}).then(r=>{
         if(r.data.msg)
         {
            toast({
                title: 'Task',
                description: r.data.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });setNotification(Math.random())
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

    const handleEdit=(task)=>
    {
       navigate(`/edit/${task._id}`);
    }

    const handleDelete=(task)=>
    {
        axios.delete(`http://localhost:3000/todos/update/${task._id}`,{headers:{token:localStorage.getItem("token")}}).then(r=>{
            
        if(r.data.msg)
        {
            toast({
                title: 'Task',
                description: r.data.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });setNotification(Math.random())
        }
        else
        {
            toast({
                title: 'Task not Deleted',
                description: "Due to Server Error",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
            
        })
     
    }

  return (
    <>
         <Flex w="100%" justifyContent={["space-between","space-around","space-around"]} p={["20px 10px","20px 0px",]} boxShadow="2xl">
            <Box><Link to={"/addTodo"}><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Add Todo</Button></Link></Box>
            <Box fontSize={"30px"} fontWeight="bold" color={"blue.500"}>Your Todos</Box>
            <Box><Link to="/addTodo"><Button bg={"teal"} color="white" _hover={{bg:"red"}} onClick={handleLogout}>Logout</Button></Link></Box>
         </Flex>

         <Table mt="50px" >
            <Tbody >
                <Th textAlign={"center"}>S.No</Th>
                <Th textAlign={"center"}>Title</Th>
                <Th textAlign={"center"}>Status</Th>
                <Th textAlign={"center"}>Edit</Th>
                <Th textAlign={"center"}>Delete</Th>
            </Tbody>
            {todos?.map((ele,i)=>
            {return <Tr key={i}>
                <Td textAlign={"center"}>{i+1}</Td>
                <Td textAlign={"center"}>{ele.title}</Td>
                <Td textAlign={"center"}>{ele.status?<Button onClick={()=>handleUpdate(ele)}>Completed</Button>:<Button onClick={()=>handleUpdate(ele)}>Not Completed</Button>}</Td>
                <Td textAlign={"center"}><Button onClick={()=>handleEdit(ele)}>Edit</Button></Td>
                <Td textAlign={"center"}><Button onClick={()=>handleDelete(ele)}>Delete</Button></Td>
            </Tr>}
            )}
         </Table>

    


    </>
  )
}

export default Todo