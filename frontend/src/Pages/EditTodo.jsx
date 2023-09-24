import { Box, Button, Center, Checkbox, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { patchTodo } from '../Redux/Todo/action'

const EditTodo = ({todo}) => {
    const navigate=useNavigate()
    const handleLogout=()=>
    {
        localStorage.removeItem("token")
        navigate("/login");
    }

 
    const [current,setCurrent]=useState(todo)

    
     const toast = useToast()
     const dispatch=useDispatch()
  

    const handleUpdate=()=>
    {
      dispatch(patchTodo(current)).then(r=>{
        
         if(r.msg.status==1)
         {
            toast({
                title: 'Task',
                description: r.msg.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
               onClose()
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

    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
  





 
  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >
        EDIT
      </Button>
      
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type='text' placeholder='Enter Task Name' value={current.title} onChange={(e)=>setCurrent({...current,title:e.target.value})}/>
            <Checkbox  isChecked={current.status} onChange={(e)=>setCurrent({...current,status:e.target.checked})}>Status</Checkbox>
          </ModalBody>
          <ModalFooter gap={"10px"}>
            <Button colorScheme='blue' onClick={handleUpdate}>Submit</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

        


}

export default EditTodo