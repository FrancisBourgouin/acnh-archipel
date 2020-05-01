import bcrypt from 'bcrypt';
import { ObjectID } from 'mongodb';

export default (db) => {

	const archipelagos = db.collection('archipelagos')
	const islands = db.collection('islands')
	const islanders = db.collection('islanders')
	const salt = bcrypt.genSaltSync(10);


	const createArchipelago = async ({ name }) => {
		const archipelagoInfo = {
			_id: new ObjectID(),
			name,
			friendsOnly: true,
			friendInvites: [],
			islands: []
		}

		await archipelagos.insertOne(archipelagoInfo)

		return archipelagoInfo
	};
	const createIsland = async ({ name, nativeFruit, archipelagoId }) => {
		const _id = new ObjectID.createFromHexString(archipelagoId)
		const islandInfo = {
			_id: new ObjectID(),
			name,
			nativeFruit,
			turnipPrices: [],
			islanders: [],
			hotItems: [],
			residents: []
		}
		const newIsland = await islands.insertOne(islandInfo)

		await archipelagos.updateOne(
			{ _id },
			{ $push: { islands: newIsland.insertedId } }
		)

		return islandInfo
	};
	const createIslander = async ({ name, password, islandId, email, avatarImage }) => {
		const _id = new ObjectID.createFromHexString(islandId)
		const hashedPassword = await bcrypt.hash(password, salt)
		const islanderInfo = {
			_id: new ObjectID(),
			name,
			password: hashedPassword,
			email,
			avatarImage,
			recipes: [],
		}
		const newIslander = await islanders.insertOne(islanderInfo)

		await islands.updateOne(
			{ _id },
			{ $push: { islanders: newIslander.insertedId } }
		)

		return islanderInfo
	};

	return { createArchipelago, createIsland, createIslander }
}