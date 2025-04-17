import { BiCheckShield, BiEdit, BiTrash, BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import Loader from "../Loader";

const Userlist = () => {
  const {
    data: users,
    isLoading: userLoading,
    error: userError,
    refetch,
  } = useGetUsersQuery();

  console.log("users: ", users);

  const [deleteUser, { isLoading: isDeleted, error: deleteError }] =
    useDeleteUserMutation();

  const handleUserDelete = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(userId);
        refetch();
        toast.success("User deleted Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };
  return (
    <div className="orderHistory__container">
      <div className="col-1-boxes order_items">
        <div className="productlist__header">
          <h2 className="productlist__header-title">Product Items list</h2>
        </div>
        <div className="order_item_list">
          <table className="myorder_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isDeleted && <Loader />}
              {userLoading ? (
                <tr>
                  <td>
                    <Loader />
                  </td>
                </tr>
              ) : userError ? (
                <tr>
                  <td>
                    <h1>{userError}</h1>
                  </td>
                </tr>
              ) : (
                users?.map((user) => (
                  <tr
                    key={user._id}
                    className="profile__order_item order_item "
                  >
                    <td className="profile_image_td">{user._id}</td>
                    <td className="order_item_name">{user.name}</td>
                    <td className="order_item_price">{user.email}</td>
                    <td className="order_item_price">
                      {user?.isAdmin ? (
                        <BiCheckShield className="order_delivery_status_icon-true userlist__isAdmin-icon" />
                      ) : (
                        <BiX className="order_delivery_status_icon-false userlist__isAdmin-icon" />
                      )}
                    </td>
                    <td className="order_item_price product_list_edit">
                      <Link
                        to={`/admin/dashboard/user/${user._id}/edit`}
                        className="btn--icon-black"
                      >
                        <BiEdit className="product_list_edit-icon" />
                      </Link>
                    </td>
                    <td className="order_item_price product_list_delete">
                      <Link className="btn--icon-black">
                        <button
                          className="btn btn--normal btn--product-del"
                          onClick={() => handleUserDelete(user._id)}
                        >
                          <BiTrash className="btn--product-del-icon" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
