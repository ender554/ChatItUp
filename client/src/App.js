import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ChatView from './components/ChatView';

import { GoogleSignInButton, BaseButton } from './Styled';

firebase.initializeApp({
  apiKey: "AIzaSyC88YuY7hqhiFcTja7Ocl8ocoak8Yl-T2s",
  authDomain: "ezoic-chat.firebaseapp.com",
  projectId: "ezoic-chat",
  storageBucket: "ezoic-chat.appspot.com",
  messagingSenderId: "238661162564",
  appId: "1:238661162564:web:e8297299e933797ed2ce11"
})

const auth = firebase.auth();
const database = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const destroySession = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (loading) {
        setLoading(false);
      }
    })
    return destroySession;
  },[])

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  }
  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <main>"...Loading"</main>;
  return (
    <main>
      {!!user ? (
        <>
          <ChatView user={user} database={database} />
          <BaseButton secondary onClick={signOut}>Sign Out</BaseButton>  
        </>

      ) : (
        <GoogleSignInButton onClick={googleSignIn}>Sign in with Google!</GoogleSignInButton>
      )
      }
    </main>
  )
}

export default App;