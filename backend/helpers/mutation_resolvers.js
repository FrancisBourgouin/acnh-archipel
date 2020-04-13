import { archipelagos, islanders, islands } from "./sample_data";

export const createArchipelago = ({ name }) => {
	const newArchipelago = { id: archipelagos.length + 1, name };
	archipelagos.push(newArchipelago);
};
export const createIsland = ({ name, nativeFruit, archipelagoId }) => {
	const newIsland = {
		id: islands.length + 1,
		name,
		nativeFruit,
		archipelagoId,
	};
	islands.push(newIsland);
};
export const createIslander = ({ name, islandId }) => {
	const newIslander = { id: islanders.length + 1, name, islandId };
	islanders.push(newIslander);
};
