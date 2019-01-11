'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const addMarketerRoutes = require('./routes/marketer-route'); //Api routing

addMarketerRoutes(app);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Port ${PORT} is online`));
