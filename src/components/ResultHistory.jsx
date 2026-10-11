import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function ResultHistory() {
    const [history, setHistory] = useState(null);
    const navigate = useNavigate();

    async function fetchResults() {
        const data = await apiRequest("/results",{
            method: "GET"
        }, navigate);

        if(!data) return;

        setHistory(data.testResults);
    }

    useEffect(()=>{
        fetchResults();
    },[]);

    return (
        <div>
            {history === null ? (
                <div className="text-slate-500">Loading history...</div>
            ) : history.length === 0 ? (
                <div className="text-slate-500">
                    No test history yet. Complete a typing test first.
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((result) => (
                        <div
                            key={result._id}
                            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                        >
                            <div className="font-semibold text-slate-800">
                                WPM: {result.wpm}
                            </div>
                            <div className="text-slate-600">
                                Accuracy: {result.accuracy}%
                            </div>
                            <div className="text-slate-600">
                                Time Taken: {result.timeTaken} seconds
                            </div>
                            <div className="text-sm text-slate-500 mt-2">
                                {new Date(result.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}