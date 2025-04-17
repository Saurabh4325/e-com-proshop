import "../css/productScreen.css";
import { Link, useParams } from "react-router-dom";
import { BiCartAlt, BiSolidCreditCardFront } from "react-icons/bi";
import {
  useCreateReviewMutation,
  useGetProductsDetailsQuery,
} from "../slices/productsApiSlice";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addItem } from "../slices/cartSlice";
import { toast } from "react-toastify";
import IconButton from "../components/IconButton";
import Rating from "../components/Rating";
import RoundButton from "../components/RoundButton";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { ColorRing } from "react-loader-spinner";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [qty, setQty] = useState(1);

  const {
    data: currentProduct,
    isLoading,
    error,
    refetch,
  } = useGetProductsDetailsQuery(productId);

  const [createReview, { isLoading: isReviewLoading, error: reviewError }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // console.log("current product: ", currentProduct);

  const handleCounter = (action) => {
    switch (action) {
      case "DECREASE":
        if (qty > 0) setQty(qty - 1);
        break;
      case "INCREASE":
        if (qty < currentProduct.countInStock) setQty(qty + 1);
        break;
      default:
        return;
    }
  };

  const handleAddToCart = () => {
    console.log("qty : ", qty);
    dispatch(addItem({ ...currentProduct, qty }));
    navigate("/cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("rating:", rating);
    // console.log("comment:", comment);
    try {
      await createReview({ _id: productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review added");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("You have already reviewed");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error?.data.message}</ErrorMessage>
      ) : (
        <div className="main--container">
          <Meta
            title={currentProduct.name}
            description={currentProduct.description}
          />
          <div className="product__detail">
            <div className="product__back">
              <Link to={`/`}>
                <IconButton />
              </Link>
            </div>

            {/* product details  */}
            <div className="pd_container">
              <div className="pd_imageContainer">
                <div className="pd__primaryImageContainer">
                  <img
                    src={currentProduct.image}
                    alt="product image"
                    className="pd__primaryImageContainer-img"
                  />
                </div>
                <div className="pd__galleryImageContainer">
                  <div className="pd_galleryImageWrapper">
                    <img
                      src={currentProduct.image}
                      alt=""
                      className="pd__gallery-items"
                    />
                  </div>
                  <div className="pd_galleryImageWrapper">
                    <img
                      src={currentProduct.image}
                      alt=""
                      className="pd__gallery-items"
                    />
                  </div>
                </div>
              </div>

              <div className="pd_detailContainer">
                <div className="pdd__detailWrapper">
                  <div className="pdd__title">{currentProduct.name}</div>
                  <div className="pdd__brand text--round">
                    {currentProduct.brand}
                  </div>
                  <div className="pdd__rating">
                    <Rating
                      value={currentProduct.rating}
                      text={currentProduct.numReviews}
                    />
                  </div>
                  <div className="pdd__price">${currentProduct.price}</div>

                  {/* Quantity */}
                  {currentProduct.countInStock > 0 ? (
                    <div>
                      <div className="qtyContainer">
                        <div className="qtyContainer__sub">
                          <div className="qtyText">Quantity</div>
                          <div className="qtyCounterContainer">
                            <div className="qtyCounter">
                              <button
                                className="btn btn--icon"
                                onClick={() => handleCounter("DECREASE")}
                              >
                                <BiMinus />
                              </button>
                              <div className="qtyLabel">{qty}</div>
                              <button
                                className="btn btn--icon"
                                onClick={() => handleCounter("INCREASE")}
                              >
                                <BiPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <p className="pdd__description">
                    {currentProduct.description}
                  </p>

                  {currentProduct.countInStock ? (
                    <div className="pdd__btn">
                      <RoundButton
                        text="Add to cart"
                        icon={<BiCartAlt />}
                        theme="dark"
                        classes="btn--mr2"
                        onClick={handleAddToCart}
                      />
                      <RoundButton
                        text="Add Review"
                        icon={<BiSolidCreditCardFront />}
                        theme="dark"
                        classes="bgcolor--orange"
                      />
                    </div>
                  ) : (
                    <h1 className="pd__outOfStock">Out of stock !</h1>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="review_box">
            <div className="login__container">
              <div className="review_title">Reviews</div>

              <div className="reviewContainer">
                {currentProduct.reviews.length === 0 && (
                  <div className="review_title no_reviews">No reviews...</div>
                )}

                {currentProduct.reviews.map((review) => (
                  <div className="showReviews" key={review._id}>
                    <div className="review__heading">
                      <div className="review__name">{review.name}</div>
                      <div className="review__createOn">
                        [{review?.timestamp}]
                      </div>
                    </div>
                    <div className="review__rating">
                      <Rating value={review.rating} text={review.rating} />
                    </div>
                    <div className="review__comment">{review.comment}</div>
                  </div>
                ))}
              </div>

              {userInfo ? (
                <>
                  <div className="review_title write_review">
                    Write a review
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="login__form-group review_form-group">
                      <div className="login__form-group-item">
                        <label
                          htmlFor="rating"
                          className="login__form-group-item-label form-group-item-label"
                        >
                          Rating
                        </label>
                        <select
                          id="rating"
                          onChange={(e) => setRating(e.target.value)}
                          className="login__form-group-item-input form-group-item-input"
                          defaultValue={"DEFAULT"}
                        >
                          <option value="DEFAULT">Select...</option>
                          <option value={1}>1. Poor</option>
                          <option value={2}>2. Fair</option>
                          <option value={3}>3. Good</option>
                          <option value={4}>4. Very Good</option>
                          <option value={5}>5. Excellent</option>
                        </select>
                      </div>

                      <div className="login__form-group-item">
                        <label
                          htmlFor="comment"
                          className="login__form-group-item-label form-group-item-label"
                        >
                          Comment
                        </label>
                        <textarea
                          name="comment"
                          id="comment"
                          cols="30"
                          rows="10"
                          value={comment}
                          className="login__form-group-item-input form-group-item-input"
                          placeholder="Leave your comment"
                          onChange={(e) => setComment(e.target.value)}
                          spellCheck="false"
                        ></textarea>
                      </div>

                      <div className="login__form-group-item">
                        <button
                          type="submit"
                          className="btn btn-formSubmit"
                          disabled={isReviewLoading}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <h3>
                  Please{" "}
                  <Link to={"/login"}>
                    <span
                      style={{ color: "#444", textDecoration: "underline" }}
                    >
                      sign in
                    </span>
                  </Link>{" "}
                  to write a review
                </h3>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
