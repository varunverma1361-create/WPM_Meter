import React, {useState} from "react";

export default function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

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
        }
    }

    return(
        <>
        <input placeholder="Username" value={name} onChange={(e)=> setName(e.target.value)}></input>
        <input placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        <input placeholder="Password" value={password} type="password" onChange={(e)=> setPassword(e.target.value)}></input>
        <button onClick={handleSignup}>Sign Up</button>
        </>
    )
}