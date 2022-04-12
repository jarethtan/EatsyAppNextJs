export type RegisterInputModel = {
  // IMPORTANT: If an additional field input is added, we must change the number to subtract in the editCartName file. This is to ensure the paidCart naming is accurate.
  firstName: string;
  lastName: string;
  email: string;
  userImage: string | null;
  userName: string;
  password: string;
  role: string;
  confirmPassword: string;
  deliveryAddress: string;
  postalCode: string;
  contactNumber: number | string;
  cart: object[];
};

export type CheckoutInputModel = {
  deliveryAddress: string;
  postalCode: string;
  contactNumber: number | string;
  contactNumPickUp: "";
  selectDate: number;
  selectTime: "";
};

export type LoginInputModel = {
  userName: string;
  password: string;
  role: string;
};

export type ProductInputModel = {
  productName: string;
  productDescription: string;
  productPrice: number | string;
  productCategory: string;
  productImage: string[] | null;
  deleteImage: "" | false;
};
