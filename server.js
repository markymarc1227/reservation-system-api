const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const userRegister = require('./UserControllers/userRegister');
const userSignin = require('./UserControllers/userSignin');
const userBookingRequest = require('./UserControllers/userBookingRequest');
const userReschedule = require('./UserControllers/userReschedule');

const adminRegister = require('./AdminControllers/adminRegister');
const adminSignin = require('./AdminControllers/adminSignin');

//Fixes the date formatting issues when fetching from pg database.
const { types } = require('pg');
const TYPE_DATESTAMP = 1082;
types.setTypeParser(TYPE_DATESTAMP, date => date);

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'reservationdb'
  }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { userSignin.handleUserSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { userRegister.handleUserRegister(req, res, db, bcrypt) })
app.post('/bookingrequest', (req, res) => { userBookingRequest.handleBookingRequest(req, res, db) })
app.put('/reschedule', (req, res) => { userReschedule.handleUserReschedule(req, res, db) })
// app.put('/confirm', (req, res) => { userReschedule.handleUserReschedule(req, res, db) })
// app.delete('/cancel', (req, res) => { userReschedule.handleUserReschedule(req, res, db) })

// app.post('/adminregister', (req, res) => {adminRegister.handleAdminRegister(req, res, db, bcrypt) })
app.post('/adminsignin', (req, res) => {adminSignin.handleAdminSignin(req, res, db, bcrypt)})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})



