import { NavLink } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
    const linkClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold"
            : "text-slate-600 hover:text-blue-600";

    return (
        <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
                WPM Meter
            </div>

            <div className="flex items-center gap-6">
                <NavLink to="/test" className={linkClass}>Test</NavLink>
                <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                <NavLink to="/stats" className={linkClass}>Stats</NavLink>
                <NavLink to="/history" className={linkClass}>History</NavLink>
                <Logout />
            </div>
        </nav>
    );
}