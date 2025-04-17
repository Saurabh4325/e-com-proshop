import logo from "../assets/light-logo.png";
import { useEffect, useRef, useState } from "react";
import "../css/header.css";
import { BiMenu, BiUserCircle, BiCart, BiChevronDown } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import Sidebar from "./admin_component/sidebar";
import Searchbox from "./Searchbox";

const Header = () => {
  const navListRef = useRef();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false);

  const [logoutApiCall] = useLogoutMutation();

  const handleHumbarger = () => {
    navListRef.current.classList.toggle("active");
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <nav className="navbar">
        <Link to={`/`}>
          <div className="navbar__brand-title">
            <img src={logo} alt={"logo"} className="logo" />
            <h2 className="header__title">Proshop</h2>
          </div>
        </Link>

        <Searchbox />

        <div
          className="navbar__toggle icon--reactangle"
          onClick={handleHumbarger}
        >
          <BiMenu className="icon icon--sm toggle__bar" />
        </div>

        <div className="navbar__navbar-links" ref={navListRef}>
          <ul className="navbar__list list">
            <li className="navbar__list-item">
              <NavLink to={`/cart`}>
                <div className="navbar__item navbar__cart ">
                  <BiCart className="icon icon--sm" />
                  <div>Cart</div>
                  {cartItems.length > 0 && (
                    <div className="headerCart">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </div>
                  )}
                </div>
              </NavLink>
            </li>
            <li className="navbar__list-item">
              <div className="navbar__item navbar__signin">
                {userInfo ? (
                  <div className="navbar__dropdown">
                    <div
                      className="navbar__dropdown-name"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      {userInfo.name}
                      <BiChevronDown />
                    </div>

                    <div
                      className="dropdown_box"
                      style={{ display: dropdown ? "block" : "none" }}
                    >
                      <NavLink to={"/profile"}>
                        <div className="dropdown-item dropdown-item-1">
                          Profile
                        </div>
                      </NavLink>
                      <NavLink to="">
                        <div
                          className="dropdown-item dropdown-item-2"
                          onClick={handleLogout}
                        >
                          Logout
                        </div>
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <NavLink to={`/login`}>
                    <div className="header__signin_a">
                      <BiUserCircle className="icon icon--sm" />
                      <div>Sign In</div>
                    </div>
                  </NavLink>
                )}
              </div>
            </li>
            <li className="navbar__list-item">
              {userInfo?.isAdmin && (
                <div
                  className="navbar__dropdown-name"
                  onClick={() => handleDashboard()}
                >
                  Dashboard
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
