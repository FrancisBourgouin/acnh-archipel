import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";

const Market = () => {
    const archipelagoData = useContext(ArchipelagoContext);
    console.log("archipelago data", archipelagoData);
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
    ];

    const getCurrentPrice = (island) => island.turnipPrices[island.turnipPrices.length - 1]?.price;
    const getLastPrice = (island) => island.turnipPrices[island.turnipPrices.length - 2]?.price;
    const getPriceDifference = (island) => getLastPrice(island) - getCurrentPrice(island);

    const sortIslandsByPrice = (islands) =>
        islands.sort((a, b) => getCurrentPrice(b)?.price - getCurrentPrice(a)?.price);

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

    const renderIslandAvatar = (island) => {
        console.log(island);
        return (
            <div className="flex-center">
                <Link className="link" to={`/island/${island.slug}`}>
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
                        <div className={`mh2 peak-${getTrendSize(expectedTrend)}`}>
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

    const renderIslandCards = (stalePrices = false) => {
        const islands = archipelagoData?.islands
            ? sortIslandsByPrice(archipelagoData.islands)
            : null;
        if (!islands) return <div></div>;

        return islands
            .filter((island) => stalePrices !== island.freshPrices)
            .map((island, i) => (
                <div
                    className="card mb3"
                    key={`${stalePrices ? `stale-card-${i}` : `fresh-card-${i}`}`}
                >
                    <div className="mv1">{renderIslandAvatar(island)}</div>
                    <div className="turnip-data mv1">
                        {renderTrend(island.expectedTrend, island.hasPeak)}
                        {renderCurrentPrice(getCurrentPrice(island))}
                        {renderRateOfChange(getPriceDifference(island))}
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
                    {renderIslandCards()}
                </div>
            </section>

            <section></section>
        </main>
    );
};

export default Market;
