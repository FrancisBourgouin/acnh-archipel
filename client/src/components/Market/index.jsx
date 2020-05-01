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

    const sortIslandsByPeak = () => {
        return islands.sort((a, b) =>
            a.currentPrice <= b.currentPrice ? 1 : -1
        );
    };

    const renderIslandInfo = (island) => {
        return (
            <div className="flex-center">
                <Link
                    className="link dib flex-column"
                    to={`/island/${island.id}`}
                >
                    <i className="pa2 mb2 f-subheadline fas fa-globe-europe secondary-1 bg-primary-1 br3"></i>
                    <div className="mt1 ml2 primary-1 tc">{island.name}</div>
                </Link>
            </div>
        );
    };

    const renderTrend = (expectedTrend, hasPeak) => {
        return (
            <div className="trend mb3 flex-center f6 primary-2 i tc nowrap br-pill">
                {(hasPeak && (
                    <div className="peak-price btn-shadow pa1 br2 flex items-center">
                        <div
                            className={`star-${
                                expectedTrend.includes("Large")
                                    ? "large"
                                    : "small"
                            }`}
                        ></div>
                        <div
                            className={`peak-${
                                expectedTrend.includes("Large")
                                    ? "large"
                                    : "small"
                            } mh2 secondary-1 small-caps`}
                        >
                            {expectedTrend} Peak
                        </div>
                    </div>
                )) ||
                    expectedTrend}
            </div>
        );
    };

    const renderCurrentPrice = (currentPrice) => {
        return (
            <div className="mb3 primary-1 nowrap tc">
                <i
                    className={`pa2 bg-primary-1 br-100 fas fa-${
                        currentPrice > 180
                            ? "thumbs-up icon-positive"
                            : currentPrice > 115
                            ? "minus-circle icon-neutral"
                            : "thumbs-down icon-negative"
                    }`}
                ></i>
                {currentPrice} bells
            </div>
        );
    };

    const renderRateOfChange = (rateOfChange) => {
        return (
            <div className="primary-1 nowrap tc">
                <i
                    className={`bg-primary-1 mr2 pv1 ph2 br-100 fas ${
                        rateOfChange > 40
                            ? "fa-angle-double-up dark-green"
                            : rateOfChange > 0
                            ? "fa-angle-up dark-green"
                            : rateOfChange < -40
                            ? "fa-angle-double-down tertiary-1"
                            : "fa-angle-down tertiary-1"
                    }`}
                ></i>
                <span className="f6">{rateOfChange}</span> bells
            </div>
        );
    };

    const renderCard = (stalePrices = false) => {
        return sortIslandsByPeak()
            .filter((island) => stalePrices !== island.freshPrices)
            .map((island, i) => (
                <div className="card w-100 mw6-ns mt3 pv2 ph3 bg-secondary-1 hover-bg-secondary-2 br4-ns transition">
                    <div className="mv2">{renderIslandInfo(island)}</div>
                    <div className="flex flex-column justify-center items-start mv2">
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

            <section className="stalk-market  flex-center flex-column">
                <h2 className="mv2 ph3 secondary-1">Fresh Prices</h2>
                {renderCard()}

                <h2 className="mt5 mb2 ph3 secondary-1">Stale Prices</h2>
                {renderCard(true)}
            </section>

            <section></section>
        </main>
    );
};

export default Market;
