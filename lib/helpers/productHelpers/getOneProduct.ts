import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../middlewares/mongodb";
import { ObjectId } from "mongodb";

const getOneProduct = async (id: string) => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    const foundProduct = JSON.parse(JSON.stringify(product));
    if (foundProduct) {
      console.log(`Product '${foundProduct.productName}' located in Mongo database`);
      client.close();
      return { message: `Product '${foundProduct.productName}' located in Mongo database`, body: foundProduct, status: 201 };
    } else {
      client.close();
      return {
        message: "Fail to locate individual product details in MongoDB",
        status: 404,
      };
    }
  } catch (e: any) {
    return {
      message: `Error occurred while retrieving individual product details. Error message: ${e.message}`,
      status: 400,
    };
  }
};

export default getOneProduct;
