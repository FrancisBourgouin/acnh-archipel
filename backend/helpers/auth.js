import bcrypt from "bcrypt";
import { ObjectID } from "mongodb";

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

export default (db) => {

	const islanders = db.collection('islanders')
	const islands = db.collection('islanders')

	const findUserById = async (userId) => {
		const _id = new ObjectID.createFromHexString(userId)

		return await islanders.findOne({ _id });
	};

	const validateUser = async (email, password) => {
		const user = await islanders.findOne({ email });
		console.log(user)
		return bcrypt
			.compare(password, user ? user.password : null)
			.then((result) => (result ? user : null))
			.catch(() => null);
	};

	const createUser = async ({ name, password, islandId, email, avatarImage }) => {
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

	return { findUserById, validateUser, createUser }

}