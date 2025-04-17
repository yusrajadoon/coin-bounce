import { useState } from "react"; // Import useState hook for state management
import styles from "./Signup.module.css"; // Import CSS module for styling
import TextInput from "../../components/TextInput/TextInput"; // Import TextInput component
import signupSchema from "../../schemas/signupSchema"; // Import validation schema for signup
import { useFormik } from "formik"; // Import useFormik hook for form handling
import { setUser } from "../../store/userSlice"; // Import setUser action
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux
import { signup } from "../../api/internal"; // Import signup API function

function Signup() {
  const navigate = useNavigate(); // Initialize navigate function
  const dispatch = useDispatch(); // Initialize dispatch function
  const [error, setError] = useState(""); // State for error messages

  const handleSignup = async () => { // Function to handle signup
    const data = { // Prepare signup data
      name: values.name, // User name
      username: values.username, // User username
      password: values.password, // User password
      confirmPassword: values.confirmPassword, // Confirm password
      email: values.email, // User email
    };

    const response = await signup(data); // Call signup API

    if (response.status === 201) { // Check if signup was successful
      // setUser
      const user = { // Prepare user data
        _id: response.data.user._id, // User ID
        email: response.data.user.email, // User email
        username: response.data.user.username, // User username
        auth: response.data.auth, // User authentication status
      };

      dispatch(setUser(user)); // Dispatch setUser action to store user data

      // redirect homepage
      navigate("/"); // Redirect to homepage
    } else if (response.code === "ERR_BAD_REQUEST") { // Check for bad request error
      // display error message
      setError(response.response.data.message); // Set error message
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({ // Initialize formik
    initialValues: { // Initial form values
      name: "", // Name field
      username: "", // Username field
      email: "", // Email field
      password: "", // Password field
      confirmPassword: "", // Confirm password field
    },

    validationSchema: signupSchema, // Validation schema for form
  });

  return (
    <div className={styles.signupWrapper}> 
      <div className={styles.signupHeader}>Create an account</div> 
      <TextInput
        type="text" // Input type
        name="name" // Input name
        value={values.name} // Input value
        onChange={handleChange} // Handle change event
        onBlur={handleBlur} // Handle blur event
        placeholder="name" // Placeholder text
        error={errors.name && touched.name ? 1 : undefined} // Error handling
        errormessage={errors.name} // Error message
      />

      <TextInput
        type="text" // Input type
        name="username" // Input name
        value={values.username} // Input value
        onChange={handleChange} // Handle change event
        onBlur={handleBlur} // Handle blur event
        placeholder="username" // Placeholder text
        error={errors.username && touched.username ? 1 : undefined} // Error handling
        errormessage={errors.username} // Error message
      />

      <TextInput
        type="text" // Input type
        name="email" // Input name
        value={values.email} // Input value
        onChange={handleChange} // Handle change event
        onBlur={handleBlur} // Handle blur event
        placeholder="email" // Placeholder text
        error={errors.email && touched.email ? 1 : undefined} // Error handling
        errormessage={errors.email} // Error message
      />

      <TextInput
        type="password" // Input type
        name="password" // Input name
        value={values.password} // Input value
        onChange={handleChange} // Handle change event
        onBlur={handleBlur} // Handle blur event
        placeholder="password" // Placeholder text
        error={errors.password && touched.password ? 1 : undefined} // Error handling
        errormessage={errors.password} // Error message
      />

      <TextInput
        type="password" // Input type
        name="confirmPassword" // Input name
        value={values.confirmPassword} // Input value
        onChange={handleChange} // Handle change event
        onBlur={handleBlur} // Handle blur event
        placeholder="confirm password" // Placeholder text
        error={ // Error handling
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword} // Error message
      />

      <button
        className={styles.signupButton} // Signup button
        onClick={handleSignup} // Handle signup click
        disabled={ // Disable button based on validation
          !values.username || // Check if username is empty
          !values.password || // Check if password is empty
          !values.name || // Check if name is empty
          !values.confirmPassword || // Check if confirm password is empty
          !values.email || // Check if email is empty
          errors.username || // Check for username errors
          errors.password || // Check for password errors
          errors.confirmPassword || // Check for confirm password errors
          errors.name || // Check for name errors
          errors.email // Check for email errors
        }
      >
        Sign Up 
      </button>

      <span>
        Already have an account?{" "} 
        <button className={styles.login} onClick={() => navigate("/login")}> 
          Log In 
        </button>
      </span>

      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
 
    </div>
  );
}

export default Signup; // Export Signup component