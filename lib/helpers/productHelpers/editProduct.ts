import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../middlewares/mongodb";
import { ObjectId } from "mongodb";
import { uploadProductSchema } from "../../../yupSchema/productForm";
import { uploadImages, deleteImages, deleteImageFolder } from "../../../cloudinary/imageSupport";

const editProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: any = req.query.id;
  try {
    req.body = await uploadProductSchema.validate(req.body, {
      stripUnknown: true,
      strict: true,
      abortEarly: false,
    });
  } catch (error: any) {
    return res.status(400).json({ message: `Backend ${error.name} when updating product`, body: error.message, status: 400 });
  }
  let { productName, productCategory, productDescription, productImage, productPrice, deleteImage } = req.body;
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const foundProduct = await db.collection("products").findOne({ _id: new ObjectId(id) });
    const deletedImage: string[] = Array.from(new Set(deleteImage)); // transform deleteImage into an array from a string
    if (
      (deletedImage.length > 0 && foundProduct?.productImage.length - deletedImage.length === 1) ||
      (deletedImage.length > 0 && foundProduct?.productImage.length - deletedImage.length === 2)
    ) {
      const editImageArrayMongoResponse: any = await db
        .collection("products") // @ts-ignore
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $pull: { productImage: { $in: deletedImage } } }); // update productImage array URL in mongodb database by the selected image deleted in edit form.
      if (editImageArrayMongoResponse.lastErrorObject.n > 0) {
        console.log(`Image(s) URL deleted from ${foundProduct?.productName}'s product image array in MongoDB database.`);
      } else {
        return res.status(400).json({
          message: "Update product error.",
          body: `Failed to update image array of ${foundProduct?.productName}'s product in MongoDB database.`,
        });
      }
      await deleteImages(deletedImage); //delete image from cloudinary database.
      const foundProductUpdatedImage = await db.collection("products").findOne({ _id: new ObjectId(id) }); // check this logic.
      const newImgArrForNewCatOrName = [];
      if (foundProductUpdatedImage?.productImage.length + productImage.length <= 3) {
        if (productImage.length > 0) {
          const imageCloudinaryArray = await uploadImages(productImage, foundProductUpdatedImage?.productName, foundProductUpdatedImage?.productCategory); // for the productName and the productCategory, we must use the value from the found product int he data base instead of the one pass from the user from the edit. This is because the user could change the category or product name in the edit form. if we pass that value in the upload image function, cloudinary will unintentionally create a new folder with a different path. We want the images uploaded by the user from the edit form to GO to the previously created cloudinary folder. then after that we will recreate a new folder and delete the old folder IF there is a change in category or product name further down the code.
          await foundProductUpdatedImage?.productImage.push(...imageCloudinaryArray);
        }
        if (productCategory !== foundProduct?.productCategory || productName !== foundProduct?.productName) {
          const newImgArrWithCloudinaryFolder = await uploadImages(foundProductUpdatedImage?.productImage, productName, productCategory); // create new cloudinary folder path with updated productName or productCategory OR both.
          newImgArrForNewCatOrName.push(...newImgArrWithCloudinaryFolder);
          await deleteImages(foundProductUpdatedImage?.productImage);
          await deleteImageFolder("Products", foundProduct?.productCategory, foundProduct?.productName); // delete folder and folder oath of outdated category or product name
        }
        const updateExistingProductResponse = await db.collection("products").findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              productName: productName,
              productCategory: productCategory,
              productDescription: productDescription,
              productPrice: productPrice,
              productImage:
                productCategory !== foundProduct?.productCategory || productName !== foundProduct?.productName // true false operator. if there is a change in category or name, we will use "newImgArrForNewCatOrName" else we will use "foundProductUpdatedImage?.productImage"
                  ? newImgArrForNewCatOrName
                  : foundProductUpdatedImage?.productImage,
            },
          }
        );
        if (updateExistingProductResponse.lastErrorObject?.n > 0) {
          console.log(`Product details of ${foundProduct?.productName}'s product is updated in MongoDB database.`);
          client.close();
          return res.status(201).json({ message: "Product updated in Cloudinary and Mongodb Database" });
        } else {
          client.close();
          return res.status(400).json({
            message: "Update product error.",
            body: `Fail to update product details of ${foundProduct?.productName}'s product.`,
          });
        }
      } else {
        client.close();
        return res.status(400).json({
          message: "Update product error.",
          body: `${foundProduct?.productName}'s product allowed to have a max of three images. The number of existing and newly uploaded image exceeds three images.`,
        });
      }
    } else if (deleteImage.length === 0 && productImage.length <= 3) {
      const foundProductUpdatedImage = await db.collection("products").findOne({ _id: new ObjectId(id) });
      const newImgArrForNewCatOrName = [];
      if (foundProductUpdatedImage?.productImage.length + productImage.length <= 3) {
        if (productImage.length > 0) {
          const imageCloudinaryArray = await uploadImages(productImage, foundProductUpdatedImage?.productName, foundProductUpdatedImage?.productCategory); // for the productName and the productCategory, we must use the value from the found product int he data base instead of the one pass from the user from the edit. This is because the user could change the category or product name in the edit form. if we pass that value in the upload image function, cloudinary will unintentionally create a new folder with a different path. We want the images uploaded by the user from the edit form to GO to the previously created cloudinary folder. then after that we will recreate a new folder and delete the old folder IF there is a change in category or product name further down the code.
          foundProductUpdatedImage?.productImage.push(...imageCloudinaryArray);
        }
        if (productCategory !== foundProduct?.productCategory || productName !== foundProduct?.productName) {
          const newImgArrWithCloudinaryFolder = await uploadImages(foundProductUpdatedImage?.productImage, productName, productCategory); // create new cloudinary folder path with updated productName or productCategory OR both.
          newImgArrForNewCatOrName.push(...newImgArrWithCloudinaryFolder);
          await deleteImages(foundProductUpdatedImage?.productImage);
          await deleteImageFolder("Products", foundProduct?.productCategory, foundProduct?.productName); // delete folder and folder oath of outdated category or product name
        }
        const updateExistingProductResponse = await db.collection("products").findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              productName: productName,
              productCategory: productCategory,
              productDescription: productDescription,
              productPrice: productPrice,
              productImage:
                productCategory !== foundProduct?.productCategory || productName !== foundProduct?.productName // true false operator. if there is a change in category or name, we will use "newImgArrForNewCatOrName" else we will use "foundProductUpdatedImage?.productImage"
                  ? newImgArrForNewCatOrName
                  : foundProductUpdatedImage?.productImage,
            },
          }
        );
        if (updateExistingProductResponse.lastErrorObject?.n > 0) {
          console.log(`Product details of ${foundProduct?.productName}'s product is updated in MongoDB database.`);
          client.close();
          return res.status(201).json({ message: "Product updated in Cloudinary and Mongodb Database" });
        } else {
          client.close();
          return res.status(400).json({
            message: "Update product error.",
            body: `Fail to update product details (excluding image field) of ${foundProduct?.productName}'s product.`,
          });
        }
      } else {
        client.close();
        return res.status(400).json({
          message: "Update product error.",
          body: `${foundProduct?.productName} product allowed to have a max of three images. existing number + number of newly uploaded image exceeds three images.`,
        });
      }
    } else {
      client.close();
      return res.status(400).json({
        message: "Update product error.",
        body: `${foundProduct?.productName} product must have at least one image. Unable to delete image until additional image(s) is/are added.`,
      });
    }
  } catch (e: any) {
    return res.status(e.status).json({ message: "Error occured while updating product.", body: `Error message: ${e.message}` });
  }
};

export default editProduct;
