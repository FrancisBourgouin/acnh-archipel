import cookieSession from "cookie-session";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema, GraphQLSchema, } from "graphql";
import { importSchema } from 'graphql-import'
import { MongoClient } from 'mongodb';
import logger from "morgan";
import path from "path";
import mutationResolvers from "./helpers/mutationResolvers";
import queryResolvers from "./helpers/queryResolvers";
import authRouter from "./routes/authRouter";

const url = `mongodb://${process.env.WSL_HOST || "localhost"}:27017`;
const dbName = 'archipelago_test';
const schemaData = importSchema('schema.gql');
const schema = buildSchema(schemaData);
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

MongoClient
	.connect(url, { useUnifiedTopology: true })
	.then(client => {
		const db = client.db(dbName);

		app.use("/auth", authRouter(db));

		const {
			fetchArchipelagoInfo,
			fetchArchipelagos,
			fetchIslanderInfo,
			fetchIslanders,
			fetchIslandInfo,
			fetchIslands
		} = queryResolvers(db)

		const {
			createArchipelago,
			createIsland,
			createIslander,
			createTurnipPrice
		} = mutationResolvers(db)

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
			createTurnipPrice: createTurnipPrice,
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
	})




module.exports = app;
