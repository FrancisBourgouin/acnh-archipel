export function createTurnipPayload(enteredTurnipData, islandId) {
	const { date, timeOfDay, price } = enteredTurnipData;
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const time = timeOfDay === "am" ? 0 : 12;
	const parsedDate = new Date(year, month, day, time);
	return {
		date: parsedDate,
		price: parseInt(price),
		islandId: islandId,
	};
}

export function findIslandByIslandId(islands = [], islandId) {
	let islandIndex = 0;
	for (let island of islands) {
		if (island._id === islandId) {
			return islandIndex;
		}
		islandIndex++;
	}
	return undefined;
}
