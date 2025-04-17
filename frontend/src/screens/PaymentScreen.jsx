import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import "../css/payment.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const [payment, setPayment] = useState(paymentMethod || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress) navigate("/shipping");
  }, [shippingAddress, navigate]);

  const handlePayment = (method) => {
    console.log(method);
    dispatch(savePaymentMethod(method));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <div className="login__mainbox">
        <div className="login__container">
          <h1>Select Payment Method</h1>
          <div className="login__form-group ">
            <div className="login__form-group-item">
              <button
                className="btn btn--border"
                onClick={() => handlePayment("PayPal")}
                style={{
                  background: `${
                    payment === "PayPal" ? "#ff9b00" : "rgb(240, 240, 240)"
                  }`,
                }}
              >
                PayPal
              </button>
            </div>
            <div className="login__form-group-item">
              <button
                className="btn btn--border"
                onClick={() => handlePayment("GPay")}
                style={{
                  background: `${
                    payment === "GPay" ? "#ff9b00" : "rgb(240, 240, 240)"
                  }`,
                }}
              >
                GPay
              </button>
            </div>
            <div className="login__form-group-item">
              <button
                className="btn btn--border"
                onClick={() => handlePayment("Paytm")}
                style={{
                  background: `${
                    payment === "Paytm" ? "#ff9b00" : "rgb(240, 240, 240)"
                  }`,
                }}
              >
                Paytm
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
