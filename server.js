const express = require('express');
// const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

//database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// cookie parser
// app.use(cookieParser());

app.get('/', (req, res) => res.send('Welcome to Cgpa Analyzer...'));

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/results', require('./routes/results'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/semester', require('./routes/semester'));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
