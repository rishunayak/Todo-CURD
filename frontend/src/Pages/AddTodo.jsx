import { Box, Button, Center, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddTodo = () => {
   
    const navigate=useNavigate()
    const handleLogout=()=>
    {
        localStorage.removeItem("token")
        navigate("/login");
    }

    const toast = useToast()
    const initValue={title:"",status:false}
    const [task,setTask]=useState(initValue)

    const addTask=()=>
    {
       if(task.title==="")
       {
        toast({
            title: 'Task',
            description: "Please Enter the task Name first",
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
       }
       else
       {
         
        axios.post("http://localhost:3000/todos/addTodo",task,{headers:{token:localStorage.getItem("token")}}).then((r)=>
        {
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
                console.log(localStorage.getItem("token"))
                toast({
                    title: 'Task',
                    description: r.data,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
            }
        })
      

       }
  
       setTask(initValue)
        
    }
    
  return (
    <>
         <Flex w="100%" justifyContent={["space-between","space-around","space-around"]} p={["20px 10px","20px 0px",]} boxShadow="2xl">
            <Box><Link to={"/todo"}><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Go Back</Button></Link></Box>
            <Box fontSize={"30px"} fontWeight="bold" color={"blue.500"}>Add Todos</Box>
            <Box><Link to="/login"><Button bg={"teal"} color="white" _hover={{bg:"red"}} onClick={handleLogout}>Logout</Button></Link></Box>
         </Flex>

         <Center alignItems={"center"} mt="70px">
           <Box w={["90%","50%","50%","30%"]} m="auto" display="grid" gap="20px" boxShadow="2xl" p="40px" borderRadius="16px">
             <Heading textAlign="center">Todo</Heading>
             <Input  type="text" placeholder="Enter Your Todo" value={task.title} onChange={(e)=>setTask({...task,title:e.target.value})}/>
             <Button w="100%" onClick={addTask} bg={"teal"} color="white" _hover={{bg:"red"}}>Add Todo</Button>
           </Box>
         </Center>
        

    


    </>
  )
}

export default AddTodo