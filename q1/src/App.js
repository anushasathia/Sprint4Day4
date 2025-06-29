    // src/App.js
    import React from 'react';
    // Imports useSelector to read state from the Redux store.
    // Imports useDispatch to send actions to the Redux store.
    import { useSelector, useDispatch } from 'react-redux';
    // Imports user-related actions.
    import { login, logout } from './features/user/userSlice';
    // Imports the ProductList and Cart components.
    import ProductList from './components/ProductList';
    import Cart from './components/Cart';
    // If App.css exists from create-react-app, you can remove or comment out this import
    // as inline styles are used.
    // import './App.css';

    function App() {
      // Uses useSelector to get 'currentUser' and 'isLoggedIn' state from the 'user' slice.
      const { currentUser, isLoggedIn } = useSelector(state => state.user);
      const dispatch = useDispatch(); // Gets the dispatch function.

      // --- Inline Styles for the main App layout ---
      const appContainerStyle = {
        padding: '20px',
        minHeight: '100vh', // Ensures the app takes at least the full viewport height.
        backgroundColor: '#eceff1', // Light gray background.
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centers content horizontally.
      };

      const headerStyle = {
        width: '100%',
        maxWidth: '1200px', // Max width for content within the header.
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      };

      const authSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px', // Space between items in the authentication section.
      };

      const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease-in-out',
      };

      const loginButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#28a745', // Green for login button.
        color: 'white',
      };

      const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545', // Red for logout button.
        color: 'white',
      };

      const mainContentStyle = {
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two equal columns for ProductList and Cart.
        gap: '20px', // Space between columns.
        marginTop: '20px',
      };

      return (
        <div style={appContainerStyle}>
          <header style={headerStyle}>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#333' }}>E-commerce Store</h1>
            <div style={authSectionStyle}>
              {/* Conditional rendering for Login/Logout buttons and welcome message. */}
              {isLoggedIn ? (
                <>
                  <span style={{ fontSize: '1.1rem', color: '#555' }}>Welcome, {currentUser?.username}!</span>
                  <button onClick={() => dispatch(logout())} style={logoutButtonStyle}>
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => dispatch(login())} style={loginButtonStyle}>
                  Login
                </button>
              )}
            </div>
          </header>

          <main style={mainContentStyle}>
            <ProductList /> {/* Displays products available to add to cart. */}
            <Cart />        {/* Displays cart contents and totals. */}
          </main>
        </div>
      );
    }

    export default App;
    