import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { archipelagoSummaryByInviteCode, createArchipelagoQuery, createIslanderQuery, createIslandQuery } from "../../graphqlQueries";
import "../../styles/Registration.scss";
import ArchipelagoForm from "./ArchipelagoForm";
import IslanderForm from "./IslanderForm";
import IslandForm from "./IslandForm";




export default (props) => {
	const history = useHistory()
	const [registration, setRegistration] = useState({
		islander: null,
		island: null,
		archipelago: null,
		complete: false
	})
	const { islander, island, archipelago, complete } = registration
	const islanderInviteCode = islander ? islander.inviteCode : null
	const [, createIslander] = useMutation(createIslanderQuery)
	const [, createIsland] = useMutation(createIslandQuery)
	const [, createArchipelago] = useMutation(createArchipelagoQuery)
	const [archipelagoResult, archipelagoQuery] = useQuery({
		query: archipelagoSummaryByInviteCode,
		variables: { inviteCode: islanderInviteCode },
		pause: !islanderInviteCode
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
		setRegistration({ ...registration, island, /* complete: archipelago */ })
	}
	const handleArchipelago = (event, archipelago) => {
		event.preventDefault()
		setRegistration({ ...registration, archipelago, /* complete: true */ })
	}
	const executeQueries = () => {
		if (archipelago._id) {
			createIsland({ ...island, archipelagoId: archipelago._id })
				.then(result => {
					console.log(result)
					const islandId = result.data.createIsland._id
					return createIslander({ ...islander, islandId })
				})
				.then(() => Axios.post('/auth/login', { email: islander.email, password: islander.password }))
				.then(res => props.setUser(res.data))
				.then(() => history.push('/dashboard'))
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
				.then(() => Axios.post('/auth/login', { email: islander.email, password: islander.password }))
				.then(res => props.setUser(res.data))
				.then(() => history.push('/dashboard'))

		}
	}
	return (
		<section class="Registration">
			<header>
				<h1>Register your islander !</h1>
			</header>

			{!complete && <IslanderForm handleSubmit={handleIslander} />}
			{!complete && islander && <IslandForm handleSubmit={handleIsland} />}
			{!complete && island && !archipelago && <ArchipelagoForm handleSubmit={handleArchipelago} archipelago={archipelago} />}
			{!complete && island && archipelago && <h3>You are already invited to the {archipelago.name} archipelago, great !</h3>}
			{islander && island && archipelago &&
				<button onClick={executeQueries}>Join in !</button>
			}
		</section>
	);
};
