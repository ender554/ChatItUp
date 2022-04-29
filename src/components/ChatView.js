import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/compat/app";
import { ChatWindow, OtherChat, UserChat, ChatInput, TimeStamp, ChatBubble, Name } from '../Styled';
import { FaThumbsUp } from "react-icons/fa";


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

  const liked = (message) => {
    if (database) {
      database
        .collection('messageApp')
        .doc(message.id).update({
          liked: !message.liked,
        });
    }
    console.log(message.id);
  }

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

  const grabColor = (letter) => {
    let hash = 0;
    for (let i = 0; i < letter.length; i++) {
    hash = letter.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
  }

  const chatBubble = (message) => {
    return (
      message.uid !== uid ?
      <><ChatBubble src={message.photoURL} alt={message.displayName}/><Name>{message.displayName}</Name><OtherChat  onDoubleClick={() => liked(message)}  color={grabColor(message.displayName)} key={message.id}>{message.text}</OtherChat>{message.liked && <FaThumbsUp color="red" className={"thumbsUp"}/>}<TimeStamp left>{message.createdAt.toDate().toString()}</TimeStamp></> :
      <><ChatBubble right src={message.photoURL} alt={message.displayName}/><UserChat key={message.id}>{message.text}</UserChat><TimeStamp>{!!message.createdAt ? message.createdAt.toDate().toString() : "Just now"}</TimeStamp></>
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