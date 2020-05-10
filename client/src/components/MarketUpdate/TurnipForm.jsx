import React, { useState } from "react";
import { getCurrentDateTime, getDays } from "./TurnipFormSelectors";

export default (props) => {
	const { handleSubmit } = props;

	const defaultDateTime = getCurrentDateTime();
	const times = getDays();

	const options = [];
	for (const day in times) {
		options.push(
			<option key={times[day].getDay()} value={times[day]}>
				{day}
			</option>
		);
	}

	const [date, setDay] = useState(defaultDateTime.date);
	const [timeOfDay, setTimeOfDay] = useState(defaultDateTime.timeOfDay);
	const [price, setprice] = useState(0);

	return (
		<section>
			<form onSubmit={(event) => handleSubmit(event, { date, timeOfDay, price })}>
				<select
					defaultValue={defaultDateTime.date}
					required="required"
					onChange={(e) => setDay(e.target.value)}
				>
					{options}
				</select>
				<select
					defaultValue={defaultDateTime.timeOfDay}
					required="required"
					onChange={(e) => setTimeOfDay(e.target.value)}
				>
					<option value="am">AM</option>
					<option value="pm">PM</option>
				</select>
				<input type="number" required="required" onChange={(e) => setprice(e.target.value)} />
				<button type="submit">Submit Turnip Price</button>
			</form>
		</section>
	);
};
