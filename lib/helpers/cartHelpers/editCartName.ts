import { connectToDatabase } from "../../middlewares/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const editCartName = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: any = req.query.id;
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const foundUser = await db.collection("users").findOne({ _id: new ObjectId(id) });
    const objLength = Object.keys(foundUser as object).length;
    const paidCartNumber = objLength - 11; // number 11 is selected is the number of fields the user have to input when he register. an example, if there are 11 fields for the user to fill up. when he pays, there will be another field which is the 'cart' field. so there are a total of 12 field. 12 - 11 = 1. so when he paids, the cart field will be renamed as paidcart1. if there the user already has a paidcart, when the user pays he will have 13 fields (plus the cart and paidCart1). so it is 13 - 11 = 2 which will give paidcart2. etc.
    const updateUserCartName = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $rename: { cart: `paidCart${paidCartNumber}` } });
    const userIncludePruchaseDate = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { [`paidCart${paidCartNumber}.$[].purchaseDate`]: new Date().toLocaleString().split(",")[0] } }); // this line of code is to include the purchase date of each dish into the paidCart Object.
    const userIncludeTotalCartPrice = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { [`paidCart${paidCartNumber}.$[].cartTotalPrice`]: req.body } }); // this line of code is to include the cart total price the paidCart Object.
    if (updateUserCartName?.modifiedCount === 1 && userIncludePruchaseDate?.modifiedCount === 1 && userIncludeTotalCartPrice?.modifiedCount === 1) {
      client.close();
      return res.status(200).json({ message: `Cart name, cart purchase date and cart total price are successfully updated in MongoDB` });
    } else {
      client.close();
      return res.status(400).json({ message: `Fail to update cart name OR fail to insert purchase date OR fail to insert card total price in MongoDB` });
    }
  } catch (e: any) {
    return res.status(e.status).json({ message: "Error occured while transferring cart info to MongoDB.", body: `Error message: ${e.message}` });
  }
};

export default editCartName;
