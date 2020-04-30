import React from "react";
import { Link } from "react-router-dom";
import "../styles/loggedIn.scss";
import {
    ChatIcon,
    IslandSearchIcon,
    MarketIcon,
    MarketUpdateIcon,
} from "../svgs/MobIsleAppIcons";

export default () => {
    const mobileApps = [
        {
            to: "/profile",
            icon: (
                <i className="f-subheadline light-gray fas fa-address-card"></i>
            ),
            label: "Your Passport",
        },
        {
            to: "/market",
            icon: <MarketIcon />,
            label: "Turnip Market",
        },
        {
            to: "/market/update",
            icon: <MarketUpdateIcon />,
            label: "Update Prices",
        },
        {
            to: "/archipelago",
            icon: <IslandSearchIcon />,
            label: "Island Search",
        },
        {
            to: "/chat",
            icon: <ChatIcon />,
            label: "Archipelago Chat",
        },
    ];

    const renderButtons = () => {
        return mobileApps.map((app, i) => (
            <div key={"app-icon-" + i}>
                <Link
                    className="flex-center flex-column no-underline secondary-1 grow"
                    to={app.to}
                >
                    <div className="flex-center grow pa2 w3 w4-ns h3 h4-ns br4 bg-light-silver hover-bg-moon-gray transition">
                        {app.icon}
                    </div>
                    <div className="mt2 tc grow-large ">{app.label}</div>
                </Link>
            </div>
        ));
    };

    return (
        <main className="flex-center flex-column">
            <h1 className="secondary-1 tc mv4">Mob-Isle Dashboard</h1>
            <section className="grid-3 gap-3 ph4 mw6-ns w-100-ns">
                {renderButtons()}
            </section>
        </main>
    );
};
