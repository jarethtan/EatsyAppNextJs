import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import editProduct from "../../../../lib/helpers/productHelpers/editProduct";

const handlers = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req }); // using session to secure api routes.
  try {
    if (req.method === "PUT") {
      if (session?.role === "admin") return editProduct(req, res);
      else return res.status(405).end(`Method ${req.method} Not Allowed`);
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
