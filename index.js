
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory user data
let users = [
  {
    firstname: 'sajib',
    lastname: 'khan',
    email: 'sajib@example.com'
  },
  {
    firstname: 'pial',
    lastname: 'hasan',
    email: 'pial@example.com'
  },
  {
    firstname: 'salman',
    lastname: 'farshi',
    email: 'salman@example.com'
  }
];

// Home route
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
  console.log('POST request received');
  console.log('Received data:', req.body);

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: 'Please fill in all fields.'
    });
  }

  const newUser = {
    firstname: firstName,
    lastname: lastName,
    email: email
  };

  // Add user to the temporary array
  users.push(newUser);

  console.log('New user added:', newUser);

  res.status(201).json({
    message: 'User added successfully!',
    user: newUser,
    users: users
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
