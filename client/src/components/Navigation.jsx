import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    const navRoutes = [
        {
            to: "/",
            label: "Home",
        },
        {
            to: "/register",
            label: "Register",
            loggedOut: true,
        },
        {
            to: "/login",
            label: "Login",
            loggedOut: true,
        },
        {
            to: "/profile",
            label: "Profile",
            loggedIn: true,
        },
        {
            to: "/archipelago",
            label: "Archipelago",
            loggedIn: true,
        },
    ];

    return (
        <nav className="bg-secondary-1 ma0 pa2">
            <ul className="flex justify-between items-center list">
                <aside className="f3">
                    <Link className="link primary-2 hover-primary-1" to="/">
                        AniArch
                    </Link>
                </aside>

                <main className="flex">
                    {navRoutes.map(
                        (route, i) =>
                            !route.loggedIn && (
                                <li key={"nav-link-" + i} className="ml4">
                                    <Link
                                        className="link primary-2 hover-primary-1"
                                        to={route.to}
                                    >
                                        {route.label}
                                    </Link>
                                </li>
                            )
                    )}
                </main>
            </ul>
        </nav>
    );
};

export default Navigation;
