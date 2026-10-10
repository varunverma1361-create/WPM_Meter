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
                <div>Loading history...</div>
            ) : history.length === 0 ? (
                <div>No test history yet. Complete a typing test first.</div>
            ) : (
                history.map((result) => (
                    <div key={result._id}>
                        <div>WPM: {result.wpm}</div>
                        <div>Accuracy: {result.accuracy}</div>
                        <div>Time Taken: {result.timeTaken} seconds</div>
                        <div>Date: {new Date(result.createdAt).toLocaleString()}</div>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}