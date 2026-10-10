// login, signup

import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage(){
    return(
        <div className="min-h-screen bg-slate-100 flex flex-col itmes-center justify-center px-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-8">Typing Test</h1>
            <div className="flex flex-col md:flex-row gap-6 items-strech">
                <Login/>
                <Signup/>
            </div>
        </div>
    )
}