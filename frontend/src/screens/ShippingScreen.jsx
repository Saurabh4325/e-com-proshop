import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, state, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <div className="login__mainbox">
        <div className="login__container">
          <h1>Shipping Address</h1>
          <form onSubmit={handleSubmit}>
            <div className="login__form-group ">
              <div className="login__form-group-item">
                <label
                  htmlFor="address"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  id="address"
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter Address"
                  spellCheck="false"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <label
                  htmlFor="state"
                  className="login__form-group-item-label form-group-item-label"
                >
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={state}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter state"
                  spellCheck="false"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <label
                  htmlFor="city"
                  className="login__form-group-item-label form-group-item-label"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter city"
                  spellCheck="false"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <label
                  htmlFor="postalCode"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Postal Code
                </label>
                <input
                  type="number"
                  name="postalCode"
                  id="postalCode"
                  value={postalCode}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter Postal Code"
                  spellCheck="false"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <label
                  htmlFor="country"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={country}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter country"
                  spellCheck="false"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <button type="submit" className="btn btn-formSubmit">
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default ShippingScreen;
