import React, {useState} from "react";

export default function DashboardStats(){
    const [stats, setStats] = useState(null);

    async function fetchStats(){
        const token = localStorage.getItem("token");
        if(!token){
            console.log("Please login first");
            return;
        }
        const response = await fetch("http://localhost:3000/results/stats", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        
        const data = await response.json();
        setStats(data);
    }

    return(
        <>
        <button onClick={fetchStats}>Load Stats</button>
        {stats && (
            <div>
                <div>Total Tests: {stats.totalTests}</div>
                <div>Best Wpm: {stats.bestWpm}</div>
                <div>Average Wpm: {stats.averageWpm}</div>
                <div>Average Accuracy: {stats.averageAccuracy}</div>
            </div>
        )}
        </>
    )
}