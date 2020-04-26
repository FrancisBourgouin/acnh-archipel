const { MongoClient, ObjectID } = require('mongodb');


const url = 'mongodb://localhost:27017';
const dbName = 'archipelago_test';

MongoClient
  .connect(url, { useUnifiedTopology: true })
  .then(client => {
    client
      .db(dbName)
      .collection('archipelagos')
      .aggregate(
        [{
          $lookup: {
            from: 'islands',
            localField: 'islands',
            foreignField: '_id',
            as: 'islands'
          }
        }],
        [{
          $unwind: {
            path: '$islands'
          }
        }],
        [{
          $lookup: {
            from: 'islanders',
            localField: 'islands.islanders',
            foreignField: '_id',
            as: 'islands.islanders'
          }
        }],
        [{
          $group: {
            _id: '$_id',
            name: { "$first": "$name" },
            friendsOnly: { "$first": "$friendsOnly" },
            friendInvites: { "$first": "$friendInvites" },
            islands: { "$push": "$islands" }

          }

        }])
      .toArray()
      .then((res) => {
        console.log(res)
      })
  })