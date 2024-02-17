const express = require('express');
const app = express();
const tasks = require('./routes/task');
const pool = require('./db/connect'); 
require('dotenv').config();

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Task manager");
});

app.use('/api/v1/user', tasks);

const port = 3000;

const start = async () => {
    try {
        // No need to explicitly connect, just use the exported pool
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

start();
