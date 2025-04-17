import { useState } from "react";
import styles from "./Login.module.css";
import TextInput from "../../components/TextInput/TextInput";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../../api/internal";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    try {
      const data = {
        username: values.username,
        password: values.password,
      };

      const result = await login(data);
      if (result) {
        navigate('/blogs');
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin, // ✅ using Formik's onSubmit handler
  });

  const { values, touched, handleBlur, handleChange, errors } = formik;

  return (
    <form className={styles.loginWrapper} onSubmit={formik.handleSubmit}>
      <div className={styles.loginHeader}>Log in to your account</div>

      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <button
        className={styles.logInButton}
        type="submit" // ✅ use submit type
        disabled={
          !values.username ||
          !values.password ||
          errors.username ||
          errors.password
        }
      >
        Log In
      </button>

      <span>
        Don't have an account?{" "}
        <button
          type="button"
          className={styles.createAccount}
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </span>

      {error !== "" && <p className={styles.errorMessage}>{error}</p>} {/* ✅ strict equality */}
    </form>
  );
}

export default Login;
