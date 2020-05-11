import bcrypt from "bcrypt";
import { ObjectID } from "mongodb";

export default (db) => {
    const archipelagos = db.collection("archipelagos");
    const islands = db.collection("islands");
    const islanders = db.collection("islanders");
    const salt = bcrypt.genSaltSync(10);

    const getRandomSlugTag = () => Math.random().toString(36).substring(4);

    const createArchipelago = async ({ name }) => {
        const slug = name.slice(0, 3) + "-" + getRandomSlugTag();
        const archipelagoInfo = {
            _id: new ObjectID(),
            slug,
            name,
            friendsOnly: true,
            inviteCode: "",
            islands: [],
        };

        await archipelagos.insertOne(archipelagoInfo);

        return archipelagoInfo;
    };
    const createIsland = async ({ name, nativeFruit, archipelagoId }) => {
        const slug = name.slice(0, 3) + "-" + getRandomSlugTag();
        const islandInfo = {
            _id: new ObjectID(),
            name,
            slug,
            nativeFruit,
            turnipPrices: [],
            islanders: [],
            hotItems: [],
            residents: [],
        };
        const newIsland = await islands.insertOne(islandInfo);

        await archipelagos.updateOne(
            { _id: new ObjectID.createFromHexString(archipelagoId) },
            { $push: { islands: newIsland.insertedId } }
        );

        return islandInfo;
    };
    const createIslander = async ({
        name,
        password,
        islandId,
        email,
        avatarImage,
    }) => {
        const slug = name.slice(0, 4) + "-" + getRandomSlugTag();
        const hashedPassword = await bcrypt.hash(password, salt);
        const islanderInfo = {
            _id: new ObjectID(),
            name,
            slug,
            password: hashedPassword,
            email,
            avatarImage,
            recipes: [],
        };
        const newIslander = await islanders.insertOne(islanderInfo);

        await islands.updateOne(
            { _id: new ObjectID.createFromHexString(islandId) },
            { $push: { islanders: newIslander.insertedId } }
        );

        return islanderInfo;
    };

    const createTurnipPrice = async ({ price, date, islandId }) => {
        const _id = new ObjectID.createFromHexString(islandId);
        const parsedDate = new Date(date).toUTCString();
        const islandInfo = await islands.updateOne(
            { _id },
            { $push: { turnipPrices: { price, date: parsedDate } } }
        );

        return { price, date: parsedDate };
    };

    return {
        createArchipelago,
        createIsland,
        createIslander,
        createTurnipPrice,
    };
};
