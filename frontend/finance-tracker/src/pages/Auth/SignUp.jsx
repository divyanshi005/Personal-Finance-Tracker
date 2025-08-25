import React,{useState} from 'react';
import AuthLayout from '../../components/layouts/AuthLayout.jsx'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input.jsx';
import {validateEmail} from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import { useContext } from 'react';
import {UserContext} from '../../context/userContext.jsx'

import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import  uploadImage  from '../../utils/uploadImage';


const SignUp=()=>{
    const [profilePic,setProfilePic]=useState(null);
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const [error, setError]=useState(null);
    
    const {updateUser}=useContext(UserContext);

    const navigate=useNavigate();
    const handleSignUp=async(e)=>{
        e.preventDefault();
        let profileImageUrl="";
        if(!fullName){
            setError("Please enter your full name.");
            return;
        }
        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        if(!password){
            setError("Please enter a password.");
            return;
        }
        setError(""); // Clear previous errors

        try{

            //upload image if present

            if(profilePic){
                const imgUploadRes=await uploadImage(profilePic);
                profileImageUrl=imgUploadRes.imageUrl||"";
            }
            const response =await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
                fullName,
                email,
                password,
                profileImageUrl
            });
            const {token,user}=response.data;
            if(token){
                localStorage.setItem("token",token);
                updateUser(user);
                navigate("/dashboard");
            }
        }catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("Something went wrong, please try again later");
            }
        };
    }
    return(
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0">
                <h3 className="text-xl font semibold text-black">Create an account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us by entering your details !
                </p>
                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Input
                            value={fullName}
                            onChange={({target})=>setFullName(target.value)}
                            label="Full Name"
                            placeholder="John"
                            type="text"/>

                            <Input 
                            value={email}
                            onChange={({target})=>setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"></Input>
                            <div className='col-span-2'>
                            <Input 
                            value={password}
                            onChange={({target})=>setPassword(target.value)}
                            label="Password"
                            placeholder="Minimum 8 characters"
                            type="password"></Input>
                            {
                                            error && (
                                                <p className="text-red-500 text-xs mt-2">{error}</p>
                                            )
                                        }
                                        <button type="submit" className="btn-primary">SIGN UP</button>
                                        <p className='text-[13px] text-slate-800 mt-3'>Already have an account{" "}
                                            <Link className="font-medium text-primary underline" to="/login">Login</Link>
                                            
                                        </p>
                            </div>
                    </div>
                    </form>
            </div>
        </AuthLayout>
    )
}
export default SignUp