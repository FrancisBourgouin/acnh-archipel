import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";
import TurnipChart from "./TurnipChart";

const Island = ({}) => {
    const { slug } = useParams();
    const archipelagoData = useContext(ArchipelagoContext);
    const getIslandBySlug = () => archipelagoData.islands.find((island) => island.slug === slug);

    const renderResidentAvatar = (islander) => {
        if (!islander.avatarImage) return <div className="w2 h2 mr3 bg-primary-1 br-100"></div>;
        return <img className="w2 h2 br-100 bw1 b--yellow ba mr3" src={islander.avatarImage} />;
    };

    const renderResidents = () => {
        return getIslandBySlug()?.islanders?.map((islander, i) => {
            return (
                <li>
                    <Link className="link" to={`/passport/${islander.slug}`}>
                        <div className="flex items-center primary-1 pv2" key={`resident-${i}`}>
                            {renderResidentAvatar(islander)}
                            {islander.name}
                        </div>
                    </Link>
                </li>
            );
        });
    };

    // const [rawIslandData, refreshRawIslandData] = useQuery({ query: getIslandData });
    // const [islandData, setIslandData] = useState({
    //     ready: false,
    // });
    // useEffect(() => {
    //     if (!rawIslandData.fetching)
    //         setIslandData({
    //             ready: true,
    //             ...(rawIslandData &&
    //                 rawIslandData.data && {
    //                     nativeFruit: rawIslandData.data.island.nativeFruit,
    //                     turnipPrices: rawIslandData.data.island.turnipPrices,
    //                     islanders: rawIslandData.data.island.islanders,
    //                 }),
    //         });
    // }, [rawIslandData.fetching]);

    const renderTurnipChart = () => {
        const thisIsland = getIslandBySlug();
        if (thisIsland)
            return (
                <div className="mt4">
                    <TurnipChart islandData={thisIsland} />
                </div>
            );
    };

    if (!archipelagoData?.islands) return <div></div>;

    return (
        <main id="island" className="ma4 pt3">
            <section className="card flex-column">
                <header className="mb4 tc primary-1">
                    <h2 className="ma0">{getIslandBySlug()?.name || "Nook's Isle"}</h2>
                </header>
                <div className="mb4-ns mb3 pb3 grid-1-1-ns flex-column flex-center flex-wrap">
                    <div>
                        <i className="mb2 island-avatar-placeholder"></i>
                    </div>
                    <div className="flex flex-column primary-2">
                        <div className="flex justify-between">
                            <span className="mr4">Island Fruit</span>
                            <span className="primary-1 mb2">{getIslandBySlug()?.nativeFruit}</span>
                        </div>
                        <div className="flex justify-between nowrap">
                            <span className="mr4">Primary Flowers</span>
                            <span className="primary-1 mb2">Windflowers & Tulips</span>
                        </div>
                        <div className="flex justify-between nowrap">
                            <span className="mr4">Hemisphere</span>
                            <span className="primary-1 nowrap">Northern</span>
                        </div>
                    </div>
                </div>
                <section>
                    <h3 className="mb2 primary-2">Island Residents</h3>
                    <ul id="residents" className="list">
                        {renderResidents()}
                    </ul>
                </section>
            </section>

            <section id="turnip-graph" className="w-100 mb4-ns mb3">
                {getIslandBySlug() && renderTurnipChart()}
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
