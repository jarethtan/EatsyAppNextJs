import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1dgi2.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    );
    return client;
  } catch (error: any) {
    throw Error(`Fail to connect to MongoDB. Check client connection again`);
  }
};
