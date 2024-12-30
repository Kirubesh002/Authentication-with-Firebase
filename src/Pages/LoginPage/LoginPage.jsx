import { useEffect, useState } from "react";
import { LoginApi } from "../../services/api";
import { removeUserData, storeUserData } from "../../services/storage";
import { Link, useNavigate } from "react-router-dom";
import { Authenticated } from "../../services/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const initialStateError = {
    email: { required: false },
    password: { required: false },
    customError: null,
  };
  const [error, setError] = useState(initialStateError);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = { ...initialStateError };
    let hasError = false;

    if (!formData.email.trim()) {
      errors.email.required = true;
      hasError = true;
    }
    if (!formData.password.trim()) {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setIsLoading(true);
      try {
        const res = await LoginApi(formData);
        storeUserData(res.data.idToken);
        navigate("/dashboard");
      } catch (err) {
        const errorMessage = err.response?.data?.error?.message || "Unknown error";
        console.log('errorMessage',errorMessage)
        setError({
          ...errors,
          customError: errorMessage === "INVALID_LOGIN_CREDENTIALS"
            ? "Invalid login credentials."
            : "Something went wrong. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setError({ ...errors });
    }
  //   if (Authenticated()) {
  //     navigate("/dashboard");
    
  //  }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
  //   if (Authenticated()) {
  //     navigate("/dashboard");
    
  //  }
  removeUserData()

  },[])
  

  return (
    <div className="login-block">
      <div className="container">
        <div className="row">
          <div className="col login-sec">
            <h2 className="text-center">Login Now</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-uppercase" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="email"
                />
                {error.email.required && (
                  <span className="text-danger">Email is required.</span>
                )}
              </div>
              <div className="form-group">
                <label className="text-uppercase" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInput}
                />
                {error.password.required && (
                  <span className="text-danger">Password is required.</span>
                )}
              </div>
              <div className="form-group">
                {isLoading && (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                {error.customError && (
                  <span className="text-danger">{error.customError}</span>
                )}
                <input
                  type="submit"
                  className="btn btn-login float-right"
                  value="Login"
                  disabled={isLoading}
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Create new account? <Link to="/registerPage">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
