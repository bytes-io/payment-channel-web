const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { signPayment } = require('./payment-channel.service');
const paymentChannelArtifact = require('../build/contracts/PaymentChannel.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '512kb' }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index', { paymentChannelArtifact }));
app.get('/sign-payment', (req, res) => {
  signPayment(req.query.contractaddress, req.query.amount, req.query.address)
    .then(message => res.json({ message }));
});

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000!'));
