import * as yup from "yup";

export const searchFormSchema = yup.object().shape({
  fieldSelect: yup.string().required("This field must be filled").max(40),
  fieldParameter: yup.string().required("This field must be filled").max(40),
});
