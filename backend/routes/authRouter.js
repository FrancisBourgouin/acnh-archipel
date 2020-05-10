import { Router } from "express";
import authHelpers from "../helpers/auth";

export default (db) => {
    const { createUser, findUserById, validateUser } = authHelpers(db);
    const auth = Router();

    auth.post("/validation", (req, res, next) => {
        findUserById(req.session.userId)
            .then((user) => {
                const { name, email, _id, avatarImage, recipes } = user;
                res.json({
                    name,
                    email,
                    islanderId: _id,
                    avatarImage,
                    recipes,
                });
            })
            .catch(() => res.status(403).send("Invalid request"));
    });

    auth.post("/login", (req, res, next) => {
        validateUser(req.body.email, req.body.password)
            .then((user) => {
                console.log("User validated...");
                console.log(user);
                req.session.userId = user._id;
                const { name, email, _id, avatarImage, recipes } = user;
                res.json({
                    name,
                    email,
                    islanderId: _id,
                    avatarImage,
                    recipes,
                });
            })
            .catch((err) => {
                console.log("Error during validation:", err);
                res.status(403).json({});
            });
    });

    auth.post("/register", (req, res, next) => {
        console.log(req.body);
        const { name, email, password, islandId } = req.body;
        const user = createUser({ name, email, password, islandId });
        if (user) {
            req.session.userId = user._id;
            res.json({ name, email, id: user.id });
        } else {
            res.status(403).json({});
        }
    });

    return auth;
};
