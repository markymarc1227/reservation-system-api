const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const userRegister = require('./UserControllers/userRegister');
const userSignin = require('./UserControllers/userSignin');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'reservationdb'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { userRegister.handleUserSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleUserRegister(req, res, db, bcrypt) })


app.listen(3000, () => {
	console.log('app is running on port 3000');
})



