import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import logger from "morgan";
import path from "path";
import {
	createArchipelago,
	createIsland,
	createIslander,
} from "./helpers/mutationResolvers";
import {
	fetchArchipelagoInfo,
	fetchArchipelagos,
	fetchIslanderInfo,
	fetchIslanders,
	fetchIslandInfo,
	fetchIslands,
} from "./helpers/queryResolvers";
import schemaData from "./helpers/schema";
import indexRouter from "./routes/index";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const schema = buildSchema(schemaData);

const query_resolvers = {
	archipelagos: fetchArchipelagos,
	archipelago: fetchArchipelagoInfo,
	islands: fetchIslands,
	island: fetchIslandInfo,
	islanders: fetchIslanders,
	islander: fetchIslanderInfo,
};

const mutation_resolvers = {
	createArchipelago: createArchipelago,
	createIsland: createIsland,
	createIslander: createIslander,
};
const root = {
	...query_resolvers,
	...mutation_resolvers,
};
console.log(root);
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

module.exports = app;
