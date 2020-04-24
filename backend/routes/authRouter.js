import { Router } from "express";
import { createUser, findUserById, validateUser } from "../helpers/auth";
const auth = Router();

auth.post("/validation", (req, res, next) => {
	const user = findUserById(req.session.userId);
	if (user) {
		const { name, email, id } = user;
		res.json({ name, email, id });
	} else {
		res.status(403).send("Invalid request");
	}
});

auth.post("/login", (req, res, next) => {
	validateUser(req.body.email, req.body.password)
		.then((user) => {
			req.session.userId = user.id;
			const { name, email, id } = user;
			res.json({ name, email, id });
		})
		.catch(() => {
			res.status(403).json({});
		});
});

auth.post("/register", (req, res, next) => {
	console.log(req.body);
	const { name, email, password } = req.body;
	const user = createUser({ name, email, password });
	if (user) {
		req.session.userId = user.id;
		res.json({ name, email, id: user.id });
	} else {
		res.status(403).json({});
	}
});

module.exports = auth;
