import * as yup from "yup";

export const inputProductSchema = yup.object().shape({
  productName: yup
    .string()
    .required("Please include a product name.")
    .min(3)
    .max(30)
    .matches(/^[a-zA-Z ]*$/, "Name must only consist of alphabets."),
  productDescription: yup.string().required("Please include a product description.").min(5).max(400),
  productPrice: yup.number().positive().min(1).max(99999).required("Please includea price of the product."),
  productCategory: yup
    .string()
    .oneOf([
      "South East Asian",
      "Chinese",
      "Japanese",
      "Korean",
      "Indian",
      "Middle Eastern",
      "North American",
      "South American",
      "European",
      "African",
      "Scandinavian",
      "British",
    ])
    .required("Please select a category for product"),
  productNote: yup.string().nullable(),
  productImage: yup
    .mixed()
    .nullable()
    .test("required", "Please provide a file", (value) => {
      return value === null || (value && value.length);
    })
    .test("fileLength", "Only upload a max of three images", (value) => {
      return value === null || value.length <= 3;
    })
    .test("fileSize", "The file is too large", (value) => {
      return value === null || (value && value[0] && value[0].size <= 3000000); // value && value[0] is require confirm there is a value then go to value.size to look up the size
    })
    .test("filetype", "Only support jpeg, png and svg formats", (value) => {
      return (
        value === null ||
        (value && value[0] && value[0].type === "image/jpeg") ||
        (value && value[0] && value[0].type === "image/jpg") ||
        (value && value[0] && value[0].type === "image/svg") ||
        (value && value[0] && value[0].type === "image/png") //value && value[0] is require confirm there is a value then go to value.size to look up the type
      );
    }),
}); // yup schema for product input validation

export const uploadProductSchema = yup.object().shape({
  productName: yup
    .string()
    .required("Please include a product name.")
    .min(3)
    .max(30)
    .matches(/^[a-zA-Z ]*$/, "Name must only consist of alphabets."),
  productDescription: yup.string().required("Please include a product description.").min(5).max(400),
  productPrice: yup.number().positive().min(1).max(99999).required("Please includea price of the product."),
  productCategory: yup
    .string()
    .oneOf([
      "South East Asian",
      "Chinese",
      "Japanese",
      "Korean",
      "Indian",
      "Middle Eastern",
      "North American",
      "South American",
      "European",
      "African",
      "Scandinavian",
      "British",
    ])
    .required("Please select a category for product"),
  productImage: yup.array().max(3, "only a max of three images allowed").required("Image URL not present."),
}); // yup schema for product input validation
