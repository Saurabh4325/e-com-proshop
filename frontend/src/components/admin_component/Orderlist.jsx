import { NavLink, useParams } from "react-router-dom";
import Loader from "../Loader";
import { BiCheckDouble, BiX } from "react-icons/bi";
import { useGetAllOrdersQuery } from "../../slices/orderApiSlice";

const Orderlist = () => {
  const { pageNumber } = useParams();
  const {
    data: orders,
    isLoading: orderLoading,
    error,
  } = useGetAllOrdersQuery({ pageNumber });
  // console.log("orderlist: ", orders);
  return (
    <div className="orderHistory__container">
      <div className="col-1-boxes order_items">
        <h2 className="order_headings">Order Items list</h2>
        <div className="order_item_list">
          <table className="myorder_table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Description</th>
                <th>Total Amount</th>
                <th>Delivery Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orderLoading ? (
                <tr>
                  <td>
                    <Loader />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td>
                    <h1>error</h1>
                  </td>
                </tr>
              ) : (
                orders?.map((order) =>
                  order.orderItems.map((item) => (
                    <tr
                      key={item._id}
                      className="profile__order_item order_item "
                    >
                      <td className="profile_image_td">
                        <img
                          src={`${item.image}`}
                          alt="order item image"
                          className="order_item_image profile_item_image"
                        />
                      </td>
                      <td className="order_item_name">{item.name}</td>
                      <td className="order_item_price">{`${order.totalPrice}`}</td>
                      <td className="order_item_price order_item_delivery_status_icons">
                        {order?.isDelivered ? (
                          <BiCheckDouble className="order_delivery_status_icon-true " />
                        ) : (
                          <BiX className="order_delivery_status_icon-false" />
                        )}
                      </td>
                      <td className="order_item_price btn--order_item_detail">
                        <NavLink to={`/order/${order._id}`}>
                          <button className="btn btn--normal">Detail</button>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orderlist;
