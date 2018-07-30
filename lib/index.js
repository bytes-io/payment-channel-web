const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000!'));
