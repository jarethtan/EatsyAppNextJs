import { connectToDatabase } from "../../middlewares/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id: any = req.query.id;
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) }); // in client side, we have to use absolute URL for the fetch request. when we do this, we are unable to get the session data in the backend. So in this case, req.query.id was used. the user id is attached in the fetch request URL and extracted to be used here.
    return res.status(201).json({ message: "Cart info retrieve from user's MongoDB Database", body: user });
  } catch (e: any) {
    return res.status(400).json({ message: "Fail to retrieve cart info from user's MongoDB Database", body: e.message });
  }
};

export default getCart;
