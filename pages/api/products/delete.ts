import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import deleteProduct from "../../../lib/helpers/productHelpers/deleteProduct";
// NOTE:

const deleteHandlers = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req }); // using session to secure api routes.
  try {
    if (req.method === "DELETE") {
      if (session?.role === "admin") {
        return deleteProduct(req, res);
      }
    } else return res.status(405).end(`Method ${req.method} Not Allowed`);
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

export default deleteHandlers;
