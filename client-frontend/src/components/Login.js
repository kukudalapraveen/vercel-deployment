import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const { firstName, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/login', formData);
      console.log('Login successful:', res.data);

      const { firstName } = res.data;
      setMessage('User logged in successfully');
      setError(''); // Clear any previous errors

      // Redirect to dashboard with username
      navigate(`/${firstName}/dashboard`);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      if (err.response) {
        switch (err.response.status) {
          case 400:
            if (err.response.data.msg === 'User does not exist') {
              setError('User does not exist. Please check your username or register.');
            } else if (err.response.data.msg === 'Invalid credentials') {
              setError('Invalid credentials. Please check your password.');
            } else {
              setError('Login failed. Please try again.');
            }
            break;
          default:
            setError('Login failed. Please try again.');
            break;
        }
      } else {
        setError('Login failed. Please check your network connection.');
      }
      setMessage(''); // Clear any previous success messages
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          type="text" // Changed type to text
          name="firstName"
          value={firstName}
          onChange={onChange}
          placeholder="First Name"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
      {/* Uncomment and use this if you want a Home button */}
      {/* <Link to="/">
        <button className="home-button">Home</button>
      </Link> */}
    </div>
  );
};

export default Login;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import the CSS file for styling

// const Login = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const navigate = useNavigate(); // Hook for navigation

//   const { firstName, password } = formData;

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/login', formData);
//       console.log('Login successful:', res.data);

//       const { firstName } = res.data;
//       setMessage('User logged in successfully');
//       setError(''); // Clear any previous errors

//       // Redirect to dashboard with username
//       navigate(`/${firstName}/dashboard`);
//     } catch (err) {
//       console.error('Login error:', err.response?.data || err.message);
//       if (err.response) {
//         switch (err.response.status) {
//           case 400:
//             if (err.response.data.msg === 'User does not exist') {
//               setError('Email does not exist. Please check your email or register.');
//             } else if (err.response.data.msg === 'Invalid credentials') {
//               setError('Incorrect password. Please check your password.');
//             } else {
//               setError('Login failed. Please try again.');
//             }
//             break;
//           default:
//             setError('Login failed. Please try again.');
//             break;
//         }
//       } else {
//         setError('Login failed. Please check your network connection.');
//       }
//       setMessage(''); // Clear any previous success messages
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={onSubmit}>
//         <h2>Login</h2>
//         <input
//           type="firstName"
//           name="firstName"
//           value={firstName}
//           onChange={onChange}
//           placeholder="firstName"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={onChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//         {message && <p className="success-message">{message}</p>}
//         {error && <p className="error-message">{error}</p>}
//       </form>
//       {/* <Link to="/">
//         <button className="home-button">Home</button>
//       </Link> */}
//     </div>
//   );
// };

// export default Login;
