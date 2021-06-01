const handleCompletedCustomers = (req, res, db) => {
    const { date } = req.params;
    db('requests')
    .where('status', '=','completed')
    .where('reqdate', '=', date)
    .join('users', 'users.user_id', 'requests.user_id')
    .join('healthchecklist', 'healthchecklist.req_id', 'requests.req_id')
    .orderBy('reqtime')
    // .returning('*')
    .then(customers => {
      res.json(customers);
    })
    .catch(err => res.status(400).json('cannot get completed customers'))
  }

module.exports = {
  handleCompletedCustomers: handleCompletedCustomers
}