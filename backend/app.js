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
  type Query {
    hello: String
  }
`);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: global,
		graphiql: true,
	})
);

module.exports = app;
