import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function Profile(){
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    async function fetchProfile(){
        const data = await apiRequest("/users/profile",{
            method: "GET"
        }, navigate);

        if(!data) return;
        
        setProfile(data);
    }

    useEffect(()=>{
        fetchProfile();
    },[]);

    return(
        <>
        {/* <button onClick={fetchProfile}>Profile</button> */}
        {profile && (
            <div>
                <div>Name: {profile.name}</div>
                <div>Email: {profile.email}</div>
            </div>
        )}
        </>
    )
}