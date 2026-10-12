import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {
        setError("");

        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            setError(data.message || "Login failed");
            return;
        }

        if (data.token) {
            localStorage.setItem("token", data.token);
            console.log("Login successful, token saved");
            navigate("/test");
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-80">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Login
            </h2>

            <input
                className="w-full border border-slate-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="w-full border border-slate-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
                <p className="text-red-500 text-sm mb-3">
                    {error}
                </p>
            )}

            <button
                className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
}