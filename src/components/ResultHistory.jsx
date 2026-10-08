import React, { useState } from "react";

export default function ResultHistory() {
    const [history, setHistory] = useState([]);

    async function fetchResults() {
        const token = localStorage.getItem("token");
        if(!token){
            console.log("Please login first");
            return;
        }
        
        const response = await fetch("http://localhost:3000/results", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        setHistory(data.testResults);
    }

    return (
        <div>
            <button onClick={fetchResults}>
                Load History
            </button>

            <div>
                {history.map((result) => (
                    <div key={result._id}>
                        <div>WPM: {result.wpm}</div>
                        <div>Accuracy: {result.accuracy}</div>
                        <div>Time Taken: {result.timeTaken} seconds</div>
                        <div>Date: {new Date(result.createdAt).toLocaleString()}</div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}