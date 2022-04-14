import { connectToDatabase } from "../../middlewares/mongodb";
import { ObjectId } from "mongodb";

const getOneCart = async (id: any) => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) }); // in client side, we have to use absolute URL for the fetch request. when we do this, we are unable to get the session data in the backend. So in this case, req.query.id was used. the user id is attached in the fetch request URL and extracted to be used here.
    if (!user) {
      client.close();
      return {
        message: "Fail to retrieve cart info from user's MongoDB Database",
        status: 404,
      };
    } else {
      console.log("Cart info retrieve from user's MongoDB Database");
      client.close();
      return { message: "Cart info retrieve from user's MongoDB Database", body: user, status: 201 };
    }
  } catch (e: any) {
    return { message: `Fail to retrieve cart info from user's MongoDB Database. Error message ${e.message}`, status: 400 };
  }
};

export default getOneCart;
