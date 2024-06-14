const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = 5000;

const app = express();

//parser
app.use(express.json());

//to allow cross origin resourcce sharing from client
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//secret key for encrypting
const SECRET_KEY = 'the_moon_devs';

// demo data of users
const users = [
    { id: 1, username: 'huhrsh', password: 'password', email: 'harshj2010@gmail.com' },
];

// endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });

// endpoint to get user data, which is protected using middleware
app.get('/api/me', authenticate, (req, res) => {
    res.json(req.user);
});

// middleware for authentication
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

// middleware to handle errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Invalid token' });
    } else {
        next(err);
    }
});

// start the server
app.listen(port, () => {
    console.log('Server listening on port:', port);
});
