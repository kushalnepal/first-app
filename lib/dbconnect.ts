
import { MongoClient, Db } from 'mongodb';

const uri = `${process.env.MONGODB_URI}`; 
let client: MongoClient;
let db: Db;
let dbName = process.env.dbName; 

const dbconnect = async () => {
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }
  if (!dbName) {
    throw new Error("dbName environment variable is not defined.");
  }
  try {
    if (!client) {
      client = new MongoClient(uri);
     const connectInstance = await client.connect();
    console.log(`Database connected 'Db Host : ' ${connectInstance}`);
    }
    if (!db) {
      db = client.db(dbName);
    }
    console.log("Database connected successfully");
    return db;
  } catch (error) { 
    console.log("Database connection error");
    console.error(error); }
    process.exit(1);

};


export default  dbconnect ;
