import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import createProduct from "../../../lib/helpers/productHelpers/createProduct";
import editProduct from "../../../lib/helpers/productHelpers/editProduct";
import deleteProduct from "../../../lib/helpers/productHelpers/deleteProduct";
import getAllProduct from "../../../lib/helpers/productHelpers/getAllProduct";
import getOneProduct from "../../../lib/helpers/productHelpers/getOneProduct";

const handlers = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req }); // using session to secure api routes.
  const id = req.query.id;
  switch (req.method) {
    case "GET":
      if (id === "getAllProducts") {
        return getAllProduct();
      } else {
        return getOneProduct(id as string);
      }
    case "POST":
      if (session?.role === "admin") {
        return createProduct(req, res);
      }
    case "PUT":
      if (session?.role === "admin") {
        return editProduct(req, res);
      }
    case "DELETE":
      if (session?.role === "admin") {
        return deleteProduct(req, res);
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
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
