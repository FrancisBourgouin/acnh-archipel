const schemaData = `
"""
Archipelago info (id, name, [islands]), searchable by archipelagoId or islanderId
"""
type Archipelago {
  _id: String
  name: String
  friendsOnly: Boolean
  friendInvites: [String]
  islands : [Island]
}
"""
Island info ( id, name, nativeFruit, turnipPrice, [islanders]), searchable by islandId
"""
type Island {
  _id: String
  name: String
  nativeFruit: String
  turnipPrices: [TurnipPrice]
  islanders: [Islander]
  hotItems: [String]
  residents: [String]
}
"""
Islander info ( id, name), searchable by islanderId
"""
type Islander {
  _id: String
  name: String
  email: String
  avatarImage: String
  recipes: [String]
}
"""
Turnip price info ( id, name), searchable in islander
"""
type TurnipPrice{
  date: String
  price: Int
}
type Query {
  archipelagos: [Archipelago]
  archipelago(archipelagoId: String, islanderId: String, email: String): Archipelago
  islands: [Island]
  island(islandId: String, islanderId: String): Island
  islanders: [Islander]
  islander(islanderId: String): Islander
}
type Mutation {
  createArchipelago(name: String!): Archipelago
  createIsland(name: String!, nativeFruit: String!, archipelagoId: String!): Island
  createIslander(name: String!, password: String!, islandId: String!, email: String!, avatarImage: String): Islander
  createTurnipPrice(islandId: String!, price: Int!, date:String!): TurnipPrice
}
`;
export default schemaData;
