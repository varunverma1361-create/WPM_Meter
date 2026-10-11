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
                    <div className="text-slate-500">Loading stats...</div>
                ) : stats.totalTests === 0 ? (
                    <div className="text-slate-500">
                        Take some tests first to see your stats.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-5 rounded-lg">
                            <div className="text-sm text-slate-500">Total Tests</div>
                            <div className="text-2xl font-bold text-blue-600">{stats.totalTests}</div>
                        </div>

                        <div className="bg-green-50 p-5 rounded-lg">
                            <div className="text-sm text-slate-500">Best WPM</div>
                            <div className="text-2xl font-bold text-green-600">{stats.bestWpm}</div>
                        </div>

                        <div className="bg-purple-50 p-5 rounded-lg">
                            <div className="text-sm text-slate-500">Average WPM</div>
                            <div className="text-2xl font-bold text-purple-600">{stats.averageWpm}</div>
                        </div>

                        <div className="bg-orange-50 p-5 rounded-lg">
                            <div className="text-sm text-slate-500">Average Accuracy</div>
                            <div className="text-2xl font-bold text-orange-600">{stats.averageAccuracy}%</div>
                        </div>
                    </div>
                )}
            </>
        );
}