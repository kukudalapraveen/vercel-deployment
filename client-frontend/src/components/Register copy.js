import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  
  const [confirmation, setConfirmation] = useState(null); // State for confirmation message

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/register', formData);
      // Assuming the backend returns an object with { firstName, email }
      setConfirmation(response.data); // Update confirmation state with data from the backend
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOk = () => {
    setConfirmation(null); // Clear confirmation message when "OK" is clicked
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* Form fields */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      {confirmation && (
        <div>
          <p>Hey!!!,Your Registration Successful!</p>
          <p>First Name: {confirmation.firstName}</p>
          <p>Email: {confirmation.email}</p>
          <p>Your Password is: {confirmation.password}</p>
          <button onClick={handleOk}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Register;





// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//   });

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/register', formData);
//       console.log(response.data,"dataaaaa"); // Check if response.data is defined
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       {/* Form fields */}
//       <input type="text" name="firstName" onChange={handleChange} />
//       <input type="text" name="lastName" onChange={handleChange} />
//       <input type="email" name="email" onChange={handleChange} />
//       <input type="text" name="phoneNumber" onChange={handleChange} />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;
