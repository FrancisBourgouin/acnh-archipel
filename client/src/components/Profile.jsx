import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";
import { UserContext } from "../hooks/UserContext";

export default () => {
    const userData = useContext(UserContext);
    const archipelagoData = useContext(ArchipelagoContext);
    const { slug } = useParams();

    const getIslandBySlug = () => {
        return archipelagoData?.islands?.find(
            (island) => island.islanders.filter((islander) => islander.slug === slug).length > 0
        );
    };

    const getIslanderById = (id) => {
        let foundIslander = {};
        archipelagoData.islands.forEach((island) => {
            island.islanders.forEach((islander) => {
                if (islander._id === id) foundIslander = islander;
            });
        });
        return foundIslander;
    };

    const getIslandById = (id) => {
        return archipelagoData.islands.find((island) => island._id === id);
    };

    const [islandData, setIslandData] = useState({ name: "Nook's Isle", slug: "nooks-isle" });

    const [islanderData, setIslanderData] = useState({
        name: "Tom Nook",
        avatarUrl: "",
        islandName: "Malos",
        archipelagoName: "Unicorn Warriors",
        friendCode: "SW-1234-5678-9999",
        designerCode: "MA-9876-6543-2100",
    });

    useEffect(() => {
        console.log("updating islander data");
        if (!archipelagoData.islands || !userData.name) return;

        if (slug) {
            setIslandData(getIslandBySlug());
            archipelagoData.islands.forEach((island) => {
                island.islanders.forEach((islander) => {
                    if (islander.slug === slug) setIslanderData(islander);
                });
            });
        } else {
            console.log(userData);
            setIslandData(getIslandById(userData.islandId));
            setIslanderData(getIslanderById(userData.islanderId));
        }
    }, [archipelagoData.name, userData.name]);

    const renderAvatar = () => {
        if (!islanderData.avatarImage)
            return <i className="passport-avatar-placeholder primary-1"></i>;
        return (
            <img className="br4 mw4 w-100 bw1 b--yellow ba mr3" src={islanderData.avatarImage} />
        );
    };

    return (
        <main id="passport" className="ma4 pt3">
            <h1 className="ma0 mb4 secondary-1">
                {slug && slug !== userData.slug
                    ? islanderData.name + "'s Passport"
                    : "Your Passport"}
            </h1>
            <section className="card flex flex-column">
                <header className="mb4 tc primary-1">
                    <h2 className="ma0">{islanderData?.name || "Tom Nook"}</h2>
                </header>
                <article className="flex flex-column grid-1-1-ns">
                    <div className="flex-center flex-auto-ns self-center mb4 mr4-ns">
                        {renderAvatar()}
                    </div>
                    <div className="flex flex-column justify-center">
                        <div className="mb2 flex justify-between">
                            <div className="mr3 primary-2 nowrap">Home Island</div>
                            <Link
                                to={`/island/${islandData.slug}`}
                                id="island-name"
                                className="flex link primary-1 hover-primary-2 nowrap"
                            >
                                <i className="island-avatar-placeholder-small"></i>
                                <div className="ml2">{islandData.name}</div>
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            <div className="mr3 mb3 primary-2 nowrap">Archipelago</div>
                            <div id="archipel-name" className="mb3 primary-1 nowrap">
                                {archipelagoData?.name}
                            </div>
                        </div>
                    </div>
                </article>
                <footer className="flex flex-column flex-row-ns justify-between">
                    <div className="mb2 mb0-ns flex flex-column-ns flex-row flex-wrap justify-between">
                        <div className=" primary-2 nowrap">Friend Code</div>
                        <div id="friend-code" className=" primary-1 nowrap">
                            {islanderData?.friendCode}
                        </div>
                    </div>
                    <div className="flex flex-column-ns flex-row flex-wrap justify-between">
                        <div className=" primary-2 nowrap">Designer Code</div>
                        <div id="designer-code" className=" primary-1 nowrap">
                            {islanderData?.designerCode}
                        </div>
                    </div>
                </footer>
            </section>
        </main>
    );
};
