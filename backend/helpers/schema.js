const schemaData = `
type Archipelago {
  id: Int
  name: String
  islands : [Island]
}
type Island {
  id: Int
  name: String
  nativeFruit: String
  turnipPrices: [TurnipPrice]
  islanders : [Islander]
}
type Islander {
  id: Int
  name: String
}
type TurnipPrice{
  date: String
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
