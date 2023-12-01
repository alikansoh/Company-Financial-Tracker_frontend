import react from 'react'
import '../Users/Users.css';
import axios from 'axios';

export default function Users() {

//  const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userData = {
//       name: event.target.elements.nameInput.value,
//       email: event.target.elements.emailInput.value,
//       password: event.target.elements.passwordInput.value,
//       role:event.target.elements.roleButton
//     };
//     try {
//       await axios.post('http://localhost:8080/api/users', userData);
//       event.target.reset();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div className="User-container">
//       <div className="User-h1">Users</div>
//       <button type='submit' className="User-Add-button">Add User</button>
//       <form onSubmit={handleSubmit} className="User-form">
//         <label className='User-inputs-label' htmlFor="nameInput">User Name</label>
//         <input type="text" id="nameInput" name='name' className='User-name-input'/>
//         <label className='User-inputs-label' htmlFor="emailInput">Email</label>
//         <input type="text" id="emailInput" name='email' className='User-email-input'/>
//         <label className='User-inputs-label' htmlFor='password'>Password</label>
//         <input type="text" id="passwordInput" name='password' className='User-password-input'/>
//       </form>
//     </div>
//   );
};
