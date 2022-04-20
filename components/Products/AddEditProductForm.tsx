import classes from "./AddEditProductForm.module.css";
import Head from "next/head";
import Link from "next/link";
import ProductModel from "../../models/productModelClass";
import LoadingSpinner from "../../ui/LoadingSpinner";
import AddEditFormInput1 from "./AddEditFormInputs/AddEditFormInput1";
import AddEditFormInput2 from "./AddEditFormInputs/AddEditFormInput2";
import AddEditFormInput3 from "./AddEditFormInputs/AddEditFormInput3";
import ImageInput from "../../ui/ImageInput";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductInputModel } from "../../models/formInputTypes";
import { inputProductSchema } from "../../yupSchema/productForm";
import { fileToDataURL } from "../../lib/middlewares/fileToDataUrl";
import { alertService } from "../../lib/services/alert";
import { baseUrL } from "../../config";

const AddEditProductForm: React.FC<{ foundProductForEdit: ProductModel | null }> = (props) => {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const status = router.asPath;
  const formStatus = status.includes("addProduct");
  const foundProduct = props.foundProductForEdit;

  const method = useForm<ProductInputModel>({
    defaultValues: {
      productName: formStatus ? "" : foundProduct?.productName,
      productDescription: formStatus ? "" : foundProduct?.productDescription,
      productPrice: formStatus ? "" : foundProduct?.productPrice,
      productCategory: formStatus ? "" : foundProduct?.productCategory,
      productImage: formStatus ? [] : null,
      deleteImage: "",
    },
    resolver: yupResolver(inputProductSchema),
  });

  const handlePreviewImage = async (event: any) => {
    alertService.clear();
    if (!formStatus && foundProduct?.productImage.length + event.target.files.length > 3) {
      alertService.warn(
        `Only a max of ${3 - foundProduct!.productImage.length} image(s) is allowed to be uploaded. If continue, form submission will fail validation.`,
        { autoClose: false, keepAfterRouteChange: false }
      );
    }
    let imageUrlArray: string[] = [];
    if (event.target.name === "productImage") {
      for (const file of event.target.files) {
        const oneImageUrl: string = await fileToDataURL(file);
        imageUrlArray.push(oneImageUrl);
      }
      setImageUrl(imageUrlArray);
    }
  };

  const onSubmit = async (data: ProductInputModel) => {
    if (session.data?.role === "admin") {
      data.productImage = imageUrl;
      if (data.deleteImage == false) {
        data.deleteImage = "";
      } // logic is here incase the user checks and unchecks the deleteImage checkbox. by checks and unchecking, it will generate a false value instead of an empty string which will cause an error when passing into the backend. this is to convert it back to an empty string.
      if (formStatus) {
        setIsLoading(true);
        try {
          const addProductToDBResponse = await fetch("/api/products", {
            // send to next api folder under products [id].js file. the api end route of "createProduct" is written here as a dynamic route even though it is not an id number. this is so that we dont have to create another file in the api product route folder and group all route into one file [id].js. if not we will have one file index.ts just for general api route and [id].ts file for specific product id route for edit/delete/show.
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const addProductToDBStatus = await addProductToDBResponse.json();
          if (addProductToDBResponse.status === 201) {
            setImageUrl([]);
            setIsLoading(false);
            await router.push(`/products/${addProductToDBStatus.newProductId}`);
            alertService.success(addProductToDBStatus.message, { keepAfterRouteChange: true });
          } else {
            setIsLoading(false);
            await router.push("/products/addProduct");
            alertService.error(`${addProductToDBStatus.message}: ${addProductToDBStatus.body}`, { autoClose: false, keepAfterRouteChange: false });
          }
        } catch (e: any) {
          console.log(e, e.data, e.message);
        }
      } else {
        setIsLoading(true);
        const editProductInputResponse = await fetch(`/api/products/edit/${foundProduct?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const editProductInputStatus = await editProductInputResponse.json();
        if (editProductInputStatus.message !== "Product updated in Cloudinary and Mongodb Database") {
          setIsLoading(false);
          await router.push(`/products/${foundProduct?._id}`);
          alertService.error(`${editProductInputStatus.message}: ${editProductInputStatus.body}`, { autoClose: false, keepAfterRouteChange: false });
        } else {
          setIsLoading(false);
          setImageUrl([]);
          await router.push(`/products/${foundProduct?._id}`);
          alertService.success(editProductInputStatus.message, { keepAfterRouteChange: true });
        }
      }
    } else {
      await router.push(`/`);
      alertService.error("As a user, you are not allowed to create/edit a product. These rights are only reserved for the adminstrator", {
        autoClose: false,
        keepAfterRouteChange: true,
      });
    }
  };
  return (
    <Fragment>
      <Head>
        <title>{formStatus ? "Add" : "Edit"} Product Page</title>
        <meta name="description" content="Add/Edit Product Page for Eatsy Food App" />
      </Head>
      {isLoading ? (
        <div className={classes.container}>
          {formStatus ? <h3>Please wait. Adding Product into Database...</h3> : <h3>Please wait. Editing Product in Database...</h3>}
          <LoadingSpinner />
        </div>
      ) : (
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(onSubmit)} noValidate className={classes.container}>
            <h1 className="pageHeader">{formStatus ? "Add" : "Edit"} Product Form</h1>
            <AddEditFormInput1 />
            {imageUrl
              ? imageUrl.map((imageUrl) => (
                  <Fragment key={imageUrl}>
                    <img src={imageUrl} width={150} height={120} alt="" className={classes.previewImage} />
                    <br />
                  </Fragment>
                )) // Preview uploaded images.
              : ""}
            {formStatus ? (
              <Fragment>
                <label htmlFor="productImage">Max of 3 images.</label>
                <ImageInput handlePreviewImage={handlePreviewImage} disable={false} name="productImage" />
              </Fragment>
            ) : (
              <AddEditFormInput3 handlePreviewImage={handlePreviewImage} imgLen={foundProduct!.productImage.length} />
            )}
            {
              formStatus ? "" : <AddEditFormInput2 foundProduct={foundProduct!} imgLen={foundProduct!.productImage.length} /> // display delete images array
            }
            <br />
            <button type="submit" className={classes.submitButton}>
              {formStatus ? "Add Product" : "Update Product"}
            </button>
            {formStatus ? (
              ""
            ) : (
              <Fragment>
                <br /> <Link href={"/products/" + foundProduct?._id}>Cancel</Link>
              </Fragment>
            )}
          </form>
        </FormProvider>
      )}
    </Fragment>
  );
};

export default AddEditProductForm;
