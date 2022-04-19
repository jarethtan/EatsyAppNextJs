import { getSession } from "next-auth/react";

export const createProductToDB = async (data: any) => {
  const session = await getSession();
  if (session) {
    try {
      const addProductToDBResponse = await fetch(`/api/products/createProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const addProductToDBStatus = await addProductToDBResponse.json();
      return addProductToDBStatus;
    } catch (e) {
      console.log("Fail to create product to MongoDB", e);
    }
  }
};
