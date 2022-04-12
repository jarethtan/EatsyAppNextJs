import { connectToDatabase } from "../../middlewares/mongodb";

const getAllProduct = async () => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const products = await db.collection("products").find({}).toArray();
    if (products.length > 0) {
      const allProducts = JSON.parse(JSON.stringify(products));
      console.log("All products from mongodb database found");
      client.close();
      return { body: allProducts, message: "All products from mongodb database found", status: 201 };
    } else {
      client.close();
      console.log("Fail to get all product details from get request");
      return { message: "Fail to get all product details from get request", status: 400 };
    }
  } catch (e: any) {
    console.log("Error occurred while retrieving all products info.", `Error message: ${e.message}`);
    return { message: `Error occurred while retrieving all products info. Error message: ${e.message}`, status: 400 };
  }
};

export default getAllProduct;
