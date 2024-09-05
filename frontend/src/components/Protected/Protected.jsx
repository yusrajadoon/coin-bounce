import { Navigate } from "react-router-dom"; // Import Navigate component for redirecting

function Protected({ isAuth, children }) { // Define Protected component that takes isAuth and children as props
  if (isAuth) { // Check if the user is authenticated
    return children; // If authenticated, render the children components
  } else { // If not authenticated
    return <Navigate to="/login" />; // Redirect to the login page
  }
}

export default Protected; // Export the Protected component for use in other parts of the application