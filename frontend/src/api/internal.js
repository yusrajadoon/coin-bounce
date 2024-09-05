import axios from "axios"; // Import axios for making HTTP requests

// Create an axios instance with default settings
const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH, // Set base URL from environment variable
  withCredentials: true, // Include credentials in requests
  headers: {
    "Content-Type": "application/json", // Set content type to JSON
  },
});

// Function to handle user login
export const login = async (data) => {
  try {
    const response = await api.post("http://localhost:5002/login", data); // Make POST request to login endpoint
    console.log("API Response:", response); // Log the full response for debugging
    if (response.status === 200) { // Check if login was successful
      return response.data; // Return user data or token
    } else {
      console.error("Login failed with status:", response.status); // Log status if not 200
      return null; // Return null if login was not successful
    }
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message); // Log the error for debugging
    return null; // Return null if login was not successful
  }
};

// Function to handle user signup
export const signup = async (data) => {
  let response; // Variable to store the response

  try {
    response = await api.post("http://localhost:5002/register", data); // Make POST request to register endpoint
  } catch (error) {
    return error; // Return error if request fails
  }

  return response; // Return the response if successful
};

// Function to handle user signout
export const signout = async () => {
  let response; // Variable to store the response
  try {
    response = await api.post("http://localhost:5002/logout"); // Make POST request to logout endpoint
  } catch (error) {
    return error; // Return error if request fails
  }

  return response; // Return the response if successful
};

// Function to get all blogs
export const getAllBlogs = async () => {
  let response; // Variable to store the response

  try {
    response = await api.get("http://localhost:5002/blog/all"); // Make GET request to fetch all blogs
  } catch (error) {
    // Handle error (currently does nothing)
  }

  return response; // Return the response if successful
};

// Function to submit a new blog
export const submitBlog = async (data) => {
  let response; // Variable to store the response

  try {
    response = await api.post("http://localhost:5002/blog", data); // Make POST request to submit blog
    if (response.status !== 201) { // Check if the creation was successful
      console.error("Blog creation failed with status:", response.status); // Log status if not 201
      return null; // Return null if creation was not successful
    }
  } catch (error) {
    // Check if error response exists and log the status
    if (error.response) {
      console.error("Error submitting blog:", error.response.data); // Log the error response data
      console.error("Validation errors:", error.response.data.errors); // Log specific validation errors if available
      return null; // Return null if request fails
    } else {
      console.error("Error submitting blog:", error.message); // Log the error message
      return null; // Return null if request fails
    }
  }

  return response.data; // Return the response data if successful
};

// Function to get a blog by its ID
export const getBlogById = async (id) => {
  let response; // Variable to store the response

  try {
    response = await api.get(`http://localhost:5002/blog/${id}`); // Make GET request to fetch blog by ID
  } catch (error) {
    return error; // Return error if request fails
  }

  return response; // Return the response if successful
};

// Function to get comments by blog ID
export const getCommentsById = async (id) => {
  let response; // Variable to store the response

  try {
    response = await api.get(`http://localhost:5002/comment/${id}`, { // Make GET request to fetch comments by blog ID
      validateStatus: false, // Do not throw error for non-2xx responses
    });
  } catch (error) {
    return error; // Return error if request fails
  }

  return response; // Return the response if successful
};

// Function to post a comment
export const postComment = async (data) => {
  let response; // Variable to store the response

  try {
    response = await api.post("http://localhost:5002/comment", data); // Make POST request to submit comment
  } catch (error) {
    return error; // Return error if request fails
  }
  return response; // Return the response if successful
};

// Function to delete a blog by its ID
export const deleteBlog = async (id) => {
  let response; // Variable to store the response
  try {
    response = await api.delete(`http://localhost:5002/blog/${id}`); // Make DELETE request to remove blog by ID
  } catch (error) {
    return error; // Return error if request fails
  }

  return response; // Return the response if successful
};

// Function to update a blog
export const updateBlog = async (data) => {
  let response; // Variable to store the response
  try {
    response = await api.put("http://localhost:5002/blog", data); // Make PUT request to update blog
  } catch (error) {
    return error; // Return error if request fails
  }
  return response; // Return the response if successful
};

// Auto token refresh logic
// /protected-resource -> 401
// /refresh -> authenticated state
// /protected-resource

// Interceptor to handle responses
api.interceptors.response.use(
  (config) => config, // Return the config if the response is successful
  async (error) => { // Handle errors
    const originalReq = error.config; // Store the original request

    // Extract the value of message from JSON response if it exists
    const errorMessage = error.response && error.response.data && error.response.data.message;

    // Check if the error is due to unauthorized access
    if (
      errorMessage === 'Unauthorized' && // Check for unauthorized message
      (error.response.status === 401 || error.response.status === 500) && // Check for specific status codes
      originalReq && // Ensure original request exists
      !originalReq._isRetry // Ensure this is not a retry
    ) {
      originalReq._isRetry = true; // Mark the request as a retry

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, { // Attempt to refresh token
          withCredentials: true, // Include credentials in the request
        });

        return api.request(originalReq); // Retry the original request
      } catch (error) {
        return error; // Return error if refresh fails
      }
    }
    throw error; // Throw the original error if not handled
  }
);