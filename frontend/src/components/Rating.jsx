import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

const Rating = ({ value, text = "" }) => {
  return (
    <>
      <div className="rating">
        <span>
          {value >= 1 ? (
            <BiSolidStar className="rating__star" />
          ) : value >= 0.5 ? (
            <BiSolidStarHalf className="rating__star" />
          ) : (
            <BiStar className="rating__star" />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <BiSolidStar className="rating__star" />
          ) : value >= 1.5 ? (
            <BiSolidStarHalf className="rating__star" />
          ) : (
            <BiStar />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <BiSolidStar className="rating__star" />
          ) : value >= 2.5 ? (
            <BiSolidStarHalf className="rating__star" />
          ) : (
            <BiStar />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <BiSolidStar className="rating__star" />
          ) : value >= 3.5 ? (
            <BiSolidStarHalf className="rating__star" />
          ) : (
            <BiStar className="rating__star" />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <BiSolidStar className="rating__star" />
          ) : value >= 4.5 ? (
            <BiSolidStarHalf className="rating__star" />
          ) : (
            <BiStar className="rating__star" />
          )}
        </span>

        <span className="rating__text">{text} reviews</span>
      </div>
    </>
  );
};

export default Rating;
