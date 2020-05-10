import bcrypt from "bcrypt";
import { ObjectID } from "mongodb";

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

export default (db) => {
    const islanders = db.collection("islanders");
    const islands = db.collection("islanders");

    const findUserById = async (userId) => {
        const _id = new ObjectID.createFromHexString(userId);

        return await islanders.findOne({ _id });
    };

    const validateUser = async (email, password) => {
        const user = await islanders.findOne({ email });
        console.log("User found:", user);
        console.log("password to match", password, user.password);
        return bcrypt
            .compare(password, user ? user.password : null)
            .then((isValidated) => {
                if (isValidated) return user;
                if (user) console.log("Bad password");
                else console.log("No user found");

                console.log("Failed to validate");
                return null;
            })
            .catch((err) => console.log("Failed to validate", err));
    };

    const createUser = async ({
        name,
        password,
        islandId,
        email,
        avatarImage,
    }) => {
        const _id = new ObjectID.createFromHexString(islandId);
        const hashedPassword = await bcrypt.hash(password, salt);
        const islanderInfo = {
            _id: new ObjectID(),
            name,
            password: hashedPassword,
            email,
            avatarImage,
            recipes: [],
        };

        const newIslander = await islanders.insertOne(islanderInfo);
        await islands.updateOne(
            { _id },
            { $push: { islanders: newIslander.insertedId } }
        );
        return islanderInfo;
    };

    return { findUserById, validateUser, createUser };
};
