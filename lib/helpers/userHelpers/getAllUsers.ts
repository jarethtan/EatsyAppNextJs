import React from "react";
import { connectToDatabase } from "../../middlewares/mongodb";

const getAllUsers = async () => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const users = await db.collection("users").find({}).toArray();
    if (users.length > 0) {
      const allUsers = JSON.parse(JSON.stringify(users));
      console.log("All users found in mongoDB");
      return { body: allUsers, status: 201, message: "All users found in mongoDB" };
    } else {
      console.log("Fail to retrieve users database in mongoDB");
      return { status: 400, message: "Fail to retrieve users database in mongoDB" };
    }
  } catch (e: any) {
    return { status: 400, message: `Fail to retrieve users database in mongoDB, Error Message: ${e.message}` };
  }
};

export default getAllUsers;
