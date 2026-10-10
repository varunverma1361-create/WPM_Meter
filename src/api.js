const BASE_URL = "http://localhost:3000";

export async function apiRequest(path, options = {}, navigate){
    const token = localStorage.getItem("token");

    if(!token){
        console.log("Please login first");
        navigate("/");
        return null;
    }

    const response = await fetch(`${BASE_URL}${path}`,{
        ...options,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...options.headers
        }
    });

    if(response.status === 401){
        localStorage.removeItem("token");
        navigate("/");
        return null;
    }

    const data = await response.json();
    return data;
}