import cookieSession from "cookie-session";
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
import authRouter from "./routes/authRouter";

const app = express();
app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	cookieSession({
		name: "session",
		keys: ["*h}N/$Ccc,|U(8Z}7lbPO)pB_qTZ8!", "b|NXh$igsw`Q{>=}@drUnT#wJ(@]OY"],
	})
);

app.get("/", function (req, res, next) {
	res.send(
		"Hello. \n '/graphql' for the GraphQL endpoint \n '/auth' for authentication / registration"
	);
});

app.use("/auth", authRouter);

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

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

module.exports = app;
