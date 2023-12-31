import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  const googleSignIn =()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }
  const updateUserProfile = (user,name, photourl) =>{

    return updateProfile(user,{
      displayName: name,
      photoURL: photourl,
    })
  }

    useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth, currentUser=>{
          setUser(currentUser)
          console.log('current user', currentUser)
          // get and set token
          if (currentUser) {
            axios.post(`https://medlife-server-navy.vercel.app/jwt`,{email: currentUser.email})
            .then((data)=>{
              // console.log(data.data.token);
              localStorage.setItem('access-token', data.data.token)
            })
          }
          else{
            localStorage.removeItem('access-token');
          }
          setLoading(false)
        })
        return ()=>{
         return unsubscribed();
        }

    },[])



  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    setLoading,
    updateUserProfile,
    googleSignIn,
    setLoading
  };


  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
