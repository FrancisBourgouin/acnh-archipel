import React from "react";
import { useMutation } from "urql";
import TurnipForm from "./TurnipForm";

const addTurnipPriceMutation = `
    mutation($islandId: String!, $price: Int!, $date: String!){
        createTurnipPrice(islandId:$islandId, price:$price, date:$date) {			
            date
            price
        }
    }
`;

export default (props) => {
	const [, addTurnipPrice] = useMutation(addTurnipPriceMutation);

	const handleSubmit = async (event, enteredTurnipData) => {
		event.preventDefault();
		debugger;

		function createTurnipPayload() {
			return {
				date: new Date(enteredTurnipData.date + " " + enteredTurnipData.time).toString(),
				price: parseInt(enteredTurnipData.price),
				islandId: "5ea33f01b7394d525ad37bb9",
			};
		}

		const payload = createTurnipPayload();
		await addTurnipPrice(payload);
	};

	return (
		<section class="Form">
			<h2>Updating prices on </h2>
			<TurnipForm handleSubmit={handleSubmit} />
		</section>
	);
};
