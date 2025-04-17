import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [updateUser, { isLoading: isUserUpdated, error: updateError }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    };
    console.log("updated user: ", updatedUser);
    try {
      const result = await updateUser(updatedUser);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("User updated successfully");
        navigate("/admin/dashboard/userlist");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };
  return (
    <FormContainer>
      <Link to={"/admin/dashboard/userlist"}>
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
          <h1> Update User </h1>
          {isLoading && <Loader />}
          <form onSubmit={(e) => handleUpdateUser(e)}>
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="login__form-group-item-input form-group-item-input"
                  placeholder="Enter Email"
                  spellCheck="false"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login__form-group-item">
                <div>
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={isAdmin}
                    className="login__form-group-item-input form-group-item-input"
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <label
                    htmlFor="isAdmin"
                    className="login__form-group-item-label form-group-item-label"
                  >
                    Is Admin
                  </label>
                </div>
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

            {isUserUpdated && <Loader />}
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default UserEditScreen;
