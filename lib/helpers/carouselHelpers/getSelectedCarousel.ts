import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../middlewares/mongodb";
import { ObjectId } from "mongodb";

const getSelectedCarousel = async () => {
  const adminId = "61f05a68e26e1cbc5fcbe23a";
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const foundAdminUser = await db.collection("admin").findOne({ _id: new ObjectId(adminId) });
    if (foundAdminUser) {
      client.close();
      console.log("Selected carousels stored in adminstrator's database in MongoDB");
      return foundAdminUser?.selectedCarousel;
    } else {
      client.close();
      console.log("Fail to find adminstrator database in MongoDB");
      return;
    }
  } catch (e: any) {
    console.log("Something went wrong. Fail to find adminstrator database in MongoDB.", e.message);
    return;
  }
};

export default getSelectedCarousel;
