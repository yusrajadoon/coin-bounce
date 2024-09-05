import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import styles from "./Navbar.module.css"; // Import CSS module for styling
import { useSelector } from "react-redux"; // Import useSelector hook from Redux
import { signout } from "../../api/internal"; // Import signout API function
import { resetUser } from "../../store/userSlice"; // Import resetUser action
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux

function Navbar() {
  const dispatch = useDispatch(); // Initialize dispatch function

  const isAuthenticated = useSelector((state) => state.user.auth); // Get authentication status from Redux store

  const handleSignout = async () => { // Function to handle sign out
    await signout(); // Call signout API
    dispatch(resetUser()); // Reset user state in Redux store
  };

  return (
    <>
      <nav className={styles.navbar}> 
        <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}> 
          CoinBounce 
        </NavLink>

        <NavLink
          to="/" // Home link
          className={({ isActive }) => // Determine active class
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Home 
        </NavLink>

        <NavLink
          to="crypto" // Crypto link
          className={({ isActive }) => // Determine active class
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Cryptocurrencies 
        </NavLink>

        <NavLink
          to="blogs" // Blogs link
          className={({ isActive }) => // Determine active class
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Blogs 
        </NavLink>

        <NavLink
          to="submit" // Submit Blog link
          className={({ isActive }) => // Determine active class
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Submit a blog 
        </NavLink>

        {isAuthenticated ? ( // Conditional rendering based on authentication
          <div>
            <NavLink> 
              <button className={styles.signOutButton} onClick={handleSignout}> 
                Sign Out 
              </button>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              to="login" // Login link
              className={({ isActive }) => // Determine active class
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button className={styles.logInButton}>Log In</button> 
            </NavLink>

            <NavLink
              to="signup" // Signup link
              className={({ isActive }) => // Determine active class
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button className={styles.signUpButton}>Sign Up</button> 
            </NavLink>
          </div>
        )}
      </nav>
      <div className={styles.separator}></div> 
    </>
  );
}

export default Navbar; // Export Navbar component