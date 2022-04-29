import React, { useEffect, useId, useState } from "react";
import firebase from "firebase/compat/app";
import { ChatWindow, OtherChat, UserChat } from '../Styled';

const ChatView = ({ user = null, database = null}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const { uid, photoURL, displayName} = user;
  console.log(user);
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
  return (
    <>
      <ChatWindow>
       <ul>
          {messages.map(message => {
            if(message.uid !== uid) {
              return (
                <OtherChat key={message.id}>{message.text}</OtherChat>
              )
            }
            return (
              <>
                <UserChat key={message.id}>{message.text}</UserChat>
              </>
          )})}
        </ul>
      </ChatWindow>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
        />
        {/* <button type="submit" disabled={!newMessage} >Send</button> */}
      </form>
    </>
  )
} 

export default ChatView;