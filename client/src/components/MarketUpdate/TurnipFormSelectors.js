export function getDays() {
	const now = new Date();

	const times = {
		sunday: new Date(),
		monday: new Date(),
		tuesday: new Date(),
		wednesday: new Date(),
		thursday: new Date(),
		friday: new Date(),
		saturday: new Date(),
	};

	times.sunday.setDate(now.getDate() - now.getDay());
	let incrementor = 1;
	for (const day in times) {
		if (day !== "sunday") {
			times[day].setDate(times.sunday.getDate() + incrementor);
			incrementor++;
		}
	}
	return times;
}

export function getCurrentDateTime() {
	const currentDate = new Date();
	const hour = currentDate.getHours();

	return { date: currentDate, timeOfDay: hour >= 12 ? "pm" : "am" };
}
