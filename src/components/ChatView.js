import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/compat/app";
import { ChatWindow, OtherChat, UserChat, ChatInput, TimeStamp } from '../Styled';

const ChatView = ({ user = null, database = null}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const { uid, photoURL, displayName} = user;
  useEffect(() => {
    scrollToBottom();
  }, [messages])
  useEffect(() => {
    if (database) {
      const unSub = database
        .collection('messageApp')
        .orderBy('createdAt')
        .limit(100)
        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data); 
        })

      return unSub;
    }
  }, [database])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (database) {
      database.collection('messageApp').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL
      })
    }
    setNewMessage("");
  }

  const chatBubble = (message) => {
    return (
      message.uid !== uid ?
      <><OtherChat key={message.id}>{message.text}</OtherChat><TimeStamp left>{message.createdAt.toDate().toString()}</TimeStamp></> :
      <UserChat key={message.id}>{message.text}</UserChat>
    )
  }
  return (
    <>
      <ChatWindow>
        {messages.map(message => chatBubble(message))}
         <div ref={messagesEndRef} />
      </ChatWindow>
      <form onSubmit={handleSubmit}>
        <ChatInput 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
        />
      </form>
    </>
  )
} 

export default ChatView;