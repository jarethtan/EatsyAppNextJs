import { NextApiRequest, NextApiResponse } from "next";
import getSelectedCarousel from "../../../lib/helpers/carouselHelpers/getSelectedCarousel";
import storeSelectedCarousel from "../../../lib/helpers/carouselHelpers/storeSelectedCarousel";
import { getSession } from "next-auth/react";

const carouselStorageRoutes = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  switch (req.method) {
    case "GET":
      return getSelectedCarousel();
    case "POST":
      if (session?.role === "admin") {
        return storeSelectedCarousel(req, res);
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed. Either you are not an adminstrator or API route besides GET or POST is requested.`);
  }
};

export default carouselStorageRoutes;
