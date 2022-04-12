import { connectToDatabase } from "../../middlewares/mongodb";
import { ObjectId } from "mongodb";

const getOneUser = async (id: string) => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const users = await db
      .collection("users")
      .find({ _id: new ObjectId(id) })
      .toArray();
    if (users.length > 0) {
      const foundUser = JSON.parse(JSON.stringify(users));
      console.log(`User '${foundUser.userName}' found in mongoDB`);
      return { body: foundUser, status: 201, message: `User '${foundUser.userName}' found in mongoDB` };
    } else {
      console.log("Fail to retrieve user's database in mongoDB");
      return { status: 400, message: "Fail to retrieve user's database in mongoDB" };
    }
  } catch (e: any) {
    return { status: 400, message: `Fail to retrieve user's database in mongoDB, Error Message: ${e.message}` };
  }
};

export default getOneUser;
