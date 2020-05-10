import React from "react";
import { Line } from "react-chartjs-2";

const TurnipChart = ({ islandData }) => {
	const turnipTimes = [
		"Turnip Day",
		"Mon AM",
		"Mon PM",
		"Tue AM",
		"Tue PM",
		"Wed AM",
		"Wed PM",
		"Thu AM",
		"Thu PM",
		"Fri AM",
		"Fri PM",
		"Sat AM",
		"Sat PM",
	];

	const getLineData = () => {
		return {
			labels: turnipTimes.map((label, i) => (i === 0 || i % 2 === 1 ? label : "")),
			datasets: [
				{
					label: "Turnip Trends",
					fill: true,
					lineTension: 0.5,
					borderColor: "#333",
					borderCapStyle: "butt",
					borderJoinStyle: "miter",
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 20,
					data: islandData.turnipPrices && islandData.turnipPrices.map((price) => price.price),
				},
			],
			options: {
				offsetGridLines: true,
				maintainAspectRatio: true,
			},
		};
	};
	return (
		<aside className="flex-center">
			<div className="w-100 mw6">
				<Line
					data={getLineData()}
					width={200}
					options={{
						scales: {
							yAxes: [
								{
									ticks: {
										labelString: "Turnip Prices",
										fontColor: "#834b16",
										fontSize: 16,
										fontFamily: "Arial Rounded MT Bold",
									},
								},
							],
							xAxes: [
								{
									ticks: {
										fontColor: "#834b16",
										fontSize: 16,
										fontFamily: "Arial Rounded MT Bold",
									},
								},
							],
						},
					}}
				/>
			</div>
		</aside>
	);
};

export default TurnipChart;
