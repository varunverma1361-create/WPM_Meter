export default function Logout(){
    function handleLogout(){
        localStorage.removeItem("token");
        console.log("token removed");
    }

    return(
        <>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}