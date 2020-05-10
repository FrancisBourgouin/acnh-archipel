import React from "react";
import { Link } from "react-router-dom";
import { ChatIcon, IslandSearchIcon, MarketIcon, MarketUpdateIcon } from "../svgs/MobIsleAppIcons";

export default () => {
	const mobileApps = [
		{
			to: "/profile",
			icon: <i className="icon passport-app"></i>,
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
				<Link className="flex-center flex-column no-underline secondary-1 grow" to={app.to}>
					<div className="dashboard-app mb2">{app.icon}</div>
					<div className="tc grow">{app.label}</div>
				</Link>
			</div>
		));
	};

	return (
		<main id="dashboard">
			<h1 className="mv4 secondary-1 tc">Mob-Isle Dashboard</h1>
			<section id="app-grid">{renderButtons()}</section>
		</main>
	);
};
