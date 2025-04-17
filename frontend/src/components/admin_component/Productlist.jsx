import { BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import Paginate from "../Paginate";

const Productlist = () => {
  const { pageNumber } = useParams();
  console.log("productlist pageNumber: ", pageNumber);
  const {
    data,
    isLoading: orderLoading,
    error,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  console.log("pages: ", data);

  const [createProduct, { isLoading: createLoading, error: createError }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteProductMutation();

  const handleProductDelete = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(productId);
        refetch();
        toast.success("Successfully Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const handleCreateProduct = async () => {
    if (window.confirm("Are you sure you want to add product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Sample product is created");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="orderHistory__container">
      <div className="col-1-boxes order_items">
        <div className="productlist__header">
          <h2 className="productlist__header-title">Product Items list</h2>
          <div className="productlist__header-create-div">
            <button
              className="productlist__header-create-btn"
              onClick={handleCreateProduct}
            >
              Create Product
            </button>
          </div>
        </div>
        <div className="order_item_list">
          <table className="myorder_table">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {createLoading && <Loader />}
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
                data.products?.map((product) => (
                  <tr
                    key={product._id}
                    className="profile__order_item order_item "
                  >
                    <td className="profile_image_td">{product._id}</td>
                    <td className="order_item_name">{product.name}</td>
                    <td className="order_item_price">{product.price}</td>
                    <td className="order_item_price">{product.category}</td>
                    <td className="order_item_price">{product.brand}</td>
                    <td className="order_item_price product_list_edit">
                      <Link
                        to={`/admin/dashboard/product/${product._id}/edit`}
                        className="btn--icon-black"
                      >
                        <BiEdit className="product_list_edit-icon" />
                      </Link>
                    </td>
                    <td className="order_item_price product_list_delete">
                      <Link className="btn--icon-black">
                        <button
                          className="btn btn--normal btn--product-del"
                          onClick={() => handleProductDelete(product._id)}
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
      {/* Pagination */}
      <Paginate
        pages={data?.pages}
        page={data?.page}
        isAdmin={true}
        oneTimePages={2}
        adminPath="/admin/dashboard/productlist"
      />
    </div>
  );
};

export default Productlist;
