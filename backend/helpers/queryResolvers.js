import { ObjectID } from "mongodb";
// WHATS UP LISA
export default (db) => {
    const archipelagos = db.collection("archipelagos");
    const islands = db.collection("islands");
    const islanders = db.collection("islanders");

    const fetchArchipelagoInfo = async ({
        archipelagoId,
        islanderId,
        inviteCode,
    }) => {
        const search = {};
        if (archipelagoId) {
            search._id = new ObjectID.createFromHexString(archipelagoId);
        } else if (islanderId) {
            search["islands.islanders"] = new ObjectID.createFromHexString(
                islanderId
            );
        } else {
            search.inviteCode = inviteCode;
        }
        const result = await archipelagos
            .aggregate([
                {
                    $lookup: {
                        from: "islands",
                        localField: "islands",
                        foreignField: "_id",
                        as: "islands",
                    },
                },
                { $match: search },
                {
                    $unwind: {
                        path: "$islands",
                    },
                },
                {
                    $lookup: {
                        from: "islanders",
                        localField: "islands.islanders",
                        foreignField: "_id",
                        as: "islands.islanders",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        friendsOnly: { $first: "$friendsOnly" },
                        friendInvites: { $first: "$friendInvites" },
                        islands: { $push: "$islands" },
                    },
                },
            ])
            .toArray();
        return result[0];
    };

    const fetchIslandInfo = async ({ islandId, islanderId, slug }) => {
        const search = {};
        if (islandId) {
            search["_id"] = new ObjectID.createFromHexString(islandId);
        } else if (islanderId) {
            search["islanders"] = new ObjectID.createFromHexString(islanderId);
        } else if (slug) {
            search.slug = slug;
        }
        const result = await islands
            .aggregate([
                { $match: search },
                {
                    $lookup: {
                        from: "islanders",
                        localField: "islanders",
                        foreignField: "_id",
                        as: "islanders",
                    },
                },
            ])
            .toArray();
        return result[0];
    };

    const fetchIslanderInfo = async ({ islanderId, email }) => {
        const search = {};
        if (islanderId) {
            search._id = new ObjectID.createFromHexString(islanderId);
        } else {
            search.email = email;
        }
        const result = await islanders
            .aggregate([
                { $match: search },
                {
                    $lookup: {
                        from: "islanders",
                        localField: "islanders",
                        foreignField: "_id",
                        as: "islanders",
                    },
                },
            ])
            .toArray();
        return result[0];
    };


    // ARCHIPELAGO STUFF


    const fetchArchipelagos = async () => {
        const result = await archipelagos
            .aggregate([
                {
                    $lookup: {
                        from: "islands",
                        localField: "islands",
                        foreignField: "_id",
                        as: "islands",
                    },
                },
                {
                    $unwind: {
                        path: "$islands",
                    },
                },
                {
                    $lookup: {
                        from: "islanders",
                        localField: "islands.islanders",
                        foreignField: "_id",
                        as: "islands.islanders",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        friendsOnly: { $first: "$friendsOnly" },
                        friendInvites: { $first: "$friendInvites" },
                        islands: { $push: "$islands" },
                    },
                },
            ])
            .toArray();
        return result;
    };

    const fetchIslands = async () => {
        const result = await islands
            .aggregate([
                {
                    $lookup: {
                        from: "islanders",
                        localField: "islanders",
                        foreignField: "_id",
                        as: "islanders",
                    },
                },
            ])
            .toArray();
        return result;
    };

    const fetchIslanders = async () => {
        const result = await islanders.find().toArray();
        return result;
    };

    return {
        fetchArchipelagoInfo,
        fetchArchipelagos,
        fetchIslanderInfo,
        fetchIslanders,
        fetchIslandInfo,
        fetchIslands,
    };
};
