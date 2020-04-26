const { MongoClient, ObjectID } = require('mongodb');


const url = 'mongodb://localhost:27017';
const dbName = 'archipelago_test';

const turnipPrices = [...Array(30)].map(() => Math.floor(Math.random() * 500 + 50))
const turnipPrices1 = [...Array(30)].map(() => Math.floor(Math.random() * 500 + 50))
const turnipPrices2 = [...Array(30)].map(() => Math.floor(Math.random() * 500 + 50))

const residents = ["Stinky", "Carol", "Graham"]
const residents1 = ["Agnes", "Cranston", "Sydney"]
const residents2 = ["Flora", "Fauna", "Ribbot"]


const islanderList = [
  {
    _id: new ObjectID("00000457d3fe2a61141d63e0"),
    name: "Francis",
    email: "1@archipel.com",
    password: "",
    avatarImage: `https://api.adorable.io/avatars/285/1@archipel.png`,
    recipes: ["Wooden Stool"]
  },
  {
    _id: new ObjectID("000008aed3fe2a61141d63e1"),
    name: "Riki",
    islandId: 2,
    email: "1@archipel.com",
    password: "",
    avatarImage: `https://api.adorable.io/avatars/285/riki@archipel.png`,
    recipes: ["Cardboard bed"]
  },
  {
    _id: new ObjectID("00000d05d3fe2a61141d63e2"),
    name: "Corrina",
    islandId: 1,
    email: "2@archipel.com",
    password: "",
    avatarImage: `https://api.adorable.io/avatars/285/corrina@archipel.png`,
    recipes: ["Ironwood Dresser"]
  },
]

const islandList = [
  {
    _id: new ObjectID("5ea22201b7394d525ad37bb9"),
    name: "Raftel",
    nativeFruit: "Peaches",
    islanders: [new ObjectID("00000457d3fe2a61141d63e0")],
    residents: residents,
    turnipPrices: turnipPrices,
    hotItem: ["Hanging plants"]
  },
  {
    _id: new ObjectID("5ea12f01b7234d525ad37bb9"),
    name: "Montoya",
    nativeFruit: "Apples",
    islanders: [new ObjectID("000008aed3fe2a61141d63e1")],
    residents: residents1,
    turnipPrices: turnipPrices2,
    hotItem: ["Smoker"]
  },
  {
    _id: new ObjectID("5ea33f01b7394d525ad37bb9"),
    name: "Syracuse",
    nativeFruit: "Oranges",
    islanders: [new ObjectID("00000d05d3fe2a61141d63e2")],
    residents: residents2,
    turnipPrices: turnipPrices1,
    hotItem: ["Hearth"]
  }
]


const raftel =
{
  _id: new ObjectID("5ea22201b7394d525ad37bb9"),
  name: "Raftel",
  nativeFruit: "Peaches",
  islanders: [
    {
      _id: new ObjectID("00000457d3fe2a61141d63e0"),
      name: "Francis",
      email: "1@archipel.com",
      password: "",
      avatarImage: `https://api.adorable.io/avatars/285/1@archipel.png`,
      recipes: ["Wooden Stool"]
    },
  ],
  residents: residents,
  turnipPrices: turnipPrices,
  hotItem: ["Hanging plants"]
}
const montoya =
{
  _id: new ObjectID("5ea12f01b7234d525ad37bb9"),
  name: "Montoya",
  nativeFruit: "Apples",
  islanders: [{
    _id: new ObjectID("000008aed3fe2a61141d63e1"),
    name: "Riki",
    islandId: 2,
    email: "1@archipel.com",
    password: "",
    avatarImage: `https://api.adorable.io/avatars/285/riki@archipel.png`,
    recipes: ["Cardboard bed"]
  },
  ],
  residents: residents1,
  turnipPrices: turnipPrices2,
  hotItem: ["Smoker"]
}
const syracuse =
{
  _id: new ObjectID("5ea33f01b7394d525ad37bb9"),
  name: "Syracuse",
  nativeFruit: "Oranges",
  islanders: [{
    _id: new ObjectID("00000d05d3fe2a61141d63e2"),
    name: "Corrina",
    islandId: 1,
    email: "2@archipel.com",
    password: "",
    avatarImage: `https://api.adorable.io/avatars/285/corrina@archipel.png`,
    recipes: ["Ironwood Dresser"]
  },
  ],
  residents: residents2,
  turnipPrices: turnipPrices1,
  hotItem: ["Hearth"]
}

// const archipelago = {
//   _id: new ObjectID("5ea33f81b7394d525ad37fe9"),
//   name: "Covidian Montréal Consortium",
//   friendsOnly: true,
//   friendInvites: ["invite@archipelago.com"],
//   islands: [raftel, montoya, syracuse]
// }

const archipelago = {
  _id: new ObjectID("5ea33f81b7394d525ad37fe9"),
  name: "Covidian Montréal Consortium",
  friendsOnly: true,
  friendInvites: ["invite@archipelago.com"],
  islands: [
    new ObjectID("5ea22201b7394d525ad37bb9"),
    new ObjectID("5ea12f01b7234d525ad37bb9"),
    new ObjectID("5ea33f01b7394d525ad37bb9")
  ]
}



MongoClient
  .connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const archipelagos = db.collection('archipelagos')
    const islands = db.collection('islands')
    const islanders = db.collection('islanders')

    archipelagos.drop()
      .then(() => console.log("Removed archipelagos collection"))
      .then(() => islands.drop())
      .then(() => console.log("Removed islands collection"))
      .then(() => islanders.drop())
      .then(() => console.log("Removed islanders collection"))
      .then(() => db.createCollection('archipelagos'))
      .then(archipelagos => {
        console.log("Collection archipelagos created")
        return archipelagos
      })
      .then((archipelagos) => archipelagos.insertOne(archipelago))
      .then(() => console.log("Archipelago added"))
      .then(() => db.createCollection('islands'))
      .then(islands => {
        console.log("Collection islands created")
        return islands
      })
      .then((islands) => islands.insertMany(islandList))
      .then(() => console.log("Islands added"))
      .then(() => db.createCollection('islanders'))
      .then(islanders => {
        console.log("Collection islanders created")
        return islanders
      })
      .then((islanders) => islanders.insertMany(islanderList))
      .then(() => console.log("Islanders added"))
      .then(() => client.close())

  })
  .catch(err => console.log(err));