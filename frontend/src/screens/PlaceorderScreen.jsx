import "../css/placeorder.css";
import "../css/cart.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiCartDownload } from "react-icons/bi";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import RoundButton from "../components/RoundButton";
import Loader from "../components/Loader";

const PlaceorderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const handlePlaceorder = async () => {
    try {
      const res = await createOrder({
        user: userInfo._id,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log("clear cart");
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.log("error", error);
      toast.error(error);
    }
  };

  return (
    <div className="main--container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder_container">
        <div className="col-1">
          <div className="col-1-boxes shipping_detail">
            <h2 className="order_headings">Shipping</h2>
            <p>Address : {cart.shippingAddress.address}</p>
          </div>
          <div className="col-1-boxes payment_method">
            <h2 className="order_headings">Payment Method</h2>
            <p>Method : {cart.paymentMethod}</p>
          </div>
          <div className="col-1-boxes order_items">
            <h2 className="order_headings">Order Items list</h2>
            <div className="order_item_list">
              {cart.cartItems.map((item) => (
                <div key={item._id} className="order_item">
                  <img
                    src={`${item.image}`}
                    alt="order item image"
                    className="order_item_image"
                  />
                  <div className="order_item_name">{item.name}</div>
                  <div className="order_item_price">{`${item.qty} * ${
                    item.price
                  } = ${item.qty * item.price}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-2">
          <section className="cartItems_priceDetails">
            <div className="cartItems_priceDetails__container">
              <p className="cartDetail__text">Order Summary</p>
              <div className="cartDetail__prices">
                <div className="cartDetail__prices-itemCharges">
                  <div className="cartDetail__prices-itemPrices">
                    <p>
                      Price (
                      {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      items)
                    </p>
                    <p>{`$${cart.itemsPrice || 0}`}</p>
                  </div>

                  <div className="cartDetail__prices-itemPrices">
                    <p>Discount</p>
                    <p className="cart__extraPrice">{`- $${0}`}</p>
                  </div>
                  <div className="cartDetail__prices-itemPrices">
                    <p>Tax</p>
                    <p className="cart__extraPrice">{`+ $${
                      cart.taxPrice || 0
                    }`}</p>
                  </div>
                  <div className="cartDetail__prices-itemPrices">
                    <p>Shipping Charge</p>
                    <p className="cart__extraPrice">{`+ $${
                      cart.shippingPrice || 0
                    }`}</p>
                  </div>
                </div>
                <div className="cartDetail__prices-total">
                  <p>Total Amount</p>
                  <p>{`$${cart.totalPrice || 0}`}</p>
                </div>
                <RoundButton
                  text="Checkout"
                  icon={<BiCartDownload />}
                  theme="green"
                  classes="btn--mr2"
                  onClick={() => handlePlaceorder()}
                />
                {isLoading && <Loader />}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlaceorderScreen;
