import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: '',
    photo: ''
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handelSignin = () => {
    // console.log("sign in");
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch(err => {
        console.log(err);
        console.log(err.massage);
      })
  }
  const handelSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        const signedOutUser = {
          isSignIn: false,
          name: "",
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      }).catch((err) => {

      });
    console.log('Sign out click');
  }

  return (
    <div className="App">
      {
        user.isSignIn ? <button onClick={handelSignOut}>Sign Out</button> :
          <button onClick={handelSignin}>Sign In</button>
      }
      {
        user.isSignIn && <div>
          <p>welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo}></img>
        </div>
      }
    </div>
  );
}

export default App;
