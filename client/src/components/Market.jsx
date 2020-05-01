import React from "react";
import { Link } from "react-router-dom";

const Market = () => {
	const islands = [
		{
			id: 0,
			name: "Montoya",
			currentPrice: 367,
			rateOfChange: 148,
			expectedTrend: "Large Spike",
			hasPeak: true,
			freshPrices: true,
		},
		{
			id: 1,
			name: "Malos",
			currentPrice: 32,
			rateOfChange: -15,
			expectedTrend: "Small Spike",
			hasPeak: false,
			freshPrices: true,
		},
		{
			id: 2,
			name: "Isla Lola",
			currentPrice: 186,
			rateOfChange: 24,
			expectedTrend: "Small Spike",
			hasPeak: true,
			freshPrices: true,
		},
		{
			id: 3,
			name: "Mandalore",
			currentPrice: 86,
			rateOfChange: -12,
			expectedTrend: "Decrementing",
			hasPeak: false,
			freshPrices: true,
		},
		{
			id: 4,
			name: "Raftel",
			currentPrice: 128,
			rateOfChange: -44,
			expectedTrend: "Fluctuating",
			hasPeak: false,
			freshPrices: true,
		},
		{
			id: 5,
			name: "Ozu",
			currentPrice: 222,
			rateOfChange: 148,
			expectedTrend: "Large Spike",
			hasPeak: true,
			freshPrices: true,
		},
		{
			id: 6,
			name: "Hyrule",
			currentPrice: 367,
			rateOfChange: 148,
			expectedTrend: "Decrementing",
			hasPeak: false,
			freshPrices: false,
		},
		{
			id: 7,
			name: "Casatopia",
			currentPrice: 367,
			rateOfChange: 148,
			expectedTrend: "Fluctuating",
			hasPeak: false,
			freshPrices: false,
		},
	];

	const sortIslandsByPeak = () => islands.sort((a, b) => b.currentPrice - a.currentPrice);

	const getTrendSize = (expectedTrend) => {
		return expectedTrend.includes("Large") ? "large" : "small";
	};

	const getPriceIcon = (currentPrice) => {
		return currentPrice > 180
			? "price-positive"
			: currentPrice > 115
			? "price-neutral"
			: "price-negative";
	};

	const getChangeIcon = (rateOfChange) => {
		return rateOfChange > 40
			? "change-big-up"
			: rateOfChange > 0
			? "change-small-up"
			: rateOfChange < -40
			? "change-big-down"
			: "change-small-down";
	};

	const renderIslandInfo = (island) => {
		return (
			<div className="flex-center">
				<Link className="link" to={`/island/${island.id}`}>
					<i className="island-avatar-placeholder mb3"></i>
					<div className="primary-label tc">{island.name}</div>
				</Link>
			</div>
		);
	};

	const renderTrend = (expectedTrend, hasPeak) => {
		return (
			<div className="trend mb3">
				{(hasPeak && (
					<div className="peak">
						<div className={`star-${getTrendSize(expectedTrend)}`} />
						<div className={`mh2 peak-${getTrendSize(expectedTrend)}`}>{expectedTrend} Peak</div>
					</div>
				)) ||
					expectedTrend}
			</div>
		);
	};

	const renderCurrentPrice = (currentPrice) => {
		return (
			<div className="primary-label mb3">
				<i className={`icon ${getPriceIcon(currentPrice)}`}></i>
				{currentPrice} bells
			</div>
		);
	};

	const renderRateOfChange = (rateOfChange) => {
		return (
			<div className="primary-label">
				<i className={`icon ${getChangeIcon(rateOfChange)}`}></i>
				<span className="f6">{rateOfChange}</span> bells
			</div>
		);
	};

	const renderCard = (stalePrices = false) => {
		return sortIslandsByPeak()
			.filter((island) => stalePrices !== island.freshPrices)
			.map((island, i) => (
				<div className="card mb3" key={`${stalePrices ? `stale-card-${i}` : `fresh-card-${i}`}`}>
					<div className="mv1">{renderIslandInfo(island)}</div>
					<div className="turnip-data mv1">
						{renderTrend(island.expectedTrend, island.hasPeak)}
						{renderCurrentPrice(island.currentPrice)}
						{renderRateOfChange(island.rateOfChange)}
					</div>
				</div>
			));
	};

	return (
		<main>
			<header className="mv4">
				<h1 className="tc secondary-1">Turnip Marketplace</h1>
			</header>

			<section id="stalk-market">
				<div id="fresh-cards" className="mt5">
					<h2 className="mb3 secondary-1">Fresh Prices</h2>
					{renderCard()}
				</div>

				<div id="stale-cards" className="mt5">
					<h2 className="mb3 secondary-1">Stale Prices</h2>
					{renderCard(true)}
				</div>
			</section>

			<section></section>
		</main>
	);
};

export default Market;
