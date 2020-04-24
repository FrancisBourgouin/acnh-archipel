export default (db) => {

	const fetchArchipelagoInfo = ({ archipelagoId, islanderId }) => {
		db.find()
	};
	const fetchIslandInfo = ({ islandId, islanderId }) => {
		db.find()
	};

	const fetchIslanderInfo = ({ islanderId }) => {
		db.find()
	};

	const fetchArchipelagos = () => {
		db.find()
	};

	const fetchIslands = () => {
		db.find()
	};

	const fetchIslanders = () => {
		db.find()
	};


	return { fetchArchipelagoInfo, fetchArchipelagos, fetchIslanderInfo, fetchIslanders, fetchIslandInfo, fetchIslands }
};

