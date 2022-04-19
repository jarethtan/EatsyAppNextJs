import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../middlewares/mongodb";
import { ObjectId } from "mongodb";

const storeSelectedCarousel = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id: any = req.query.id;
    const client = await connectToDatabase();
    const db = client.db();
    const updateAdminWithCarousel = await db.collection("admin").findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { selectedCarousel: req.body } });
    if (updateAdminWithCarousel.lastErrorObject?.n > 0) {
      console.log(`Selected carousels stored in adminstrator's database in MongoDB`);
      client.close();
      return res.status(201).json({ message: "Selected carousels stored in adminstrator's database in MongoDB" });
    } else {
      client.close();
      return res.status(400).json({ message: "Fail to store carousels in adminstrator's database in MongoDB" });
    }
  } catch (e: any) {
    return res.status(e.status).json({ message: "Error occured while storing carousel.", body: `Error message: ${e.message}` });
  }
};

export default storeSelectedCarousel;
