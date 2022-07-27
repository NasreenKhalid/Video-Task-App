import { Flex,Text } from '@chakra-ui/react'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {Create,VideoPin,Feed} from '../components'
import { Link, useNavigate } from "react-router-dom";
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from "react-icons/io5";



const Home = () => {


  return (
    <>
    <Flex direction={"column"} justifyContent="start" alignItems={"center"}
    width="20"
    >
        
    </Flex>

    <Flex width={"full"} justifyContent="center" 
    alignItems={"center"}
    px="4"
    >
<Routes>
<Route path='/' element={<Feed />}/>
    <Route path='/create' element={<Create />}/>
    <Route path='/videoDetail/:videoId' element={<VideoPin />}/>
</Routes>
{/* crerate Btn */}
<Link to={"/create"}>
          <Flex
            justifyContent={"center"}
            alignItems="start"
            // bg={bg}
            width="40px"
            height="40px"
            borderRadius="5px"
            mx={6}
            cursor="pointer"
            _hover={{ shadow: "md" }}
            transition="ease-in-out"
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={25}
              color={`#111`}
            /><Text>Add Video</Text>
          </Flex>
        </Link>
    </Flex>
    </>
  )
}

export default Home