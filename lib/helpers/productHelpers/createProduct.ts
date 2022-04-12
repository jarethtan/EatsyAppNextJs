import { uploadProductSchema } from "../../../yupSchema/productForm";
import { connectToDatabase } from "../../middlewares/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadImages } from "../../../cloudinary/imageSupport";

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    req.body = await uploadProductSchema.validate(req.body, {
      // backend validation with yup schema.
      stripUnknown: true,
      strict: true,
      abortEarly: false,
    });
  } catch (error: any) {
    return res.status(400).json({ message: `Backend ${error.name} when creating product`, body: error.message });
  }
  let { productName, productCategory, productDescription, productImage, productPrice } = req.body;
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const checkExistingProduct = await db.collection("products").findOne({ productName: productName });
    if (checkExistingProduct) {
      client.close();
      return res.status(422).json({ message: "Create product error", body: "Product Already Exists in MongoDB." });
    }
    const imageCloudinaryArray = await uploadImages(productImage, productName, productCategory);
    productImage = imageCloudinaryArray;
    const addProductResponse = await db.collection("products").insertOne({
      productName,
      productCategory,
      productDescription,
      productPrice,
      productImage,
      productNote: "",
    });
    if (addProductResponse.acknowledged === true) {
      client.close();
      return res.status(201).json({ message: "Product created in Cloudinary and Mongodb Database", newProductId: addProductResponse.insertedId.toString() });
    } else {
      client.close();
      return res.status(400).json({ message: "Create product error", body: "Fail to insert product fields into MongoDB" });
    }
  } catch (e: any) {
    return res.status(e.status).json({ message: "Error occured while creating product.", body: `Error message: ${e.message}` });
  }
};

export default createProduct;
