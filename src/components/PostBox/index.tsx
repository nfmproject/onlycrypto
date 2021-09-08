import React, { useEffect, useState } from "react";
import { decryptUnlockData, encryptUnlockData } from "../../workers/crypto";
import { postUnlockData } from "../../workers/services";

import {
  ProfileData,
  EditButton,
  TweetBox,
  TweetBoxInput,
  Form,
  UnlockLockButton
} from './styles';

const PostBox: React.FC = () => {
  const [postData, setPostData] = useState("");
  const [postable, setPostable] = useState(false)
  const [data, setData] = useState({
    key: "",
    iv: "",
    encrypted: "",
  });
  const [content, setContent] = useState("");
  // Encrypt text everrytime it changes
  useEffect(() => {
    if (postData.length == 0) {setPostable(false)} else {setPostable(true)}
    encryptUnlockData(postData).then((datas) => {
      setData(datas);
    });
  }, [postData]);
  // Decrypt
  const decrypt = () => {
    decryptUnlockData(data).then((contents) => {
      setContent(contents.content);
    });
  };

  const uploadPost = () => {
    if(postable){

      const uploadData = {
        identifier: data.iv,
        unlockLocks: [{unlocklock : "0x1fbbcbf0858ec308c77c41f4b52e0a60f1a7cb0e", chainid: 4}],
        unlockKey: data.key,
      }
      
      postUnlockData(uploadData).then((res) => {
        if (res === 200) {
          const ipfsdata = {
            iv: uploadData.identifier,
            unlockLocks: uploadData.unlockLocks,
            post: data.encrypted,
          }
          if (ipfsdata) {
            
          } else {
            // dropMetadata(pluginMetaKey)
          }
          // props.onClose()
        } else {
          return
        }
      })
    }

    }

  return (
      <TweetBox>
        <Form>
          <TweetBoxInput
           placeholder="What's happening?"
           value={postData}
           onChange={(e) =>{
             setPostData(e.target.value)
           }}
           />
        </Form>
        <ProfileData>
        <UnlockLockButton>Select Lock</UnlockLockButton>
        <EditButton disabled={!postable} onClick={uploadPost} >Post</EditButton>
      </ProfileData>
      </TweetBox>
  );
};

export default PostBox;
