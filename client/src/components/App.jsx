import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createClient, Provider, useQuery } from "urql";
import { getArchipelagoByIslanderId } from "../graphqlQueries";
import { ArchipelagoContext } from "../hooks/ArchipelagoContext";
import { UserContext } from "../hooks/UserContext";
import "../styles/App.scss";
import Archipelago from "./Archipelago";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Market from "./Market";
import Profile from "./Profile";
import Register from "./Register";
const client = createClient({
	url: "/graphql",
});

const App = () => {
	const [user, setUser] = useState({});
	const [archipelago, setArchipelago] = useState({});
	const { islanderId } = user
	const [archipelagoResult, archipelagoQuery] = useQuery({
		query: getArchipelagoByIslanderId,
		variables: { islanderId: islanderId },
		pause: !islanderId
	})

	useEffect(() => {
		Axios.post("/auth/validation")
			.then((res) => setUser(res.data))
			.catch((err) => setUser({}));
	}, []);

	useEffect(() => {
		const fetchedArchipelagoResult = archipelagoResult.data && archipelagoResult.data.archipelago
		console.log(archipelagoResult)
		setArchipelago(fetchedArchipelagoResult)
	}, [archipelagoResult])

	return (
		<UserContext.Provider value={user} >
			<ArchipelagoContext.Provider value={archipelago} >
				<Provider value={client}>
					<Router>
						<div className="App">
							<Header />
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/register">
									<Register {...{ user, setUser }} />
								</Route>
								<Route exact path="/login">
									<Login {...{ user, setUser }} />
								</Route>

								<Route exact path="/dashboard">
									<Dashboard />
								</Route>

								<Route exact path="/profile">
									<Profile />
								</Route>
								<Route exact path="/archipelago">
									<Archipelago />
								</Route>
								<Route exact path="/market">
									<Market />
								</Route>
							</Switch>
						</div>
					</Router>
				</Provider>
			</ArchipelagoContext.Provider>
		</UserContext.Provider>
	);
};

export default App;
