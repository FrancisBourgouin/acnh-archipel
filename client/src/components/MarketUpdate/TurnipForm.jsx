import React, { useState } from "react";
import { getCurrentDateTime, getDays } from "./TurnipFormSelectors";

export default (props) => {
	const { handleSubmit } = props;

	const defaultDateTime = getCurrentDateTime();
	const times = getDays();

	const options = [];
	for (const day in times) {
		options.push(
			<option key={times[day]} value={times[day]}>
				{day}
			</option>
		);
	}

	const [day, setDay] = useState(defaultDateTime.day);
	const [time, setTime] = useState(defaultDateTime.time);
	return (
		<section>
			<form onSubmit={(event) => handleSubmit(event, { day, time })}>
				<select onChange={(e) => setDay(e.target.value)}>{options}</select>
				<select onChange={(e) => setTime(e.target.value)}>
					<option value="am">AM</option>
					<option value="pm">PM</option>
				</select>
				<button type="submit">Submit Turnip Price</button>
			</form>
		</section>
	);
};
