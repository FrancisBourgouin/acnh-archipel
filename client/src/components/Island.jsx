import React, { useEffect, useState } from "react";

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
				<div className="flex items-center primary-1 pv2" key={`resident-${i}`}>
					<div className="w2 h2 mr3 bg-primary-1 br-100"></div>
					{islander.name}
				</div>
			);
		});
	};

	const [islandData, setIslandData] = useState({
		ready: false,
	});

	const renderTurnipChart = () => {
		return <div></div>;
	};

	return (
		<main id="island" className="ma4 pt3">
			<section id="card">
				<header className="mb4-ns mb3">
					<h1 className="tc primary-1">Malos</h1>
					<div className="pb3 flex-center flex-row-ns flex-column">
						<i className="mb2 mr5-ns island-avatar-placeholder"></i>
						<div className="flex flex-column">
							<div className="mb2 flex justify-between justify-start-ns">
								<span className="primary-2 nowrap">Island fruit:</span>
								<span className="primary-1 ml3">Apple</span>
							</div>
							<div className="primary-2 nowrap i o-80">Northern Hemisphere</div>
						</div>
					</div>
				</header>
				<section>
					<h3 className="mb2 primary-2">Residents</h3>
					<div id="residents">{renderResidents()}</div>
				</section>
			</section>

			<section id="turnip-graph" className="w-100">
				{islandData.ready && renderTurnipChart()}
			</section>
		</main>
	);
};

export default Island;
