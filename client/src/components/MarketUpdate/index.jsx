import React, { useContext } from "react";
import { useMutation } from "urql";
import { UserContext } from "../../hooks/UserContext";
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
	const userData = useContext(UserContext);
	const [, addTurnipPrice] = useMutation(addTurnipPriceMutation);

	const handleSubmit = async (event, enteredTurnipData) => {
		event.preventDefault();

		function createTurnipPayload() {
			const { date, timeOfDay, price } = enteredTurnipData;
			const year = date.getFullYear();
			const month = date.getMonth();
			const day = date.getDate();
			const time = timeOfDay === "am" ? 1 : 13;
			const parsedDate = new Date(year, month, day, time);
			return {
				date: parsedDate,
				price: parseInt(price),
				islandId: userData.islandId,
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
