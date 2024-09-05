import { useState } from "react"; // Import useState hook for state management
import styles from "./Login.module.css"; // Import CSS module for styling
import TextInput from "../../components/TextInput/TextInput"; // Import TextInput component
import loginSchema from "../../schemas/loginSchema"; // Import validation schema for login
import { useFormik } from "formik"; // Import useFormik hook for form handling
import { login } from "../../api/internal"; // Import login API function
import { setUser } from "../../store/userSlice"; // Import setUser action
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

function Login() {
  const navigate = useNavigate(); // Initialize navigate function
  const dispatch = useDispatch(); // Initialize dispatch function

  const [error, setError] = useState(""); // State for error messages

  const handleLogin = async () => { // Function to handle login
    console.log("Form values:", values); // Log form values for debugging
    const data = { // Prepare login data
      username: values.username, // User username
      password: values.password, // User password
    };

    const result = await login(data); // Call the login API
    console.log("Login result:", result); // Log the result for debugging

    if (result) { // Check if login was successful
      navigate('/blogs'); // Use navigate to redirect to blogs page
    } else {
      setError("Login failed. Please check your credentials."); // Example error handling
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({ // Initialize formik
    initialValues: { // Initial form values
      username: "", // Username field
      password: "", // Password field
    },

    validationSchema: loginSchema, // Validation schema for form
  });

  return (
    <div className={styles.loginWrapper}> 
      <div className={styles.loginHeader}>Log in to your account</div> 
      <TextInput
        type="text" // Input type
        value={values.username} // Input value
        name="username" // Input name
        onBlur={handleBlur} // Handle blur event
        onChange={handleChange} // Handle change event
        placeholder="username" // Placeholder text
        error={errors.username && touched.username ? 1 : undefined} // Error handling
        errormessage={errors.username} // Error message
      />
      <TextInput
        type="password" // Input type
        name="password" // Input name
        value={values.password} // Input value
        onBlur={handleBlur} // Handle blur event
        onChange={handleChange} // Handle change event
        placeholder="password" // Placeholder text
        error={errors.password && touched.password ? 1 : undefined} // Error handling
        errormessage={errors.password} // Error message
      />
      <button
        className={styles.logInButton} // Log In button
        onClick={handleLogin} // Handle login click
        disabled={ // Disable button based on validation
          !values.username || // Check if username is empty
          !values.password || // Check if password is empty
          errors.username || // Check for username errors
          errors.password // Check for password errors
        }
      >
        Log In 
      </button>
      <span>
        Don't have an account?{" "} 
        <button
          className={styles.createAccount} // Register button
          onClick={() => navigate("/signup")} // Navigate to signup
        >
          Register 
        </button>
      </span>
      {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""} 
    </div>
  );
}

export default Login; // Export Login component