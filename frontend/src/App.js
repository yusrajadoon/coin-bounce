import Navbar from "./components/Navbar/Navbar"; // Import Navbar component
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import routing components
import Footer from "./components/Footer/Footer"; // Import Footer component
import Home from "./pages/Home/Home"; // Import Home page
import styles from "./App.module.css"; // Import CSS module for styling
import Protected from "./components/Protected/Protected"; // Import Protected route component
import Error from "./pages/Error/Error"; // Import Error page
import Login from "./pages/Login/Login"; // Import Login page
import { useSelector } from "react-redux"; // Import useSelector hook from Redux
import Signup from "./pages/Signup/Signup"; // Import Signup page
import Crypto from "./pages/Crypto/Crypto"; // Import Crypto page
import Blog from "./pages/Blog/Blog"; // Import Blog page
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog"; // Import Submit Blog page
import BlogDetails from "./pages/BlogDetails/BlogDetails"; // Import Blog Details page
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog"; // Import Update Blog page
import useAutoLogin from "./hooks/useAutoLogin"; // Import custom hook for auto-login
import Loader from "./components/Loader/Loader"; // Import Loader component

function App() {
  const isAuth = useSelector((state) => state.user.auth); // Get authentication status from Redux store

  const loading = useAutoLogin(); // Check if loading is in progress

  return loading ? ( // Conditional rendering based on loading state
    <Loader text="..." /> // Show loader if loading
  ) : (
    <div className={styles.container}> 
      <BrowserRouter>
        <div className={styles.layout}> 
          <Navbar /> 
          <Routes>
            <Route
              path="/" // Home route
              exact
              element={
                <div className={styles.main}>
                  <Home /> 
                </div>
              }
            />

            <Route
              path="crypto" // Crypto route
              exact
              element={
                <div className={styles.main}> 
                  <Crypto /> 
                </div>
              }
            />

            <Route
              path="blogs" // Blogs route
              exact
              element={
                <Protected isAuth={isAuth}> 
                  <div className={styles.main}> 
                    <Blog /> 
                  </div>
                </Protected>
              }
            />

            <Route
              path="blog/:id" // Blog details route
              exact
              element={
                <Protected isAuth={isAuth}> 
                  <div className={styles.main}>
                    <BlogDetails /> 
                  </div>
                </Protected>
              }
            />

            <Route
              path="blog-update/:id" // Update Blog route
              exact
              element={
                <Protected isAuth={isAuth}> 
                  <div className={styles.main}> 
                    <UpdateBlog /> 
                  </div>
                </Protected>
              }
            />

            <Route
              path="submit" // Submit Blog route
              exact
              element={
                <Protected isAuth={isAuth}> 
                  <div className={styles.main}> 
                    <SubmitBlog /> 
                  </div>
                </Protected>
              }
            />

            <Route
              path="signup" // Signup route
              exact
              element={
                <div className={styles.main}> 
                  <Signup /> 
                </div>
              }
            />

            <Route
              path="login" // Login route
              exact
              element={
                <div className={styles.main}> 
                  <Login />
                </div>
              }
            />

            <Route
              path="*" // Catch-all route for errors
              element={
                <div className={styles.main}> 
                  <Error /> 
                </div>
              }
            />
          </Routes>
          <Footer /> 
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App; // Export App component