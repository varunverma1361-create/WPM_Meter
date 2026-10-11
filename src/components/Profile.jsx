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

    return (
        <>
            {profile === null ? (
                <div className="text-slate-500">Loading profile...</div>
            ) : (
                <div className="space-y-3">
                    <div>
                        <span className="font-semibold text-slate-700">Name: </span>
                        <span className="text-slate-600">{profile.name}</span>
                    </div>

                    <div>
                        <span className="font-semibold text-slate-700">Email: </span>
                        <span className="text-slate-600">{profile.email}</span>
                    </div>
                </div>
            )}
        </>
    );
}