import { uploadRegisterSchema } from "../../../yupSchema/userForm";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/middlewares/auth";
import { connectToDatabase } from "../../../lib/middlewares/mongodb";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      req.body = await uploadRegisterSchema.validate(req.body, {
        // backend validation with yup schema.
        stripUnknown: true,
        strict: true,
        abortEarly: false,
      });
    } catch (error) {
      return res.status(400).json({ message: "Backend validation for user registeration failed.", body: error });
    }
    const { firstName, lastName, userName, userImage, email, password, role, deliveryAddress, postalCode, contactNumber } = req.body;
    try {
      const client = await connectToDatabase();
      const db = client.db();
      const checkExistingEmail = await db // check for duplicate email
        .collection("users")
        .findOne({ email: email });
      if (checkExistingEmail) {
        client.close();
        return res.status(422).json({ message: "User registeration failed.", body: "Email Already Exists." });
      }
      const checkExistingUserName = await db // check for duplicate username
        .collection("users")
        .findOne({ userName: userName });
      if (checkExistingUserName) {
        client.close();
        return res.status(422).json({ message: "User registeration failed.", body: "Username Already Exists." });
      }
      await db.collection("users").insertOne({
        firstName,
        lastName,
        userName,
        userImage,
        email,
        password: await hashPassword(password),
        role, // register path is only for user and NOT admin. so role "user" will be inserted in database.
        deliveryAddress,
        postalCode,
        contactNumber,
      });
      client.close();
      return res.status(201).json({ message: "User created.", body: userName });
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong. Fail to register user.", body: error });
    }
  } else {
    res.status(500).json({ message: "Invalid route", body: "Only POST route is accepted" });
  }
};

export default register;
