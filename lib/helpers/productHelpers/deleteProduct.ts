import { connectToDatabase } from "../../middlewares/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { deleteImageFolder, deleteImages } from "../../../cloudinary/imageSupport";

const deleteProduct = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    console.log("FOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", request.body.productImage);
    await deleteImages(request.body.productImage);
    await deleteImageFolder("Products", request.body.productCategory, request.body.productName);
    const client = await connectToDatabase();
    const db = client.db();
    const deleteProductResponse = await db.collection("products").findOneAndDelete({ _id: new ObjectId(request.body._id) });
    if (deleteProductResponse.lastErrorObject?.n > 0) {
      console.log("Product has been deleted from mongodb database");
      client.close();
      return response.status(201).json({ message: "Product deleted in Mongo and Cloudinary DB" });
    } else {
      client.close();
      return response.status(400).json({
        message: "Fail to find product and delete in MongoDB",
        body: "Product was NOT deleted from Mongo DB database.",
      });
    }
  } catch (e: any) {
    return response.status(e.status).json({ message: "Error occured while deleting product.", body: `Error message: ${e.message}` });
  }
};

export default deleteProduct;
