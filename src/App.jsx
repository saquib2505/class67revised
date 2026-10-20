
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all users from the backend
  const getUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/users'
      );

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/users',
        {
          firstName,
          lastName,
          email,
          password
        }
      );

      console.log('Backend response:', response.data);

      setMessage(response.data.message);

      // Update the displayed user list
      setUsers(response.data.users);

      // Clear the form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Submission error:', error);

      setMessage(
        error.response?.data?.message ||
        'Failed to submit. Check whether the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial'
    }}>
      <h1>User Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && (
        <p role="status">{message}</p>
      )}

      <hr />

      <h2>Registered Users</h2>

      <button type="button" onClick={getUsers}>
        Load Users
      </button>

      {users.length === 0 ? (
        <p>Click "Load Users" to display users.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.firstname} {user.lastname} — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
