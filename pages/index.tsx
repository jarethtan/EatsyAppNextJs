import Head from "next/head";
import CategoryList from "../components/Catagory/CategoryList";
import ProductModel from "../models/productModelClass";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import getSelectedCarousel from "../lib/helpers/carouselHelpers/getSelectedCarousel";
import getAllProduct from "../lib/helpers/productHelpers/getAllProduct";
import getAllUsers from "../lib/helpers/userHelpers/getAllUsers";
import FreqOrderedList from "../components/Products/FreqOrderedList";

const Home: React.FC<{ allProducts: ProductModel[]; selectedCarousels: ProductModel[]; allUsers: object[] }> = (props) => {
  const categories = props.allProducts.map((product) => product.productCategory); // extract all categories from all the products

  const cat = categories.filter((category, pos) => {
    // create a new array with unique catagories from the products.
    return categories.indexOf(category) == pos;
  });
  const uniqueCat = cat.sort();

  return (
    <div>
      <Head>
        <title>Eatsy Food App</title>
        <meta name="description" content="Eatsy Food App created by React/Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeCarousel selectedCarousel={props.selectedCarousels} />
      <CategoryList catList={uniqueCat} />
      <FreqOrderedList allUsers={props.allUsers} />
    </div>
  );
};

export async function getStaticProps(context: any) {
  const { body: allProducts } = await getAllProduct();
  const selectedCarousels = await getSelectedCarousel();
  const { body: allUsers } = await getAllUsers();

  return {
    props: { allProducts, selectedCarousels, allUsers },
  };
}

export default Home;
