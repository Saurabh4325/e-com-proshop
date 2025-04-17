import "../css/product.css";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <>
      <div className="card">
        <div className="card__layer1">
          <Link to={`/product/${product._id}`}>
            <div className="card__media">
              <img src={product.image} alt="" className="card__media_img" />
            </div>
          </Link>

          <Link to={`/product/${product._id}`}>
            <div className="product__title">{product.name}</div>
          </Link>

          <div className="product__brand">{product.category}</div>

          <div className="product__rating">
            <Rating value={product.rating} text={product.numReviews} />
          </div>

          <div className="product__footer">
            <div className="product__price">&#36;{product.price}</div>
            <div className="product__addToCart">
              <button className="btn btn--add-to-cart">Add cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
