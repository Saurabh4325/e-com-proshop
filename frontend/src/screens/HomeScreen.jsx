import "../css/homescreen.css";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import Product from "../components/Product";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import IconButton from "../components/IconButton";
import Carousal from "../components/Carousal";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <ErrorMessage variant="danger">{error?.data.message}</ErrorMessage>
      ) : (
        <>
          <Meta title="Welcome To Proshop" />
          <div className="main--container">
            {/* Carousal */}
            <Carousal />

            {keyword && (
              <div className="product__back">
                <Link to={`/`}>
                  <IconButton />
                </Link>
              </div>
            )}

            <h1 className="product_title">Latest Products</h1>
            <div className="product__container">
              <div className="product__grid grid--rx4 grid--rx3 grid--rx2 grid--rx1">
                {data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <Paginate
              pages={data.pages}
              page={data.page}
              oneTimePages={2}
              path="/page"
              keyword={keyword}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
