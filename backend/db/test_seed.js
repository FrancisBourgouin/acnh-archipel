const { MongoClient, ObjectID } = require("mongodb");

const url = `mongodb://${process.env.WSL_HOST || "localhost"}:27017`;

const dbName = "archipelago_test";

const turnipPricesGen = () =>
    [...Array(29)].map((_, i) => {
        const price = Math.floor(Math.random() * 500 + 50);
        const date = new Date(`${i + 1} April 2020`).toUTCString();

        return { price, date };
    });

const turnipPrices = turnipPricesGen();
const turnipPrices1 = turnipPricesGen();
const turnipPrices2 = turnipPricesGen();

const residents = ["Stinky", "Carol", "Graham"];
const residents1 = ["Agnes", "Cranston", "Sydney"];
const residents2 = ["Flora", "Fauna", "Ribbot"];

const francisID = "00000457d3fe2a61141d63e0";
const rikiID = "000008aed3fe2a61141d63e1";
const corrinaID = "00000d05d3fe2a61141d63e2";

const raftelID = "5ea22201b7394d525ad37bb9";
const malosID = "5ea12f01b7234d525ad37bb9";
const lolaID = "5ea33f01b7394d525ad37bb9";

const unicornWarriorsID = "5ea33f81b7394d525ad37fe9";

const islanderList = [
    {
        _id: new ObjectID(francisID),
        name: "Francis",
        slug: "francis-e1nz",
        email: "1@archipel.com",
        friendCode: "SW-1234-5678-9999",
        designerCode: "MA-4681-3173-3727",
        password: "password",
        avatarImage: `https://api.adorable.io/avatars/285/1@archipel.png`,
        recipes: ["Wooden Stool"],
    },
    {
        _id: new ObjectID(rikiID),
        name: "Riki",
        slug: "riki-9cbe",
        email: "riki@archipel.com",
        friendCode: "SW-1234-5678-9999",
        designerCode: "MA-4681-3173-3727",
        password: "password",
        avatarImage: `https://api.adorable.io/avatars/285/riki@archipel.png`,
        recipes: ["Cardboard bed"],
    },
    {
        _id: new ObjectID(corrinaID),
        name: "Corrina",
        slug: "corrina-zd8s",
        email: "2@archipel.com",
        friendCode: "SW-1234-5678-9999",
        designerCode: "MA-4681-3173-3727",
        password: "password",
        avatarImage: `https://api.adorable.io/avatars/285/corrina@archipel.png`,
        recipes: ["Ironwood Dresser"],
    },
];

const islandList = [
    {
        _id: new ObjectID(raftelID),
        name: "Raftel",
        slug: "raf-" + raftelID.slice(0, 4),
        nativeFruit: "Peaches",
        islanders: [new ObjectID(francisID)],
        residents: residents,
        turnipPrices: turnipPrices,
        hotItem: ["Hanging plants"],
    },
    {
        _id: new ObjectID(malosID),
        name: "Malos",
        slug: "mal-" + malosID.slice(0, 4),
        nativeFruit: "Apples",
        islanders: [new ObjectID(rikiID)],
        residents: residents1,
        turnipPrices: turnipPrices1,
        hotItem: ["Smoker"],
    },
    {
        _id: new ObjectID(lolaID),
        name: "Isla Lola",
        slug: "isl-" + lolaID.slice(0, 4),
        nativeFruit: "Oranges",
        islanders: [new ObjectID(corrinaID)],
        residents: residents2,
        turnipPrices: turnipPrices2,
        hotItem: ["Hearth"],
    },
];

const archipelago = {
    _id: new ObjectID(unicornWarriorsID),
    name: "Unicorn Warriors",
    slug: "uw-c7zg",
    friendsOnly: true,
    inviteCode: "BADA55",
    islands: [
        new ObjectID(raftelID),
        new ObjectID(malosID),
        new ObjectID(lolaID),
    ],
};

MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const archipelagos = db.collection("archipelagos");
        const islands = db.collection("islands");
        const islanders = db.collection("islanders");

        archipelagos
            .drop()
            .then(() => console.log("Removed archipelagos collection"))
            .then(() => islands.drop())
            .then(() => console.log("Removed islands collection"))
            .then(() => islanders.drop())
            .then(() => console.log("Removed islanders collection"))
            .then(() => db.createCollection("archipelagos"))
            .then((archipelagos) => {
                console.log("Archipelago collection created. Seeding...");
                archipelagos.insertOne(archipelago);
            })
            .then(() => console.log("Archipelago seeded."))
            .then(() => db.createCollection("islands"))
            .then((islands) => {
                console.log("Islands collection created. Seeding...");
                islands.insertMany(islandList);
            })
            .then(() => console.log("Islands added"))
            .then(() => db.createCollection("islanders"))
            .then((islanders) => {
                console.log("Collection islanders created. Seeding...");
                islanders.insertMany(islanderList);
            })
            .then(() => console.log("Islanders added"))
            .then(() => client.close());
    })
    .catch((err) => console.log(err));
