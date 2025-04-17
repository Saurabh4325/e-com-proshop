import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "../css/pagination.css";
import { Link } from "react-router-dom";
const Paginate = ({
  pages,
  page,
  isAdmin = false,
  oneTimePages = 1,
  path = "",
  adminPath = "",
  keyword = "",
}) => {
  console.log("isAdmin: ", isAdmin);
  return (
    pages > 1 && (
      <div className="paginationContainer">
        <div className="paginationBox paginationFlex">
          {/* <div className="pagination">
            <BiChevronLeft />
          </div> */}
          <div className="paginationFlex">
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                to={
                  !isAdmin
                    ? keyword.length > 0
                      ? `/search/${keyword}/page/${x + 1}`
                      : `${path}/${x + 1}`
                    : `${
                        adminPath.length != 0
                          ? `${adminPath}/${x + 1}`
                          : `${x + 1}`
                      }`
                }
              >
                <div
                  className={`pagination ${x + 1 == page ? "pageActive" : ""} `}
                >
                  {x + 1}
                </div>
              </Link>
            ))}
          </div>
          {/* <div className="pagination">
            <BiChevronRight />
          </div> */}
        </div>
      </div>
    )
  );
};

export default Paginate;
