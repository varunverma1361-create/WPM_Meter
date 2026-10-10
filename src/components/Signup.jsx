import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();


    async function handleSignup(){
        const response = await fetch("http://localhost:3000/users",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();
        console.log(data);

        if(data.token){
            localStorage.setItem("token", data.token);
            console.log("Signup successfull, token saved");

            navigate("/test");
        }
    }

    return(
        <>
        <input 
        className="w-full border border-slate-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Username" 
        value={name} 
        onChange={(e)=> setName(e.target.value)}></input>

        <input 
        className="w-full border border-slate-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email" 
        value={email} 
        onChange={(e)=> setEmail(e.target.value)}></input>

        <input 
        className="w-full border border-slate-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password" 
        value={password} 
        type="password" 
        onChange={(e)=> setPassword(e.target.value)}></input>
        <button 
        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
        onClick={handleSignup}>Sign Up</button>
        </>
    )
}