import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import {API_PATHS} from "../utils/apiPaths";
import { useEffect, useState } from "react";
export const useUserAuth=()=>{
    const {user,updateUser, clearUser}=useContext(UserContext);
    const navigate=useNavigate();
    useEffect(()=>{
        if(user) return ;
        let isMounted=true;
        const fetchUserInfo=async()=>{
            try{
                const response=await axios.get(API_PATHS.AUTH.GET_USER_INFO);
                if(isMounted) updateUser(response.data);
                }
                catch(error){
                    console.error("Failed to fetch user info:",error);
                    if(isMounted) {
                        clearUser();
                         navigate("/login");
                    }
                }
        };
        fetchUserInfo();
        return ()=>{isMounted=false;}
        },[user,updateUser,clearUser,navigate]);
    
}