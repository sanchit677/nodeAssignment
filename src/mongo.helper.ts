import * as mongo from 'mongodb';

export class MongoHelper {
     public static client: mongo.MongoClient;

     constructor(){
     }

     public static connect(url: string) : Promise<any> {
         return new Promise<any>((resolve, reject) => {
            mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client: mongo.MongoClient ) => {
                if(err){
                    reject(err);
                }
                else{
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
         });
     }

     public disconnect(): void {
        MongoHelper.client.close();
     }
}

// database inserts

// use CRUD

// db.createCollection("weapon")

// db.weapon.insertMany([{
//         "name": "UMP45",
//         "damage": 45,
//         "dps": 60,
//         "type": "SMG",
//         "remarks": "Greatest SMG out there."
//     },
//     {
//         "name": "AWM",
//         "damage": 79,
//         "dps": 44,
//         "type": "Sniper",
//         "remarks": "The best kind."
//     },
//     {
//         "name": "M24",
//         "damage": 105,
//         "dps": 65,
//         "type": "Sniper",
//         "remarks": "The modern one."
//     },
//     {
//         "name": "Kar98",
//         "damage": 75,
//         "dps": 39,
//         "type": "Sniper",
//         "remarks": "The good old one from WWII."
// }])


// use CRUD
// db.createUser(
//   {
//     user: "pe8zfb",
//     pwd: "matrix",
//     roles: 
//        [{ role: "readWrite", db: "admin" }]
//   }
//  )


//mongod --config E:\DevSpace\NodeMongoTypescript\mongo.conf