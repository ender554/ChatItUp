import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

const ChatView = ({ user = null, database = null}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
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
  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (database) {
      database.collection('messageApp').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp() 
      })
    }
    setNewMessage(null);
  }
  return (
    <>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
        />
        <button type="submit" disabled={!newMessage} >Send</button>
      </form>
    </>
  )
} 

export default ChatView;