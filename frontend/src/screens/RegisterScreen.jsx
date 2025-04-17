import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredential } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        console.log("auth : ", res);
        dispatch(setCredential(res));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div className="login__mainbox">
        <div className="login__container">
          <h1>Sign Up</h1>
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
                  Sign In
                </button>
              </div>
            </div>

            {isLoading && <Loader />}
          </form>

          <div className="login__newUSer">
            <p>
              Already have account?{" "}
              <NavLink to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                <span className="form_newUser-link">Sign In</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
