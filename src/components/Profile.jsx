import React, {useState} from "react";

export default function Profile(){
    const [profile, setProfile] = useState(null);

    async function fetchProfile(){
        const token = localStorage.getItem("token");
        if(!token){
            console.log("Please login first")
            return;
        }

        const response = await fetch("http://localhost:3000/users/profile",{
            method: "GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json();
        setProfile(data);
    }

    return(
        <>
        <button onClick={fetchProfile}>Profile</button>
        {profile && (
            <div>
                <div>Name: {profile.name}</div>
                <div>Email: {profile.email}</div>
            </div>
        )}
        </>
    )
}