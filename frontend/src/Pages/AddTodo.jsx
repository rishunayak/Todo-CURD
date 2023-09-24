import { Box, Button, Center, Checkbox, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { patchTodo, postTodo } from '../Redux/Todo/action'


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




    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [title,setTitle]=useState("")
    const dispatch=useDispatch()

   const handleAdd=()=>
   {
     dispatch(postTodo({title,status:false})).then((r)=>
     {
       if(r.payload.status==1)
       {
        toast({
          title: 'Task',
          description: r.payload.msg,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        onClose()
       }
       else
       {
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
    
  return (
    <>
        <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
        colorScheme='blue'
      >
        Add Todo
      </Button>
      
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type='text' placeholder='Enter Task Name' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            
          </ModalBody>
          <ModalFooter gap={"10px"}>
            <Button colorScheme='blue' onClick={handleAdd}>Submit</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
        

    


    </>
  )
}

export default AddTodo