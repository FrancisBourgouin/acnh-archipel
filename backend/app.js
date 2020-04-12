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
    id: ID
    name: String
    islands : [Island]
  }
  type Island {
    id: ID
    name: String
    nativeFruit: String
    turnipPrices: [TurnipPrice]
    islanders : [Islander]
  }
  type Islander {
    id: ID
    name: String
  }
  type TurnipPrice{
    date: String
    price: Int
  }
  type Query {
    hello: String
    archipelago: Archipelago
    islander: Islander
    island: Island
  }
`);
var root = {
	hello: () => {
		return "Hello world!";
	},
	archipelago: () => {
		return { id: 1, name: "Covidian Montréal Consortium" };
	},
	island: () => {
		return { id: 1, name: "Raftel", nativeFruit: "Peaches" };
	},
	islander: () => {
		return { id: 1, name: "Francis" };
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
