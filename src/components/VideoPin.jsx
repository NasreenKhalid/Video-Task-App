import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import './VideoPin.css'
const VideoPin = ({data}) => {

  const firestoreDb = getFirestore(firebaseApp);


  // useEffect(() => {
  //   if (data) setUserId(data.userId);
  //   if (userId)
  //     gertUserInfo(firestoreDb, userId).then((data) => {
  //       setUserInfo(data);
  //     });
  // }, [userId]);
  return (
    <div className="box">
      <Box>
      <Link to={`/videoDetail/${data?.id}`}>
        <video
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>
      </Box>


    </div>
  )
}

export default VideoPin