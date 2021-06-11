const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const userRegister = require('./UserControllers/userRegister');
const userSignin = require('./UserControllers/userSignin');
const userRefresh = require('./UserControllers/userRefresh');
const userBookingRequest = require('./UserControllers/userBookingRequest');
const userReschedule = require('./UserControllers/userReschedule');
const userReschedConfirm = require('./UserControllers/userConfirmResched');
const userCancel = require('./UserControllers/userCancelRequest');
const userChecklist = require('./UserControllers/userSubmitChecklist');


// const adminRegister = require('./AdminControllers/adminRegister');
const adminSignin = require('./AdminControllers/adminSignin');

const schedCustomers = require('./AdminControllers/schedCustomers');
const doneCustomer = require('./AdminControllers/doneCustomer');
const cancelCustomer = require('./AdminControllers/cancelCustomer');

const pendingCustomers = require('./AdminControllers/pendingCustomers');
const approveRequest = require('./AdminControllers/approveCustomer');
const rescheduleRequest = require('./AdminControllers/rescheduleCustomer');

const completedCustomers = require('./AdminControllers/completedCustomers');

//Fixes the date formatting issues when fetching from pg database.
const { types } = require('pg');
const TYPE_DATESTAMP = 1082;
types.setTypeParser(TYPE_DATESTAMP, date => date);


const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
    }
  }
});


const app = express();

app.use(express.json());
app.use(cors());

//User Endpoints
app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { userSignin.handleUserSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { userRegister.handleUserRegister(req, res, db, bcrypt) })
app.post('/refresh', (req, res) => { userRefresh.handleUserRefresh(req, res, db) })
app.post('/bookingrequest', (req, res) => { userBookingRequest.handleBookingRequest(req, res, db) })
app.put('/reschedule', (req, res) => { userReschedule.handleUserReschedule(req, res, db) })
app.put('/confirm', (req, res) => { userReschedConfirm.handleConfirmResched(req, res, db) })
app.put('/cancel', (req, res) => { userCancel.handleCancelRequest(req, res, db) })
app.post('/checklist', (req, res) => { userChecklist.handleChecklist(req, res, db) })

// app.post('/adminregister', (req, res) => {adminRegister.handleAdminRegister(req, res, db, bcrypt) })
app.post('/adminsignin', (req, res) => {adminSignin.handleAdminSignin(req, res, db, bcrypt)})

//AdminSchedule
app.get('/schedCustomers/:date', (req, res) => {schedCustomers.handleSchedCustomers(req, res, db)})
app.put('/customerdone', (req, res) => {doneCustomer.handleDoneCustomer(req, res, db)})
app.put('/cancelcustomer', (req, res) => {cancelCustomer.handleCancelCustomer(req, res, db)})

//AdminRequests
app.get('/pendingCustomers/:date', (req, res) => {pendingCustomers.handlePendingCustomers(req, res, db)})
app.put('/approveRequest', (req, res) => {approveRequest.handleApproveCustomer(req, res, db)})
app.put('/rescheduleRequest', (req, res) => {rescheduleRequest.handleRescheduleCustomer(req, res, db)})

//AdminCompleted
app.get('/completedCustomers/:date', (req, res) => {completedCustomers.handleCompletedCustomers(req, res, db)})



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})


