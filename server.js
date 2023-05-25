const express = require ("express");

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/ping', (req, res) => {
    console.log('ping');
    res.sendStatus(200);
})

app.listen(PORT, () => {});