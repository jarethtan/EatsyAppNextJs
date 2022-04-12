import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../middlewares/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const createCart = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const userCart = await db.collection("users").findOne({ _id: new ObjectId(session.id) });
    if (!userCart?.cart) {
      // if there is no cart field in the user's data in mongodb, create a new "cart" field to store cart information.
      const cartToUserDBResponse = await db.collection("users").findOneAndUpdate({ _id: new ObjectId(session.id) }, { $push: { cart: req.body } });
      const user = await db.collection("users").findOne({ _id: new ObjectId(session.id) });
      const transformCart = user?.cart.flat(); // req.body inserted into the cart field is a double array [[req.body]]. we need to flatten the array and pass it back to userCart.
      const cartTransformDBResponse = await db.collection("users").findOneAndUpdate({ _id: new ObjectId(session.id) }, { $set: { cart: transformCart } });
      if (cartToUserDBResponse.ok && cartTransformDBResponse.ok) {
        client.close();
        return res.status(201).json({ message: "Cart created in user's MongoDB Database" });
      } else {
        client.close();
        return res.status(400).json({
          message: "Create Cart Error.",
          body: `Fail to create cart for username: ${session.user.name} in MongoDB.`,
        });
      }
    } else if (req.body === []) {
      // If cart is empty, remove all information in the user's MongoDB cart field. Leaving an empty cart field.
      const cartToUserDBResponse = await db.collection("users").findOneAndUpdate({ _id: new ObjectId(session.id) }, { $unset: { cart: 1 } });
      if (cartToUserDBResponse.ok) {
        client.close();
        return res.status(201).json({ message: "Cart removed from user's MongoDB Database" });
      } else {
        client.close();
        return res.status(400).json({
          message: "Remove Cart Error.",
          body: `Fail to remove cart for username: ${session.user.name} in MongoDB.`,
        });
      }
    } else {
      // If cart is not empty and cart field is already created in user's MongoDB data, we will update the cart when the username includes new items into the cart.
      const cartToUserDBResponse = await db.collection("users").findOneAndUpdate({ _id: new ObjectId(session.id) }, { $set: { cart: req.body } });
      if (cartToUserDBResponse.ok) {
        client.close();
        return res.status(201).json({ message: "Cart updated in user's MongoDB Database" });
      } else {
        client.close();
        return res.status(400).json({
          message: "Update Cart Error.",
          body: `Fail to update cart for username: ${session.user.name} in MongoDB.`,
        });
      }
    }
  } catch (e: any) {
    return res.status(e.status).json({ message: "Error occured while transferring cart info to MongoDB.", body: `Error message: ${e.message}` });
  }
};

export default createCart;
