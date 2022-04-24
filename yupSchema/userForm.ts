import * as yup from "yup";

export const inputRegisterSchema = yup.object().shape({
  firstName: yup.string().required("Please fill up this required field.").min(3),
  lastName: yup.string().required("Please fill up this required field.").min(2),
  userName: yup.string().required("Please fill up this required field.").min(4),
  email: yup.string().email().required("Please fill up this required field."),
  password: yup
    .string()
    .required("Please fill up this required field.")
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, "Password must be minimum eight characters, at least one letter and one number"),
  role: yup
    .string()
    .matches(/(user|admin)/)
    .required("Please fill up this required field."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
  deliveryAddress: yup.string().required("Please fill up this required field.").min(8),
  postalCode: yup.string().required("Please fill up this required field.").min(6),
  contactNumber: yup.number().typeError("Input must be an 8 digit number").required().min(8),
  userImage: yup
    .mixed()
    .nullable()
    .test("required", "Please provide a file", (value) => {
      return value === null || (value && value.length);
    })
    .test("fileLength", "Only upload a max of three images", (value) => {
      return value === null || value.length === 1;
    })
    .test("fileSize", "The file is too large", (value) => {
      return value === null || (value && value[0] && value[0].size <= 1500000); // value && value[0] is require confirm there is a value then go to value.size to look up the size
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
}); // yup schema for input validation. If an additional field input is added, we must change the number to subtract in the editCartName file. This is to ensure the paidCart naming is accurate.

export const uploadRegisterSchema = yup.object().shape({
  firstName: yup.string().required("Please fill up this required field.").min(3),
  lastName: yup.string().required("Please fill up this required field.").min(2),
  userName: yup.string().required("Please fill up this required field.").min(4),
  email: yup.string().email().required("Please fill up this required field."),
  password: yup
    .string()
    .required("Please fill up this required field.")
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, "Password must be minimum eight characters, at least one letter and one number"),
  role: yup
    .string()
    .matches(/(user|admin)/)
    .required("Please fill up this required field."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
  deliveryAddress: yup.string().required("Please fill up this required field.").min(8),
  postalCode: yup.string().required("Please fill up this required field.").min(6),
  contactNumber: yup.number().typeError("Input must be an 8 digit number").required("Please fill up this required field.").min(8),
  userImage: yup.string().required("Please prodvide a user image"),
});

export const deliveryFormSchema = yup.object().shape({
  deliveryAddress: yup.string().required("This field must be filled").min(6),
  postalCode: yup.string().required("This field must be filled").min(6),
  contactNumber: yup.string().typeError("Input must be an 8 digit number").required("This field must be filled").min(8),
  selectDate: yup.string().required("This field must be filled"),
  selectTime: yup.string().required("This field must be filled"),
});

export const pickUpFormSchema = yup.object().shape({
  contactNumPickUp: yup.string().typeError("Input must be an 8 digit number").required("This field must be filled").min(8),
  selectDate: yup.string().required("This field must be filled"),
  selectTime: yup.string().required("This field must be filled"),
});

export const loginSchema = yup.object().shape({
  userName: yup.string().required("Please fill up this required field.").trim().min(4),
  password: yup
    .string()
    .required("Please fill up this required field.")
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, "Password must be minimum eight characters, at least one letter and one number"),
  role: yup
    .string()
    .matches(/(user|admin)/)
    .required("Please fill up this required field."),
}); // yup schema for input validation
