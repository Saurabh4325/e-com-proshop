import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "../css/carousal.css";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { useState } from "react";
import Rating from "./Rating";
import Loader from "./Loader";
const Carousal = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const { data, isLoading, error } = useGetTopProductsQuery();
  //   console.log("images: ", data);

  const handlePrevImage = () => {
    if (imgIndex == 0) setImgIndex(data.length - 1);
    else {
      setImgIndex(imgIndex - 1);
    }
  };
  const handleNextImage = () => {
    if (imgIndex == data.length - 1) setImgIndex(0);
    else {
      setImgIndex(imgIndex + 1);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <h1>Failed to load image</h1>
  ) : (
    <div className="carousal_container">
      {/* carousal left */}
      <div className="carousal carousal-small">
        <img
          src="/images/carousal-1.jpeg"
          alt="sample image - 1"
          className="carousal-item-image"
        />
      </div>

      {/* carousal main */}
      <div className="carousal carousal-large">
        <Link to={`product/${data[imgIndex]._id}`}>
          <div className="carousal-item">
            <div className="carousal-img">
              <img
                src={data[imgIndex].image}
                alt="Sample image"
                className="carousalMainImage"
              />
            </div>
            <div className="carousal-content">
              <h3>{data[imgIndex].name}</h3>
              <h4>{data[imgIndex].brand}</h4>
              <h4>
                <Rating value={data[imgIndex].rating} />
              </h4>
              <h4>${data[imgIndex].price}</h4>
            </div>
          </div>
        </Link>

        <div
          className="carousal-arrow carousal-arrow-left"
          onClick={handlePrevImage}
        >
          <BiChevronLeft className="carousal-arrow-icon" />
        </div>

        <div
          className="carousal-arrow carousal-arrow-right"
          onClick={handleNextImage}
        >
          <BiChevronRight className="carousal-arrow-icon" />
        </div>

        <div className="carousal-image-dots">
          <div className="carousal-dot"></div>
          <div className="carousal-dot"></div>
          <div className="carousal-dot"></div>
        </div>
      </div>

      {/* carousal right */}
      <div className="carousal carousal-small">
        <img
          src="/images/carousal-2.jpeg"
          alt="sample image - 1"
          className="carousal-item-image"
        />
      </div>
    </div>
  );
};

export default Carousal;
