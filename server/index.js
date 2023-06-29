const express = require('express');
const app = express();

// middleware //
const checkAdmin = require('./middleware/checkAdmin');
const authorization = require('./middleware/authorization');

// routers //
const usersRouter = require('./routes/users');
const authentication = require('./routes/authentication');
const scheduleRouter = require('./routes/schedule');
const is_admin = require('./routes/is_admin');
const adminPanel = require('./routes/adminPanel');

const cors = require('cors');

app.use(express.json());
app.use(cors());

// ROUTES //
app.use('/api/v1/users',authorization, usersRouter);
app.use('/api/v1/auth',authentication);
app.use('/api/v1/schedule', authorization, scheduleRouter);
app.use('/api/v1/is_admin', authorization, is_admin);
app.use('/api/v1/adminPanel', authorization, checkAdmin, adminPanel);


app.listen(5000, () => {
    console.log('server running on port 5000...');
});