import mongoose from "mongoose";

import { config } from '../constants/interfaces';


async function mongo_connect() {
  mongoose.connect(config.server.mongoUrl);

  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    console.log(`Connected to MongoDB with connection string: ${config.server.mongoUrl}`)
  })

  dbConnection.on('error', (error) => {
    console.log(`Error connecting to MongoDB: ${error}`)
  })
  return
}
export default mongo_connect;