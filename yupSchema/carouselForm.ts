import * as yup from "yup";

export const carouselUploadSchema = yup.object().shape({
  selectedProducts: yup.array().max(4, "Only allowed to upload a maximum of FOUR dishes into the carousel homepage display."),
});
