import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import logger from "morgan";
import path from "path";
import {
	fetchArchipelagoInfo,
	fetchArchipelagos,
	fetchIslanderInfo,
	fetchIslanders,
	fetchIslandInfo,
	fetchIslands,
} from "./helpers/resolvers";
import schemaData from "./helpers/schema";
import indexRouter from "./routes/index";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const schema = buildSchema(schemaData);

const root = {
	archipelagos: fetchArchipelagos,
	archipelago: fetchArchipelagoInfo,
	islands: fetchIslands,
	island: fetchIslandInfo,
	islanders: fetchIslanders,
	islander: fetchIslanderInfo,
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
