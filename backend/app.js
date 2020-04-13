import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import logger from "morgan";
import path from "path";
import indexRouter from "./routes/index";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const schema = buildSchema(`
  type Archipelago {
    id: Int
    name: String
    islands : [Island]
  }
  type Island {
    id: Int
    name: String
    nativeFruit: String
    turnipPrices: [TurnipPrice]
    islanders : [Islander]
  }
  type Islander {
    id: Int
    name: String
  }
  type TurnipPrice{
    date: String
    price: Int
  }
  type Query {
    archipelagos: [Archipelago]
    archipelago(id: Int!): Archipelago
    islands: [Island]
    island(id: Int!): Island
    islanders: [Islander]
    islander(id: Int!): Islander
  }
`);

const archipelagos = [
	{ id: 1, name: "Covidian Montréal Consortium" },
	{ id: 2, name: "Secret Group of Destiny" },
];
const islands = [
	{ id: 1, name: "Raftel", nativeFruit: "Peaches", archipelago_id: 1 },
	{ id: 2, name: "Montoya", nativeFruit: "Apples", archipelago_id: 1 },
];
const islanders = [
	{ id: 1, name: "Francis", island_id: 1 },
	{ id: 2, name: "Riki", island_id: 2 },
	{ id: 3, name: "Corrina", island_id: 1 },
];
const root = {
	archipelagos: () => {
		return archipelagos;
	},
	archipelago: ({ id }) => {
		console.log("archipelago", id);
		const archipelago = archipelagos.find(
			(archipelago) => archipelago.id === id
		);
		archipelago.islands = islands.filter(
			(island) => island.archipelago_id === id
		);
		return archipelago;
	},
	islands: () => {
		return islands;
	},
	island: ({ id }) => {
		console.log("island", id);
		const island = islands.find((island) => island.id === id);
		island.islanders = islanders.filter(
			(islander) => islander.island_id === id
		);
		return island;
	},
	islanders: () => {
		return islanders;
	},
	islander: ({ id }) => {
		console.log("islander", id);
		return islanders.find((islander) => islander.id === id);
	},
};

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

module.exports = app;
