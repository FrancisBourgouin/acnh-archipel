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
            currentPrice: 367,
            rateOfChange: 148,
            expectedTrend: "Small Spike",
            hasPeak: true,
            freshPrices: false,
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

    const renderPeakFlag = (expectedTrend) => {
        return (
            <div className="high-price pa1 br2 absolute flex items-center">
                <div className="star w1 h1"></div>
                <div className="f7 mh2 secondary-1">{expectedTrend} Peak</div>
            </div>
        );
    };

    const renderCard = (stalePrices = false) => {
        return islands
            .filter((island) => stalePrices !== island.freshPrices)
            .map((island, i) => (
                <Link
                    className="link w-100 mw9-l mt3 pt2"
                    to={`/island/${island.id}`}
                >
                    <div className="card flex justify-between w-100 ph3 bg-secondary-1 hover-bg-secondary-2 transition br4-l">
                        {island.hasPeak && renderPeakFlag(island.expectedTrend)}

                        <div className="flex items-center">
                            <i className="fas fa-globe-europe secondary-1 bg-primary-1 pa1 br-100"></i>
                            <div className="ml2 primary-1">{island.name}</div>
                        </div>

                        <div className="flex flex-column flex-row-ns pv2 justify-end-ns items-baseline flex-auto-ns">
                            <div className="pa2 br3 primary-1 nowrap tc flex-auto">
                                <i
                                    className={`bg-primary-1 pa1 br-100 fas fa-${
                                        island.currentPrice > 180
                                            ? "thumbs-up icon-positive"
                                            : island.currentPrice > 115
                                            ? "minus-circle icon-neutral"
                                            : "thumbs-down icon-negative"
                                    }`}
                                ></i>
                                {island.currentPrice} bells
                            </div>
                            <div className="pa2 br3 primary-1 nowrap tc">
                                <i
                                    className={`bg-primary-1 mr2 pv1 ph2 br-100 fas ${
                                        island.rateOfChange > 40
                                            ? "fa-angle-double-up dark-green"
                                            : island.rateOfChange > 0
                                            ? "fa-angle-up dark-green"
                                            : island.rateOfChange < -40
                                            ? "fa-angle-double-down tertiary-1"
                                            : "fa-angle-down tertiary-1"
                                    }`}
                                ></i>
                                {island.rateOfChange} bells
                            </div>
                            <div className="w-100 w-auto-ns pa2 br3 f6 primary-2 i nowrap br-pill tc">
                                {island.expectedTrend}
                            </div>
                        </div>
                    </div>
                </Link>
            ));
    };
    return (
        <main>
            <header className="pv3">
                <h1 className="tc secondary-1">Turnip Marketplace</h1>
            </header>

            <section className="stalk-market flex-center flex-column">
                <h2 className="pv3 ph3 secondary-1">Fresh Prices</h2>
                <div className="flex-center flex-column w-100 mw7-l">
                    {renderCard()}
                </div>

                <h2 className="mt4 pv3 ph3 secondary-1">Stale Prices</h2>
                <div className="flex-center flex-column w-100 mw7-l">
                    {renderCard(true)}
                </div>
            </section>

            <section></section>
        </main>
    );
};

export default Market;
