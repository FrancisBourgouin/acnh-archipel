import { archipelagos, islanders, islands } from "./sample_data";

export const fetchArchipelagoInfo = ({ archipelagoId, islanderId }) => {
	if (archipelagoId) {
		const archipelago = archipelagos.find(
			(archipelago) => archipelago.id === archipelagoId
		);
		if (archipelago) {
			archipelago.islands = islands
				.filter((island) => island.archipelago_id === archipelagoId)
				.map((island) => ({
					...island,
					islanders: islanders.filter(
						(islander) => islander.island_id === island.id
					),
				}));
			return archipelago;
		}
	}

	if (islanderId) {
		const islander = islanders.find((islander) => islander.id === islanderId);
		const island = islands.find((island) => island.id === islander.island_id);
		const archipelago = archipelagos.find(
			(archipelago) => archipelago.id === island.archipelago_id
		);
		if (archipelago) {
			archipelago.islands = islands
				.filter((island) => island.archipelago_id === archipelago.id)
				.map((island) => ({
					...island,
					islanders: islanders.filter(
						(islander) => islander.island_id === island.id
					),
				}));
			console.log(archipelago.islands);
			return archipelago;
		}
	}
};

export const fetchIslandInfo = ({ id }) => {
	console.log("island", id);
	const island = islands.find((island) => island.id === id);
	island.islanders = islanders.filter((islander) => islander.island_id === id);
	return island;
};

export const fetchIslanderInfo = ({ id }) => {
	console.log("islander", id);
	return islanders.find((islander) => islander.id === id);
};

export const fetchArchipelagos = () => {
	return archipelagos.map((archipelago) =>
		fetchArchipelagoInfo({ archipelagoId: archipelago.id })
	);
};

export const fetchIslands = () => {
	return islands.map(fetchIslandInfo);
};

export const fetchIslanders = () => {
	return islanders;
};
