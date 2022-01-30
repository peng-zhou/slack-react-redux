import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  //   console.log("channelName:", channelName);
  //   console.log("channelId:", channelId);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevents refresh

    // console.log("sendMessage:", channelId);
    if (!channelId) {
      return false;
    }

    const data = {
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      //   userImage: "https://avatars.githubusercontent.com/u/19296255?v=4",
      userImage: user.photoURL,
    };

    db.collection("rooms").doc(channelId).collection("messages").add(data);

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
