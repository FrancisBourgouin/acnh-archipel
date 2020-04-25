import { ObjectID } from 'mongodb';

export default (db) => {
	const archipelagos = db.collection('archipelagos')

	const fetchArchipelagoInfo = async ({ archipelagoId, islanderId }) => {
		const search = {}
		if (archipelagoId) {
			search._id = new ObjectID.createFromHexString(archipelagoId)
		} else {
			search["islands.islanders._id"] = new ObjectID.createFromHexString(islanderId)
		}
		const result = await archipelagos.find(search).toArray()
		return result[0]
	};

	const fetchIslandInfo = async ({ islandId, islanderId }) => {
		const search = {}
		if (islandId) {
			search["islands._id"] = new ObjectID.createFromHexString(islandId)
			const result = await archipelagos.find(search).toArray()
			console.log(result[0].islands[0]._id, typeof (result[0].islands[0]._id))
			return result[0].islands.find(island => (island._id).toHexString() === islandId)
		} else {
			search["islands.islanders._id"] = new ObjectID.createFromHexString(islanderId)
			const result = await archipelagos.find(search).toArray()
			const island = result[0]
				.islands
				.filter(
					({ islanders }) => islanders.filter(islander => (islander._id).toHexString() === islanderId).length)

			return island[0]
		}
	};

	const fetchIslanderInfo = async ({ islanderId }) => {
		const output = []
		const archipelagoList = await archipelagos.find().toArray()
		archipelagoList
			.forEach(archipelago => {
				archipelago.islands
					.forEach(island => {
						island.islanders
							.forEach(islander => output.push(islander))
					})
			})
		return output.find(islander => islander._id.toHexString() === islanderId)
	};

	const fetchArchipelagos = async () => {

		return await archipelagos.find().toArray()
	};

	const fetchIslands = async () => {
		const output = []
		const archipelagoList = await archipelagos.find().toArray()
		archipelagoList.forEach(archipelago => {
			archipelago.islands.forEach(island => output.push(island))
		})
		return output
	};

	const fetchIslanders = async () => {
		const output = []
		const archipelagoList = await archipelagos.find().toArray()
		archipelagoList
			.forEach(archipelago => {
				archipelago.islands
					.forEach(island => {
						island.islanders
							.forEach(islander => output.push(islander))
					})
			})
		return output
	};


	return { fetchArchipelagoInfo, fetchArchipelagos, fetchIslanderInfo, fetchIslanders, fetchIslandInfo, fetchIslands }
};

