import { NavLink } from "react-router-dom";

export default function NavItem({ to, label, disabled }) {
    if (disabled) {
        return (
            <div className="px-3 py-2 rounded-md text-slate-500 cursor-not-allowed opacity-60 font-medium">
                {label}
            </div>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "group flex items-center px-3 py-2 rounded-md transition-all duration-200",
                    "font-medium text-sm tracking-wide",
                    isActive
                        ? "bg-white/10 text-white opacity-100 shadow-sm"
                        : "text-slate-300 opacity-60 hover:opacity-100 hover:bg-white/5",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );
}
