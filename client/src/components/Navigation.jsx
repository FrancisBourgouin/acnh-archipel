import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const Navigation = () => {
    const userData = useContext(UserContext);
    const navRoutes = [
        {
            to: "/dashboard",
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
        },
        {
            to: "/market",
            label: "Marketplace",
        },
    ];

    const renderNavItems = () => {
        return navRoutes.map((route, i) => {
            if (userData.name && route.loggedOut) return <></>;
            else if (!userData.name && !route.loggedOut) return <></>;

            return (
                <li key={"nav-link-" + i} className="mr2 mr3-ns">
                    <Link
                        className="f4-ns ph1 ph2-ns pv2 link primary-2 hover-primary-1"
                        to={route.to}
                    >
                        {route.label}
                    </Link>
                </li>
            );
        });
    };

    return (
        <nav className="bg-secondary-1 ma0 pa2">
            <ul className="flex justify-between items-center list">
                <aside className="f3 f2-ns">
                    <Link
                        className="fink ts-1 link primary-2 hover-primary-1"
                        to={userData.name ? "/dashboard" : "/"}
                    >
                        AniPelago
                    </Link>
                </aside>

                <main className="flex">{renderNavItems()}</main>
            </ul>
        </nav>
    );
};

export default Navigation;
