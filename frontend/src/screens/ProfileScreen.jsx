import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredential } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Orderlist from "../components/admin_component/Orderlist";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
  } = useGetMyOrdersQuery();
  console.log("orders profile: ", orders);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredential(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error("Failed to update profile");
      }
    } else {
      toast.error("Password does not match");
    }

    console.log("profile updated");
  };
  return (
    <FormContainer>
      <div className="login__mainbox profile__container">
        <div className="login__container">
          <h1>User Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="login__form-group ">
              <div className="login__form-group-item">
                <label
                  htmlFor="username"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Name
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
                  htmlFor="email"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="password"
                  id="email"
                  value={email}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter Email address"
                  spellCheck="false"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <label
                  htmlFor="password"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="login__password"
                  id="password"
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter Password"
                  spellCheck="false"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login__form-group-item">
                <label
                  htmlFor="confirm-password"
                  className="login__form-group-item-label form-group-item-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Confirm Password"
                  spellCheck="false"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* Order history */}
        <Orderlist
          orders={orders}
          orderLoading={orderLoading}
          error={orderError}
        />
      </div>
    </FormContainer>
  );
};

export default ProfileScreen;
