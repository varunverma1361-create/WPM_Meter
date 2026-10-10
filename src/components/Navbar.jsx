import { NavLink } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
    const linkClass = ({ isActive }) =>
        isActive
            ? "font-semibold underline text-blue-600 mr-4"
            : "font-normal text-slate-700 hover:text-blue-600 mr-4";

    return (
        <nav className="w-full px-6 py-4 bg-white shadow-sm flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
                WPM Meter
            </div>

            <div className="flex items-center gap-4">
                <NavLink to="/test" className={linkClass}>
                    Test
                </NavLink>

                <NavLink to="/profile" className={linkClass}>
                    Profile
                </NavLink>

                <NavLink to="/stats" className={linkClass}>
                    Stats
                </NavLink>

                <NavLink to="/history" className={linkClass}>
                    History
                </NavLink>

                <Logout />
            </div>
        </nav>
    );
}