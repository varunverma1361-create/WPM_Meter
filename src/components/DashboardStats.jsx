import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function DashboardStats(){
    const [stats, setStats] = useState(null);
    const navigate = useNavigate();

    async function fetchStats(){
        const data = await apiRequest("/results/stats", {
            method: "GET"
        }, navigate);

        if(!data) return;

        setStats(data);
    }

    useEffect(()=>{
        fetchStats();
    }, []);

    return (
        <>
            {stats === null ? (
                <div>Loading stats...</div>
            ) : stats.totalTests === 0 ? (
                <div>Take some tests first to see your stats.</div>
            ) : (
                <div>
                    <div>Total Tests: {stats.totalTests}</div>
                    <div>Best WPM: {stats.bestWpm}</div>
                    <div>Average WPM: {stats.averageWpm}</div>
                    <div>Average Accuracy: {stats.averageAccuracy}</div>
                </div>
            )}
        </>
    );
}