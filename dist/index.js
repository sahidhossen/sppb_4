const express = require('express')
const path = require('path');
const app = express()

const api = require('./api');

const port = 3000
app.use(express.static(path.join(__dirname, '.')));

app.post('/api', api );

app.get('/', (req, res) => {
    res.sendFile('./builder.html', { root: __dirname });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))