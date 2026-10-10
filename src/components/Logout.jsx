import {useNavigate} from "react-router-dom";


export default function Logout(){
    const navigate = useNavigate();
    
    function handleLogout(){
        localStorage.removeItem("token");
        console.log("token removed");

        navigate("/");
    }

    return(
        <>
        <button 
        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
        onClick={handleLogout}>Logout</button>
        </>
    )
}