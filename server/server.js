const express = require('express');
const morgan = require('morgan');
const routes = require('./routes')

const app = express();

app.use(express.static('client'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use('/api', routes);



app.listen(3000, () => console.log('Server running: 3000')); 