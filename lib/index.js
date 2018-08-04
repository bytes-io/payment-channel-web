const express = require('express');
const path = require('path');

const paymentChannelArtifact = require('../build/contracts/PaymentChannel.json');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index', { paymentChannelArtifact }));

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000!'));
