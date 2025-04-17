import "../css/order.css";
import { useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  useOrderDeliverMutation,
  usePayOrderMutation,
} from "../slices/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BiCartAlt, BiLogoPaypal } from "react-icons/bi";
import Loader from "../components/Loader";
import RoundButton from "../components/RoundButton";

const OrderScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // console.log("orderscreen order :", order);

  const [payOrder, { isLoading: loadingPay, error: errorPay }] =
    usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [orderDeliver, { isLoading: orderLoading, error: orderError }] =
    useOrderDeliverMutation();

  useEffect(() => {
    if (!errorPay && !loadingPay && paypal?.clientId) {
      const loadingPayPalScript = () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPayPal]);

  const onApproveTest = async () => {
    try {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();
      toast.success("Payment Successfull");
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successfull");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  };
  const onError = (err) => {
    toast.error(err.message);
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const handleDeliver = async () => {
    try {
      await orderDeliver(orderId);
      refetch();
      toast.success("Successfully Delivered");
    } catch (err) {
      toast.error("Failed to deliver to product");
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div className="main--container">
      <h2>Place the order : {order._id}</h2>
      <div className="placeorder_container">
        <div className="col-1">
          <div className="col-1-boxes shipping_detail">
            <h2 className="order_headings">Shipping</h2>
            <p>Address : {order.shippingAddress.address}</p>
            <div
              className={`deliver_status_box ${
                order.isDelivered ? "paid" : ""
              }`}
            >
              {order.isDelivered ? "Delivered" : "Not Delivered"}
            </div>
          </div>
          <div className="col-1-boxes payment_method">
            <h2 className="order_headings">Payment Method</h2>
            <p>Method : {order.paymentMethod}</p>
            <div className={`deliver_status_box ${order.isPaid ? "paid" : ""}`}>
              {order.isPaid ? `Paid:: ${order.updatedAt}` : "Not Paid"}
            </div>
          </div>
          <div className="col-1-boxes order_items">
            <h2 className="order_headings">Order Items list</h2>
            <div className="order_item_list">
              {order.orderItems.map((item) => (
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
                      {order.orderItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}
                      items)
                    </p>
                    <p>{`$${order.itemsPrice || 0}`}</p>
                  </div>

                  <div className="cartDetail__prices-itemPrices">
                    <p>Discount</p>
                    <p className="cart__extraPrice">{`- $${0}`}</p>
                  </div>
                  <div className="cartDetail__prices-itemPrices">
                    <p>Tax</p>
                    <p className="cart__extraPrice">{`+ $${
                      order.taxPrice || 0
                    }`}</p>
                  </div>
                  <div className="cartDetail__prices-itemPrices">
                    <p>Shipping Charge</p>
                    <p className="cart__extraPrice">{`+ $${
                      order.shippingPrice || 0
                    }`}</p>
                  </div>
                </div>
                <div className="cartDetail__prices-total">
                  <p>Total Amount</p>
                  <p>{`$${order.totalPrice || 0}`}</p>
                </div>

                {!order?.isPaid && (
                  <div>
                    {loadingPay && <Loader />}
                    {isPending && <Loader />}

                    <div className="button__payGroup">
                      {/* <RoundButton
                        text={"Test to pay order"}
                        icon={<BiLogoPaypal />}
                        theme="orange"
                        classes="btn--mr2"
                        onClick={onApproveTest}
                      /> */}

                      <div
                        className="btn--paypal"
                        style={{ marginTop: "1rem" }}
                      >
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  </div>
                )}

                {orderLoading && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order?.isPaid &&
                  !order.isDelivered && (
                    <RoundButton
                      text={"Mark as Deliver"}
                      icon={<BiCartAlt />}
                      theme="orange"
                      classes="btn--mr2"
                      onClick={handleDeliver}
                    />
                  )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
