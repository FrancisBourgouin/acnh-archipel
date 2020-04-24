/* Example Schemas for DB
*
*  Using Embedded Data Models for the Design
*
*  Archipelagos is collection
*  Archipelagos contains Islands
*  Archipelagos contains ChatMessages (?)
*  Islands contains Islanders
*  Islands contains TurnipPrices
*  Islands contains Residents (?) NPCs
*  Islands contains HotItemOfTheDay
*  Islanders contains Recipes
*
*/

const exampleArchipelago = {
  // _id: generated by db,
  name: "",
  friendsOnly: true,
  friendInvites: [
    "email"
  ],
  islands: [
    {
      name: "",
      nativeFruit: "",
      islanders: [{
        name: "",
        email: "",
        password: "",
        avatarImage: "",
        recipes: [
          "nameOfRecipe"
        ]
      }],
      turnipPrices: [],
      residents: [],
      hotItem: [],
    }
  ],
}