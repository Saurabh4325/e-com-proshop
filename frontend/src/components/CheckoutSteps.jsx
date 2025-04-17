import "../css/checkoutSteps.css";
import { BiChevronDown } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const color = {
    bg: { background: "green" },
    textColor: { color: "green" },
  };

  return (
    <div className="steps">
      {step1 ? (
        <NavLink to="/login">
          <div className="steps__step">
            <div className="step-content">
              <div className="step-round" style={color.bg}>
                1
              </div>
              <div className="step--text" style={color.textColor}>
                Sign In
              </div>
            </div>
          </div>
        </NavLink>
      ) : (
        <div className="steps__step">
          <div className="step1 step-bar"></div>
          <div className="step-content">
            <div className="step-round">1</div>
            <div className="step--text">Sign In</div>
          </div>
        </div>
      )}
      {step2 ? (
        <NavLink to="/shipping">
          <div className="steps__step">
            <div className="step1 step-bar"></div>
            <div className="step-content">
              <div className="step-round" style={color.bg}>
                2
              </div>
              <div className="step--text" style={color.textColor}>
                Shipping
              </div>
            </div>
          </div>
        </NavLink>
      ) : (
        <div className="steps__step">
          <div className="step1 step-bar"></div>
          <div className="step-content">
            <div className="step-round">2</div>
            <div className="step--text">Shipping</div>
          </div>
        </div>
      )}
      {step3 ? (
        <NavLink to="/payment">
          <div className="steps__step">
            <div className="step1 step-bar"></div>
            <div className="step-content">
              <div className="step-round" style={color.bg}>
                3
              </div>
              <div className="step--text" style={color.textColor}>
                Payment
              </div>
            </div>
          </div>
        </NavLink>
      ) : (
        <div className="steps__step">
          <div className="step1 step-bar"></div>
          <div className="step-content">
            <div className="step-round">3</div>
            <div className="step--text">Payment</div>
          </div>
        </div>
      )}
      {step4 ? (
        <NavLink to="/placeOrder">
          <div className="steps__step">
            <div className="step1 step-bar"></div>
            <div className="step-content">
              <div className="step-round" style={color.bg}>
                4
              </div>
              <div className="step--text" style={color.textColor}>
                Place order
              </div>
            </div>
          </div>
        </NavLink>
      ) : (
        <div className="steps__step">
          <div className="step1 step-bar"></div>
          <div className="step-content">
            {/* <div className="step-arrow">
            <BiChevronDown />
          </div> */}
            <div className="step-round">4</div>
            <div className="step--text">Place order</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSteps;
