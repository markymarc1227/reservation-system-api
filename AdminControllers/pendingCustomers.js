const handlePendingCustomers = (req, res, db) => {
    const { date } = req.params;
    db('requests')
    .where('status', '=','pending')
    .where('reqdate', '=', date)
    .join('users', 'users.user_id', 'requests.user_id')
    .orderBy('reqtime')
    // .returning('*')
    .then(customers => {
      res.json(customers);
    })
    .catch(err => res.status(400).json('cannot get customers'))
  }

module.exports = {
  handlePendingCustomers: handlePendingCustomers
}