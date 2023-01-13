import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
     <Box>
         <Flex w="100%" justifyContent={["space-between","space-around","space-around"]} p={["20px 10px","20px 0px",]} boxShadow="2xl">
            <Box><Link to={"/register"}><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Sign Up</Button></Link></Box>
            <Box fontSize={"30px"} fontWeight="bold" color={"blue.500"}>Home Page</Box>
            <Box><Link to="/login"><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Login</Button></Link></Box>
         </Flex>

         <Center mt="50px" flexDirection={"column"} gap="20px">
            <Heading color={"orange"}>Welcome To Todos</Heading>
            <Text fontSize={"30px"}>If you are already login then click Below Button  to see</Text>
            <Text fontSize={"20px"} fontWeight="bold">YOUR TODOS</Text>
           <Link to="/todo"><Button bg={"teal"} color="white" _hover={{bg:"red"}}>Todos</Button></Link>
         </Center>

     </Box>
  )
}

export default Home