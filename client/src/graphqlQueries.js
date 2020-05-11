export const getArchipelagoByIslanderId = `
	query($islanderId: String!){
		archipelago(islanderId: $islanderId) {
			name
			slug
			islands {
				_id
				name
				slug
				nativeFruit
				turnipPrices {
					date
					price
				}
				islanders {
					_id
					name
					slug
					friendCode
					designerCode
					avatarImage
					recipes
				}
				hotItems
				residents
			}
			inviteCode
		}
	}
`;
export const archipelagoSummaryByInviteCode = `
	query($inviteCode: String!){
		archipelago(inviteCode: $inviteCode) {
			_id
			name
		}
	}
`;
export const islanderByEmail = `
query($email: String!){
  islander(email: $email) {
    _id
    name
    email
  }
}
`;
export const createIslanderQuery = `
	mutation($name: String!, $islandId: String!, $password: String!, $email: String!){
		createIslander(name:$name, islandId:$islandId, password:$password, email:$email) {
			_id
			name
		}
	}
`;
export const createIslandQuery = `
	mutation($name: String!, $nativeFruit: String!, $archipelagoId: String!){
		createIsland(name:$name, nativeFruit:$nativeFruit, archipelagoId:$archipelagoId) {
			_id
			name
		}
	}
`;
export const createArchipelagoQuery = `
	mutation($name: String!){
		createArchipelago(name:$name) {
			_id
			name
		}
	}
`;
