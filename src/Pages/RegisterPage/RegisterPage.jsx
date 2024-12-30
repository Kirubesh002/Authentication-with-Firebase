import { useState } from "react";
import { RegisterApi } from "../../services/api";
import { storeUserData } from "../../services/storage";
import { Authenticated } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  // Initial error state structure
  const initialStateError = {
    name: { required: false },
    email: { required: false },
    password: { required: false },
    customError: null,
  };

  const [error, setError] = useState(initialStateError);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = { ...initialStateError };
    let hasError = false;

    // Validation checks
    if (!formData.name.trim()) {
      errors.name.required = true;
      hasError = true;
    }
    if (!formData.email.trim()) {
      errors.email.required = true;
      hasError = true;
    }
    if (!formData.password.trim()) {
      errors.password.required = true;
      hasError = true;
    }

    // If no errors, proceed with API call
    if (!hasError) {
      setIsLoading(true);
      try {
        const res = await RegisterApi(formData);
        console.log("res",res.data)
        storeUserData(res.data.idToken);
        navigate("/dashboard");
      } catch (err) {
        const errorMessage = err.response?.data?.error?.message || "An error occurred.";
        setError({
          ...errors,
          customError:
            errorMessage === "EMAIL_EXISTS"
              ? "This email is already registered!"
              : errorMessage.includes("WEAK_PASSWORD")
              ? "Password should be at least 6 characters!"
              : errorMessage,
        });
      } finally {
        setIsLoading(false);
        // navigate("/");
      }
    } else {
      setError(errors);
    }
  };

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect if already authenticated
  if (Authenticated()) {
  return  navigate("/");
  }

  return (
    <div className="register-block">
      <div className="container">
        <div className="row">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInput}
                />
                {error.name.required && <span className="text-danger">Name is required.</span>}
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInput}
                />
                {error.email.required && <span className="text-danger">Email is required.</span>}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                    placeholder="Enter your password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInput}
                />
                {error.password.required && <span className="text-danger">Password is required.</span>}
              </div>

              {/* Error Message */}
              {error.customError && <span className="text-danger">{error.customError}</span>}

              {/* Loader */}
              {isLoading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="form-group">
                <input
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-login float-right"
                  value="Register"
                />
              </div>

              <div className="clearfix"></div>
              <div className="form-group">
                Already have an account? <Link to="/">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
