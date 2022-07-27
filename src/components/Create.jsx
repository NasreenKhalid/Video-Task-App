import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Box,
  Text,
  Button, 
  useColorMode,
  useColorModeValue,
  FormLabel,
} from "@chakra-ui/react";
import { IoCloudUpload } from "react-icons/io5";
import Spinner from './Spinner'
import {firebaseApp} from '../firebase-config'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [videoAsset, setVideoAsset] = useState("");
  const [loading,setLoading] = useState(false)
  const [progress, setProgress] = useState(1);
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50");
  const textColor = useColorModeValue("gray.900");
  const navigate = useNavigate();

  const storage = getStorage(firebaseApp)
  const fireStoreDb = getFirestore(firebaseApp);
  const uploadVideo = (e) =>{
    console.log(e.target.files[0])
    setLoading(true)
    const videoFile = e.target.files[0]

    const storageRef = ref(storage, `videos/${Date.now()}-${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoAsset(downloadURL);
          setLoading(false);
          // setAlert(true);
          // setAlertStatus("success");
          // setAlertIcon(<IoCheckmark fontSize={25} />);
          // setAlertMsg("Your video is uploaded to our server");
          // setTimeout(() => {
          //   setAlert(false);
          // }, 4000);
        });
      }
    );
  };



  const uploadDetails = async () => {
    try {
      setLoading(true);
      if (!videoAsset) {
        
        setLoading(false);
      } else {
        const data = {
          id: `${Date.now()}`,
          
          videoUrl: videoAsset,
         
        };

        await setDoc(doc(fireStoreDb, "videos", `${Date.now()}`), data);
        setLoading(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect=(()=>{
  //   console.log("33",videoAsset)
  // },[videoAsset])

  return (
    <div>
      {" "}
      {/* Select */}
      <Flex
        justifyContent={"center"}
        alignItems="center"
        width="full"
        // minHeight={"100vh"}
      >
        {/* File select */}
        <Flex>
          {!videoAsset ? (
            <FormLabel width="full">
              <Flex
                direction={"column"}
                alignItems="center"
                justifyContent={"center"}
                height="full"
                width={"full"}
              ></Flex>

              <Flex
                direction={"column"}
                alignItems="center"
                justifyContent={"center"}
                height="full"
                width={"full"}
                cursor="pointer"
              >

                {loading ? (<><Spinner msg={"Uploading Your Video"} progress={progress}/></>) : (
                  <>
                  <IoCloudUpload />
                  <Text>Choose Video File</Text>
                  </>
                )}
              </Flex>

              {!loading && (
                <input 
                type={'file'}
                name='upload-video'
                onChange={uploadVideo}
                style={{width:0,height:0}}
                accept="video/mp4,video/x-m4v,video/*"
                />
              )}
            </FormLabel>
          ) : (
           <Flex>
             <video
                src={videoAsset}
                controls
                style={{ width: "100%", height: "100%" }}
              />
              <Button
          isLoading={loading}
          loadingText="Uploading"
          colorScheme={"linkedin"}
          variant={`${loading ? "outline" : "solid"}`}
          width={"xl"}
          _hover={{ shadow: "lg" }}
          fontSize={20}
          onClick={() => uploadDetails()}
        >
          Upload
        </Button>
           </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default Create;
