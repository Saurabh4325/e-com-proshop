import { useDispatch, useSelector } from "react-redux";
import "../css/cart.css";
import { BiCartDownload, BiMinus, BiPlus, BiX } from "react-icons/bi";
import { useState } from "react";
import { addItem, removeItem } from "../slices/cartSlice";
import RoundButton from "../components/RoundButton";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("cartItems: ", cartItems);

  const [qty, setQty] = useState(1);

  const handleCounter = (action) => {
    console.log("action: ", action.item.countInStock);
    switch (action.type) {
      case "DECREASE":
        console.log("-");
        if (action.qty >= 0)
          dispatch(addItem({ ...action.item, qty: action.qty }));
        break;
      case "INCREASE":
        console.log("+");
        if (action.qty <= action.item.countInStock)
          dispatch(addItem({ ...action.item, qty: action.qty }));
        break;
      default:
        return;
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="cartContainer main--container">
      <h1 className="cart__headerText">Shopping Cart</h1>
      <div className="cartItem__container">
        <div className="cartItem__subcontainer">
          <section className="cartItems_section">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="cart__list-item">
                  <div className="cartPage__item-image">
                    <img
                      src={item.image}
                      className="cartPage__item-image-src"
                    />
                  </div>
                  <div className="cartPage__item-details">
                    <p className="cartPage__item-details-name">{item?.name}</p>
                    <p className="cartPage__item-details-brand">
                      {item?.brand}
                    </p>
                    {/* quantity */}
                    <div className="qtyContainer">
                      <div className="qtyContainer__sub">
                        <div className="qtyText">Quantity</div>
                        <div className="qtyCounterContainer">
                          <div className="qtyCounter">
                            <button
                              className="btn btn--icon"
                              onClick={() =>
                                handleCounter({
                                  type: "DECREASE",
                                  item: item,
                                  qty: item?.qty - 1,
                                })
                              }
                            >
                              <BiMinus />
                            </button>
                            <div className="qtyLabel">{item?.qty}</div>
                            <button
                              className="btn btn--icon"
                              onClick={() =>
                                handleCounter({
                                  type: "INCREASE",
                                  item: item,
                                  qty: item?.qty + 1,
                                })
                              }
                            >
                              <BiPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* qty end */}
                    <p className="cartPage__item-details-price">
                      ${item?.price}
                    </p>
                  </div>
                  <div className="cartPage__item-details-delete">
                    <button
                      className="btn btn--icon icon--sm btn--cartDelete"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <BiX />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2>No items in cart</h2>
            )}
          </section>
          <section className="cartItems_priceDetails">
            <div className="cartItems_priceDetails__container">
              <p className="cartDetail__text">Price Details</p>
              <div className="cartDetail__prices">
                <div className="cartDetail__prices-itemCharges">
                  <div className="cartDetail__prices-itemPrices">
                    <p>
                      Price (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      items)
                    </p>
                    <p>{`$${itemsPrice || 0}`}</p>
                  </div>

                  <div className="cartDetail__prices-itemPrices">
                    <p>Discount</p>
                    <p className="cart__extraPrice">{`- $${0}`}</p>
                  </div>
                  <div className="cartDetail__prices-itemPrices">
                    <p>Tax</p>
                    <p className="cart__extraPrice">{`+ $${taxPrice || 0}`}</p>
                  </div>
                  <div className="cartDetail__prices-itemPrices">
                    <p>Shipping Charge</p>
                    <p className="cart__extraPrice">{`+ $${
                      shippingPrice || 0
                    }`}</p>
                  </div>
                </div>
                <div className="cartDetail__prices-total">
                  <p>Total Amount</p>
                  <p>{`$${totalPrice || 0}`}</p>
                </div>
                <RoundButton
                  text="Checkout"
                  icon={<BiCartDownload />}
                  theme="green"
                  classes="btn--mr2"
                  onClick={handleCheckout}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
