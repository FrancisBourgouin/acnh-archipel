const schemaData = `
"""
Archipelago info (id, name, [islands]), searchable by archipelagoId or islanderId
"""
type Archipelago {
  id: Int
  name: String
  islands : [Island]
}
"""
Island info ( id, name, nativeFruit, turnipPrice, [islanders]), searchable by islandId
"""
type Island {
  id: Int
  name: String
  nativeFruit: String
  turnipPrices: [TurnipPrice]
  islanders : [Islander]
}
"""
Islander info ( id, name), searchable by islanderId
"""
type Islander {
  id: Int
  name: String
}
"""
Turnip price info ( id, name), searchable by turnipId
"""
type TurnipPrice{
  date: String
  islander_id: Int
  price: Int
}
type Query {
  archipelagos: [Archipelago]
  archipelago(archipelagoId: Int, islanderId: Int): Archipelago
  islands: [Island]
  island(id: Int!): Island
  islanders: [Islander]
  islander(id: Int!): Islander
}
`;
export default schemaData;
