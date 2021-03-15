import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: ""
  });

  const provider = new firebase.auth.GoogleAuthProvider();

  const handelSignIn = () => {
    // console.log("sign in");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.massage);
      });
  };
  const handelSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((err) => {});
    console.log("Sign out click");
  };
  const handelBlur = (event) =>{
    // console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(event.target.value)
      isFormValid = isPasswordValid && passwordHasNumber ;
    }
    if(isFormValid){
    const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
      // console.log(newUserInfo);
    }
  }
  const handelSubmit = () =>{
    
  }
  return (
    <div className="App">
      {user.isSignIn ? (
        <button onClick={handelSignOut}>Sign Out</button>
      ) : (
        <button onClick={handelSignIn}>Sign In</button>
      )}
      {user.isSignIn && (
        <div>
          <p>welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo}/>
        </div>
      )}

      <h1>Our own Authentication</h1>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>

      <from onSubmit={handelSubmit}>
        <input type="text" name="name" onBlur={handelBlur} placeholder="Your Name" required />
        <br/>
        <input type="text" name="email" onBlur={handelBlur} placeholder="Your Email Address" required />
        <br/>
        <input type="password" name="password" onBlur={handelBlur} placeholder="Your Password" required />
        <br/>
        <input type="submit" value="Submit"/>
      </from>
    </div>
  );
}

export default App;
