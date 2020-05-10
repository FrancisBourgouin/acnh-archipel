import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";
import { UserContext } from "../hooks/UserContext";

export default () => {
    const userData = useContext(UserContext);
    const archipelagoData = useContext(ArchipelagoContext);
    let islandInfo = archipelagoData?.islands?.find((island) => island._id === userData.islandId);
    const [islanderData, setIslanderData] = useState({
        name: "Tom Nook",
        avatarUrl: "",
        islandName: "Malos",
        archipelagoName: "Unicorn Warriors",
        friendCode: "SW-1234-5678-9999",
        designerCode: "MA-9876-6543-2100",
    });

    const renderAvatar = () => {
        if (!userData.avatarImage) return <i className="passport-avatar-placeholder primary-1"></i>;
        return <img className="br4 mw4 w-100 bw1 b--yellow ba mr3" src={userData.avatarImage} />;
    };

    return (
        <main id="passport" className="ma4 pt3">
            <section className="card flex flex-column">
                <header className="mb4 tc primary-1">
                    <h1 className="ma0">{userData?.name || "Tom Nook"}</h1>
                </header>
                <article className="flex flex-column grid-1-1-ns">
                    <div className="flex-center flex-auto-ns self-center mb4 mr4-ns">
                        {renderAvatar()}
                    </div>
                    <div className="flex flex-column justify-center">
                        <div className="mb2 flex justify-between">
                            <div className="mr3 primary-2 nowrap">Home Island</div>
                            <Link
                                to="/island/0"
                                id="island-name"
                                className="flex link primary-1 hover-primary-2 nowrap"
                            >
                                <i className="island-avatar-placeholder-small"></i>
                                <div className="ml2">
                                    {islandInfo?.name || islanderData.islandName}
                                </div>
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            <div className="mr3 mb3 primary-2 nowrap">Archipelago</div>
                            <div id="archipel-name" className="mb3 primary-1 nowrap">
                                {archipelagoData?.name || islanderData.archipelagoName}
                            </div>
                        </div>
                    </div>
                </article>
                <footer className="flex flex-column flex-row-ns justify-between">
                    <div className="mb2 mb0-ns flex flex-column-ns flex-row flex-wrap justify-between">
                        <div className=" primary-2 nowrap">Friend Code</div>
                        <div id="friend-code" className=" primary-1 nowrap">
                            {archipelagoData?.friendCode || islanderData.friendCode}
                        </div>
                    </div>
                    <div className="flex flex-column-ns flex-row flex-wrap justify-between">
                        <div className=" primary-2 nowrap">Designer Code</div>
                        <div id="designer-code" className=" primary-1 nowrap">
                            {archipelagoData?.designerCode || islanderData.designerCode}
                        </div>
                    </div>
                </footer>
            </section>
        </main>
    );
};
