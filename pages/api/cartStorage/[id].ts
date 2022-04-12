import createCart from "../../../lib/helpers/cartHelpers/createCart";
import getCart from "../../../lib/helpers/cartHelpers/getCart";
import editCartName from "../../../lib/helpers/cartHelpers/editCartName";
import { NextApiRequest, NextApiResponse } from "next";

const cartStorageRoutes = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getCart(req, res);
    case "PATCH": // patch method is used because we are update the user database with a cart field. or if that field already exist, we will be updating the cart field.
      return createCart(req, res);
    case "PUT":
      return editCartName(req, res); // put method to editcartname once the user decide to purchase an item. the field name will be stored as "paidcart" instead of "cart".
    default:
      return res.status(405).json({ message: "Invalid route", body: "Only GET, PATCH and PUT routes are accepted" });
  }
};

export default cartStorageRoutes;
