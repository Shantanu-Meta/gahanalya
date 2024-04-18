"use client";

import React, { useEffect, useState } from 'react'
import userContext from '@contextAPI/userContext/userContext'
import {
            GoogleAuthProvider, 
            signInWithPopup,
            onAuthStateChanged } from "firebase/auth"
import auth from '@Firebase/config';
import Cookies from "js-cookie";

const UseUserContext = ({children}) => {
    const BASE_URL = process.env.NEXT_BASE_URL;
    const [user, setUser] = useState({
        id:"",
        name:"", 
        email:"",
        success:false
    })
    const [currentUser,setCurrentUser] =useState({}); 
    const [loader, setLoader] = useState(0); 

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (googleUser)=>{
            setCurrentUser(googleUser); 
        })
        return ()=>{
            unSubscribe();
        }
    },[])

    //USER Section
    const requestToAPI = async (user)=>{        // handle sign up and login
        try{
            setLoader(1);  
            const newUser = await fetch(`${BASE_URL}api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            cache: 'no-store' 
            }); 
            const response = await newUser.json();
            Cookies.set("auth-token", response?.authtoken); 
            setLoader(0);  
            return response;  
        }catch(e){
            return {success:"false", data:"Error occured"}
        }
    }


    const signUpWithGoogle = async ()=>{
        try{
            const provider =  new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const USER = await signInWithPopup(auth, provider);
            if(!USER){
                return;
            }
            const credintials = {
                name:USER.user.displayName,
                email: USER.user.email,
                password: USER.user.uid,
                source: "google"
            }
            setLoader(1);  
            const response = await requestToAPI(credintials); 
            if(response.success){
                localStorage.setItem("user",JSON.stringify(USER.user))
                localStorage.setItem("auth-token", response.authtoken); 
                Cookies.set("auth-token", response.authtoken); 
            }
            setLoader(0);  
            return response;
        } catch(e){
            return {success:"false", data:"Error occured"}
        }
    }
    

    const fetchUserProfile = async ()=>{    // get user details
        if(!localStorage.getItem("auth-token")){
            return; 
        }

        try{
            const newUser = await fetch(`${BASE_URL}api/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token")
            },
            cache: 'no-store' 
            }); 
            const response = await newUser.json();
            setUser({
                id: response.user._id,
                name: response.user.name,
                email:response.user.email,
                success:response.success
            })
            Cookies.set("email",response?.user?.email);
            return response.user;
        }catch(e){
            console.log("error from fetchUserProfile ->" + e)
        }
    }

    return (
        <userContext.Provider value={{requestToAPI, user, fetchUserProfile, setUser, signUpWithGoogle, currentUser, loader, setLoader}}>
            {children}
        </userContext.Provider>
    )
}

export default UseUserContext;

