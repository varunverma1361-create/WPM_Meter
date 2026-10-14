import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../api";

export default function Signup(){

    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSignup(){
        setLoading(true);
        try{
            const response = await fetch(`${BASE_URL}/users`,{
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

            if(!response.ok){
                setError(data.message || "Signup failed");
            }

            if(data.token){
                localStorage.setItem("token", data.token);
                console.log("Signup successfull, token saved");

                navigate("/test");
            }
        }catch(error){
            console.log(error);
            setError("Something went wrong");
        }finally{
            setLoading(false);
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

        {error && (
            <p className="text-red-500 text-sm mb-3">
                {error}
            </p>
        )}

        <button 
        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
        onClick={handleSignup}
        disabled={loading}
        >{loading ? "Signing up..." : "Signup"}</button>
        </>
    )
}