const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json({ strict: false }));
// app.use(bodyParser.urlencoded({extented:true}));
app.use(express.urlencoded({ extented: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/user',require('./routes/user.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));

module.exports = app;
