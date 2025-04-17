import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search.trim()}`);
    }
  };

  return (
    <div className="searchbox">
      <form onSubmit={handleSearch}>
        <div className="login__form-group searchbox_group">
          <input
            type="text"
            name="search"
            value={search}
            className="login__form-group-item-input form-group-item-input input-search"
            placeholder="Search"
            spellCheck="false"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn-search"
            //   disabled={isLoading}
          >
            <BiSearchAlt2 />
          </button>
        </div>

        {/* {isLoading && <Loader />} */}
      </form>
    </div>
  );
};

export default Searchbox;
