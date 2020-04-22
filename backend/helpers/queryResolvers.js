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

export const fetchIslandInfo = ({ islandId, islanderId }) => {
	if (islandId) {
		const island = islands.find((island) => island.id === islandId);
		island.islanders = islanders.filter(
			(islander) => islander.islandId === islandId
		);
		return island;
	}

	if (islanderId) {
		const islander = islanders.find((islander) => islander.id === islanderId);

		const island = islands.find((island) => island.id === islander.islandId);

		island.islanders = islanders.filter(
			(islander) => islander.islandId === island.id
		);
		return island;
	}
};

export const fetchIslanderInfo = ({ islanderId }) => {
	return islanders.find((islander) => islander.id === islanderId);
};

export const fetchArchipelagos = () => {
	return archipelagos.map((archipelago) =>
		fetchArchipelagoInfo({ archipelagoId: archipelago.id })
	);
};

export const fetchIslands = () => {
	return islands.map((island) => fetchIslandInfo({ islandId: island.id }));
};

export const fetchIslanders = () => {
	return islanders;
};
