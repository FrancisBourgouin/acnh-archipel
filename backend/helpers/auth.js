import bcrypt from "bcrypt";
import { islanders } from "./sampleData";

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

// Fix for static data set
const fixedIslanders = islanders.map((islander) => ({
	...islander,
	password: hash,
}));

export const findUserById = (userId) => {
	return fixedIslanders.find((islander) => islander.id === userId);
};

export const validateUser = (email, password) => {
	const user = fixedIslanders.find((islander) => islander.email === email);
	return bcrypt
		.compare(password, user ? user.password : null)
		.then((result) => (result ? user : null))
		.catch(() => null);
};

export const createUser = (user) => {
	const { name, email, password } = user;
	if (name && email && password) {
		const newId = Object.keys(fixedIslanders).length + 1;

		user.password = bcrypt.hashSync(password, salt);
		user.id = newId;

		fixedIslanders.push(user);
		return { id: user.id, name, email };
	}
	return null;
};
