import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: imageLoading, error: imageError }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setImage(product.image);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      name,
      price,
      brand,
      image,
      countInStock,
      category,
      description,
    };
    try {
      const result = await updateProduct(updatedProduct);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product updated");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  const handleImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <FormContainer>
      <Link to={"/admin/dashboard/productlist"}>
        <button
          type="submit"
          className="btn btn-formSubmit"
          disabled={isLoading}
        >
          Go back
        </button>
      </Link>

      <div className="login__mainbox">
        <div className="login__container">
          <h1> Update Product </h1>
          <form onSubmit={(e) => handleUpdateProduct(e)}>
            <div className="login__form-group ">
              <div className="login__form-group-item">
                <label
                  htmlFor="username"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={name}
                  id="username"
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter Name"
                  spellCheck="false"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <label
                  htmlFor="price"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter product price"
                  spellCheck="false"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <label
                  htmlFor="image"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Choose file"
                  onChange={(e) => handleImage(e)}
                />
              </div>

              <div className="login__form-group-item">
                <label
                  htmlFor="brand"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="login__brand"
                  id="brand"
                  value={brand}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter brand name"
                  spellCheck="false"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <label
                  htmlFor="countInStock"
                  className="login__form-group-item-label form-group-item-label"
                >
                  countInStock
                </label>
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  value={countInStock}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter brand name"
                  spellCheck="false"
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <label
                  htmlFor="category"
                  className="login__form-group-item-label form-group-item-label"
                >
                  category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter category"
                  spellCheck="false"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <label
                  htmlFor="description"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter brand name"
                  spellCheck="false"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <button
                  type="submit"
                  className="btn btn-formSubmit"
                  disabled={isLoading}
                >
                  Update
                </button>
              </div>
            </div>

            {isLoading && <Loader />}
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default ProductEditScreen;
