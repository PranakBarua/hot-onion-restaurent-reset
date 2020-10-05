import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { UserContext } from '../../App';

const Login = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext)
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig)
  }

  const [user,setUser]=useState({
    isConfirmPassExist:false,
    isSigned:false,
    name:'',
    email:'',
    photo:'',
    password:'',
    confirmPassword:'',
    success:false,
    error:''
})
    const [newUser,setNewUser]=useState(false)

    const handleBlur=(e)=>{
        // console.log(e.target.name,e.target.value);
        let isFieldValid=true;
        if(e.target.name==='email'){
          isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
        }
        else if(e.target.name==='password'){
          const isPasswordValid=e.target.value.length>6
          const isNumberValid= /\d{1}/.test(e.target.value)
          isFieldValid=isPasswordValid && isNumberValid
        }
        else if(e.target.name==='confirmPassword'){
          // const isPasswordValid=e.target.value.length>6
          // const isNumberValid= /\d{1}/.test(e.target.value)
          if(user.password!==e.target.value){
            isFieldValid=false
            const newUserInfo={...user}
            newUserInfo.isConfirmPassExist=true
            setUser(newUserInfo)
          }
          else{
            isFieldValid=true
          }
        }
        if(isFieldValid){
          const newUserInfo={...user}
          newUserInfo[e.target.name]=e.target.value
          setUser(newUserInfo)
        }
      }
      const handleSubmit=(e)=>{
        // if(user.password!==user.confirmPassword){
        //   const newUserInfo={...user}
        //   newUserInfo.isConfirmPassExist=true
        //   setUser(newUserInfo)
        // }
        if(!newUser && user.email && user.password && user.confirmPassword){
            console.log(newUser,user.email,user.password)
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                const UserInfo={...user}
                UserInfo.success=true
                UserInfo.isConfirmPassExist=false
                UserInfo.error=''
                UserInfo.isSignedIn=true
                setUser(UserInfo)
                setNewUser(user)
                sendDataToFirebase(user)
                setLoggedInUser(UserInfo)
                history.replace(from);
            })
            .catch(error=> {
                var errorMessage = error.message;
                const UserInfo={...user}
                UserInfo.success=false
                UserInfo.error=errorMessage
                setUser(UserInfo)
            });
        }
        if(newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                console.log(newUser,user.email,user.password)
                const UserInfo={...user}
                UserInfo.success=true
                UserInfo.isConfirmPassExist=false
                UserInfo.error=''
                UserInfo.isSignedIn=true
                UserInfo.isSigned=true
                setUser(UserInfo)
                setNewUser(user)
                console.log(user)
                setLoggedInUser(UserInfo)
                history.replace(from);
            })
            .catch(function(error) {
                var errorMessage = error.message;
                const UserInfo={...user}
                UserInfo.success=false
                UserInfo.error=errorMessage
                setUser(UserInfo)
            });
        }
        e.preventDefault();
    }

    const sendDataToFirebase=(user)=>{
          firebase.auth().onAuthStateChanged(function(user) {

            if (user) {

              // Updates the user attributes:

              user.updateProfile({ // <-- Update Method here

                displayName: user.name

              }).then(function() {

                // Profile updated successfully!
                //  "NEW USER NAME"

                var displayName = user.displayName;
                // "https://example.com/jane-q-user/profile.jpg"

              }, function(error) {
                // An error happened.
              });     

            }
       });
    }


    return (
        <div className="login-form">
          <p>name:{newUser.name}</p>
            <form onSubmit={handleSubmit}>
                {
                  !newUser&&<><input className="margin-bottom login-input" type="text" name="name" onBlur={handleBlur} placeholder="Name"/>
                  <br/>
                  </>
                }
                <input className="margin-bottom login-input" type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                <br/>
                <input className="margin-bottom login-input" type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                <br/>
                {
                  !newUser&&<><input className="margin-bottom login-input" type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm password" required/>
                  <br/>
                  </>
                }
                <input className="search-button login-input" type="submit" value="Sign In"/>
            </form>
            {
              newUser?<Link><p className="account-message" onClick={()=>setNewUser(false)}>Create a new account</p></Link>:
              <Link><p className="account-message" onClick={()=>setNewUser(true)} >Already have an account</p></Link>
            }
            {
              user.isConfirmPassExist && <p style={{color:'red'}}>Password and Confirm password are not same</p>
            }
            {user.success && <h1 style={{color:'green'}}>User {newUser.isSigned?'created':'LoggedIn'} successfully</h1>}
        </div>
    );
};

export default Login;