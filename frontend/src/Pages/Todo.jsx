import { Box, Button, Center, Flex, Heading, Table, Tbody, Td, Th, Tr, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteTodo, getTodo, patchTodo } from '../Redux/Todo/action'
import EditTodo from './EditTodo'
import AddTodo from './AddTodo'

const Todo = () => {
   
   
    const toast = useToast()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout=()=>
    {
        sessionStorage.removeItem("token")
        navigate("/login");
    }



    const {isLoading,isError,todos}=useSelector((store)=>store.TodoReducer)

    useEffect(()=>
    {
        dispatch(getTodo())
        
    },[])
  

    const handleUpdate=(task)=>
    {
        task={...task,status:!task.status}
        dispatch(patchTodo(task)).then(r=>{
        
            if(r.msg.status==1)
            {
               toast({
                   title: 'Task',
                   description: r.msg.msg,
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



    const handleDelete=(id)=>
    {
       
        dispatch(deleteTodo(id)).then(r=>{
            console.log(r)
        if(r.msg.status==1)
        {
            toast({
                title: 'Task',
                description: r.msg.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });

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

       <Center mt={"80px"}><AddTodo/></Center>       
       { todos?.length==0?<Center><Heading mt={"100px"}>No Todo Found</Heading></Center>:""}
         <Table mt="50px" display={todos?.length==0?"none":"block"}>
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
                <Td textAlign={"center"}><EditTodo todo={ele}/></Td>
                <Td textAlign={"center"}><Button onClick={()=>handleDelete(ele._id)}>Delete</Button></Td>
            </Tr>}
            )}
         </Table>

    


    </>
  )
}

export default Todo