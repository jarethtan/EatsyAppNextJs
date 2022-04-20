import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import createProduct from "../../../lib/helpers/productHelpers/createProduct";

const handlers = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req }); // using session to secure api routes.
  const id = req.query.id;
  try {
    switch (req.method) {
      case "POST":
        if (session?.role === "admin") {
          return createProduct(req, res);
        }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.log(e);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Size of request being able to send over.
    },
  },
};

export default handlers;
