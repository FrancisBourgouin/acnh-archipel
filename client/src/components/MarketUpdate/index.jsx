import React, { useContext } from "react";
import { useMutation } from "urql";
import { ArchipelagoContext } from "../../hooks/ArchipelagoContext";
import { UserContext } from "../../hooks/UserContext";
import "../../styles/Registration.scss";
import TurnipForm from "./TurnipForm";
import { createTurnipPayload, findIslandByIslandId } from "./UpdateTurnipSelectors";

const addTurnipPriceMutation = `
    mutation($islandId: String!, $price: Int!, $date: String!){
        createTurnipPrice(islandId:$islandId, price:$price, date:$date) {			
            date
            price
        }
    }
`;

export default (props) => {
	const userData = useContext(UserContext);
	const archipelagoData = useContext(ArchipelagoContext);
	const [, addTurnipPrice] = useMutation(addTurnipPriceMutation);

	const islandToUpdate = findIslandByIslandId(archipelagoData.islands, userData.islandId);
	debugger;
	const updateIslandPrices = (turnipPrice) => {
		if (islandToUpdate) {
			const updatedIslandData = archipelagoData.islands[islandToUpdate],
				archipelagoDataClone = archipelagoData;

			updatedIslandData.turnipPrices.push(turnipPrice);
			archipelagoDataClone.islands.splice(islandToUpdate, 1, updatedIslandData);

			props.setArchipelago(archipelagoDataClone);
		} else {
			console.log("Error adding turnip prices");
		}
	};

	const handleSubmit = async (event, enteredTurnipData) => {
		event.preventDefault();
		const payload = createTurnipPayload(enteredTurnipData, userData.islandId);
		try {
			const response = await addTurnipPrice(payload);
			updateIslandPrices(response.data.createTurnipPrice);
		} catch (error) {
			console.log("Error adding turnip prices", error);
		}
	};

	return (
		<section className="Form">
			<h2>Updating prices on {archipelagoData.islands[islandToUpdate].name}</h2>
			<TurnipForm handleSubmit={handleSubmit} />
		</section>
	);
};
