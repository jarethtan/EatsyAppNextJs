import cloudinary from ".";
import { extractPublicId } from "cloudinary-build-url";

export const uploadImages = async (imageArr: string[], productName: string, productCategory: string) => {
  try {
    const imageCloudinaryData: string[] = [];
    for (const imageUrl of imageArr) {
      const imageUploadResponse = await cloudinary.v2.uploader.upload(imageUrl, {
        folder: `EatsyFoodApp/Products/${productCategory.replace(/ /g, "-")}/${productName.replace(/ /g, "-")}`,
      }); // to replace white space in the string with - when storing in the cloudinary as a folder name.
      imageCloudinaryData.push(imageUploadResponse.secure_url);
    }
    console.log(`${imageCloudinaryData.length} image(s) uploaded to '${productName}' product Cloudinary DB`);
    return imageCloudinaryData;
  } catch (e: any) {
    let err: any = new Error(`Error occured while uploading image to cloudinary. ${e.message}`);
    err.status = e.http_code;
    throw err;
  }
};

export const deleteImages = async (deletedImageArray: string[]) => {
  try {
    for (let i = 0; i < deletedImageArray.length; i++) {
      const response = await cloudinary.v2.uploader.destroy(extractPublicId(deletedImageArray[i] as string)); // delete selected image from edit form from cloudinary database.
      if (response.result === "ok") console.log(`Image deleted from cloudinary database`);
      else console.log(`Image NOT deleted from cloudinary database`, response.error.message);
    }
  } catch (e: any) {
    let err: any = new Error(`Error occured while deleting images from cloudinary. ${e.message}`);
    err.status = e.http_code;
    throw err;
  }
};

export const deleteImageFolder = async (folderName: string, catFolderName: string, productFolderName: string) => {
  try {
    await cloudinary.v2.api.delete_folder(`EatsyFoodApp/${folderName}/${catFolderName.replace(/ /g, "-")}/${productFolderName.replace(/ /g, "-")}`);
    return console.log("Image folder have been deleted from cloudinary database");
  } catch (e: any) {
    let err: any = new Error(`Error occured while deleting image folder from cloudinary. ${e.error.message}`);
    err.status = e.error.http_code;
    throw err;
  }
};
