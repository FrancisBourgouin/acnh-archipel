import { archipelagos, islanders, islands } from "./sampleData";

export const fetchArchipelagoInfo = ({ archipelagoId, islanderId }) => {
	if (archipelagoId) {
		const archipelago = archipelagos.find(
			(archipelago) => archipelago.id === archipelagoId
		);
		if (archipelago) {
			archipelago.islands = islands
				.filter((island) => island.archipelagoId === archipelagoId)
				.map((island) => ({
					...island,
					islanders: islanders.filter(
						(islander) => islander.islandId === island.id
					),
				}));
			return archipelago;
		}
	}

	if (islanderId) {
		const islander = islanders.find((islander) => islander.id === islanderId);
		const island = islands.find((island) => island.id === islander.islandId);
		const archipelago = archipelagos.find(
			(archipelago) => archipelago.id === island.archipelagoId
		);
		if (archipelago) {
			archipelago.islands = islands
				.filter((island) => island.archipelagoId === archipelago.id)
				.map((island) => ({
					...island,
					islanders: islanders.filter(
						(islander) => islander.islandId === island.id
					),
				}));
			return archipelago;
		}
	}
};

export const fetchIslandInfo = ({ id }) => {
	const island = islands.find((island) => island.id === id);
	island.islanders = islanders.filter((islander) => islander.islandId === id);
	return island;
};

export const fetchIslanderInfo = ({ id }) => {
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
