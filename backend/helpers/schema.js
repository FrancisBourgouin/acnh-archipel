const schemaData = `
"""
Archipelago info (id, name, [islands]), searchable by archipelagoId or islanderId
"""
type Archipelago {
  id: ID
  name: String
  islands : [Island]
}
"""
Island info ( id, name, nativeFruit, turnipPrice, [islanders]), searchable by islandId
"""
type Island {
  id: ID
  name: String
  nativeFruit: String
  turnipPrices: [TurnipPrice]
  islanders : [Islander]
}
"""
Islander info ( id, name), searchable by islanderId
"""
type Islander {
  id: ID
  name: String
}
"""
Turnip price info ( id, name), searchable by turnipId
"""
type TurnipPrice{
  id: ID
  date: String
  islander_id: Int
  price: Int
}
type Query {
  archipelagos: [Archipelago]
  archipelago(archipelagoId: Int, islanderId: Int): Archipelago
  islands: [Island]
  island(islandId: Int, islanderId: Int): Island
  islanders: [Islander]
  islander(islanderId: Int): Islander
}
type Mutation {
  createArchipelago(name: String!): Archipelago
  createIsland(name: String!, nativeFruit: String!, archipelagoId: Int!): Island
  createIslander(name: String!, islandId: Int!): Islander
}
`;
export default schemaData;
