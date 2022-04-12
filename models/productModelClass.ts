interface ProductModel {
  _id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productCategory: string;
  productImage: string[];
  productNote: string;
  quantity: number;
}

export default ProductModel;
