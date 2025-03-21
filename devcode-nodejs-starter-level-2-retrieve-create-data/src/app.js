require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const { CONTACTS } = require('./contact');

const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello world' });
});

// get all contacts
app.get('/contacts', (req, res) => {
    // TODO: ambil semua data kontak dari variabel CONTACTS

    res.json({ status: 'Success', data: [] });
});

// create contact
app.post('/contacts', (req, res) => {
    // get data from request body
    const { full_name, phone_number, email } = req.body;

    // TODO: simpan data dari request body kedalam variabel CONTACTS

    res.json({ status: 'Success', message: 'Contact created', data: {} });
});

// 404 endpoint middleware
app.all('*', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'An error occurred.',
    });
});

app.listen(port);
console.log(`Server run on http://${host}:${port}/`);
