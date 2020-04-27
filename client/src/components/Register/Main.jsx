import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import "../../styles/Registration.scss";
import ArchipelagoForm from "./ArchipelagoForm";
import IslanderForm from "./IslanderForm";
import IslandForm from "./IslandForm";



const createIslanderQuery = `
	mutation($name: String!, $islandId: String!, $password: String!, $email: String!){
		createIslander(name:$name, islandId:$islandId, password:$password, email:$email) {
			_id
			name
		}
	}
`;
const createIslandQuery = `
	mutation($name: String!, $nativeFruit: String!, $archipelagoId: String!){
		createIsland(name:$name, nativeFruit:$nativeFruit, archipelagoId:$archipelagoId) {
			_id
			name
		}
	}
`;
const createArchipelagoQuery = `
	mutation($name: String!){
		createArchipelago(name:$name) {
			_id
			name
		}
	}
`;

const archipelagoByEmail = `
	query($email: String!){
		archipelago(email: $email) {
			_id
			name
		}
	}
`
export default (props) => {
	const [registration, setRegistration] = useState({
		islander: null,
		island: null,
		archipelago: null,
		complete: false
	})
	const { islander, island, archipelago, complete } = registration
	const islanderEmail = islander ? islander.email : null
	const [, createIslander] = useMutation(createIslanderQuery)
	const [, createIsland] = useMutation(createIslandQuery)
	const [, createArchipelago] = useMutation(createArchipelagoQuery)
	const [archipelagoResult, archipelagoQuery] = useQuery({
		query: archipelagoByEmail,
		variables: { email: islanderEmail },
		pause: !islanderEmail
	})

	const fetchedArchipelagoResult = archipelagoResult.data && archipelagoResult.data.archipelago

	useEffect(() => {
		console.log(fetchedArchipelagoResult)
		if (fetchedArchipelagoResult) {
			setRegistration({ ...registration, archipelago: fetchedArchipelagoResult })
		}

	}, [fetchedArchipelagoResult])

	const handleIslander = (event, islander) => {
		event.preventDefault()
		setRegistration({ ...registration, islander })
		archipelagoQuery()
	}
	const handleIsland = (event, island) => {
		event.preventDefault()
		setRegistration({ ...registration, island })
	}
	const handleArchipelago = (event, archipelago) => {
		event.preventDefault()
		setRegistration({ ...registration, archipelago, complete: true })
	}
	const executeQueries = () => {
		if (archipelago._id) {
			createIsland({ ...island, archipelagoId: archipelago._id })
				.then(result => {
					console.log(result)
					const islandId = result.data.createIsland._id
					return createIslander({ ...islander, islandId })
				})
		} else {
			createArchipelago(archipelago)
				.then(result => {
					const archipelagoId = result.data.createArchipelago._id
					return createIsland({ ...island, archipelagoId })
				})
				.then(result => {
					console.log(result)
					const islandId = result.data.createIsland._id
					return createIslander({ ...islander, islandId })
				})

		}
	}
	return (
		<section class="Registration">
			<header>
				<h1>Register your islander !</h1>
			</header>

			{!complete && <IslanderForm handleSubmit={handleIslander} />}
			{!complete && islander && <IslandForm handleSubmit={handleIsland} />}
			{!complete && island && <ArchipelagoForm handleSubmit={handleArchipelago} archipelago={archipelago} />}
			{islander && island && archipelago &&
				<button onClick={executeQueries}>Join in !</button>
			}
		</section>
	);
};
