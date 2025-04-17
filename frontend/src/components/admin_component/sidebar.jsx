import {
  BiCartAlt,
  BiCategory,
  BiGroup,
  BiListOl,
  BiListUl,
  BiMenu,
} from "react-icons/bi";
import "../../css/admin/sidebar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleButtonStyle = {
    show: {
      backgroundColor: "var(--theme-color)",
      color: "#fff",
    },
    hide: {
      backgroundColor: "#fff",
      color: "#000",
    },
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 768) setShowSidebar(false);
    else setShowSidebar(true);
  }, [window.innerWidth]);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="sidebar">
      <div
        className="Sidebar__toggle"
        style={showSidebar ? toggleButtonStyle.show : toggleButtonStyle.hide}
      >
        <BiMenu onClick={handleSidebar} />
      </div>
      <div
        className="sidebar__list_container"
        // style={{ left: `${showSidebar ? "0" : "-20rem"}` }}
        style={{ display: `${showSidebar ? "block" : "none"}` }}
      >
        <ul className="siderbar__list">
          <NavLink to={"productlist"}>
            <li className="sidebar__list__item">
              <BiCategory className="sidebar__list_icon" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to={"orderlist"}>
            <li className="sidebar__list__item">
              <BiCartAlt className="sidebar__list_icon" />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to={"userlist"}>
            <li className="sidebar__list__item">
              <BiGroup className="sidebar__list_icon" />
              <span>Users</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
