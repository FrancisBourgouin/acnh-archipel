import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import TurnipChart from "./TurnipChart";

const getIslandData = `query
{
	island(islandId: "5ea22201b7394d525ad37bb9") {
	  nativeFruit
	  turnipPrices {
		date
		price
	  }
	  islanders {
		name
		avatarImage
	  }
	}
  }
  
`;

const Island = () => {
	const islanders = [
		{
			id: 1,
			name: "Riki",
			avatar_url: "avatar.jpg",
		},
		{
			id: 2,
			name: "Gab-a-tron",
			avatar_url: "avatar.jpg",
		},
	];

	const renderResidents = () => {
		return islanders.map((islander, i) => {
			return (
				<Link to="/profile">
					<div className="flex items-center primary-1 pv2" key={`resident-${i}`}>
						<div className="w2 h2 mr3 bg-primary-1 br-100"></div>
						{islander.name}
					</div>
				</Link>
			);
		});
	};

	const [rawIslandData, refreshRawIslandData] = useQuery({ query: getIslandData });
	const [islandData, setIslandData] = useState({
		ready: false,
	});
	useEffect(() => {
		if (!rawIslandData.fetching)
			setIslandData({
				ready: true,
				...(rawIslandData &&
					rawIslandData.data && {
						nativeFruit: rawIslandData.data.island.nativeFruit,
						turnipPrices: rawIslandData.data.island.turnipPrices,
						islanders: rawIslandData.data.island.islanders,
					}),
			});
	}, [rawIslandData.fetching]);

	const renderTurnipChart = () => {
		if (islandData.ready)
			return (
				<div className="mt4">
					<TurnipChart islandData={islandData} />
				</div>
			);
	};

	return (
		<main id="island" className="ma4 pt3">
			<section className="card flex-column">
				<header className="mb4 tc primary-1">
					<h1 className="ma0">Malos</h1>
				</header>
				<div className="mb4-ns mb3 pb3 grid-1-1">
					<div>
						<i className="mb2 island-avatar-placeholder"></i>
					</div>
					<div className="flex flex-column">
						<span className="primary-2 mb2">Apples</span>
						<span className="primary-2 mb2">Windflowers & Tulips</span>
						<div className="primary-2 nowrap">Northern Hemisphere</div>
					</div>
				</div>
				<section>
					<h3 className="mb2 primary-2">Residents</h3>
					<div id="residents">{renderResidents()}</div>
				</section>
			</section>

			<section id="turnip-graph" className="w-100 mb4-ns mb3">
				{islandData.ready && renderTurnipChart()}
			</section>
			<article className="card grid-1-1 gap-2">
				<div className="primary-2">Expected Trend</div>
				<div className="primary-1">Fluctuating (78%)</div>
				<div className="primary-2">Peak Range</div>
				<div className="primary-1">422-645</div>
				<div className="primary-2">Peak Time</div>
				<div className="primary-1">Wed PM</div>
			</article>
		</main>
	);
};

export default Island;
