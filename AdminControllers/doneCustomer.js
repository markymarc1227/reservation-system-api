const handleDoneCustomer = (req, res, db) => {
    const {req_id} = req.body;
    if (!req_id) {
      return res.status(400).json('incorrect form submission');
    }
    db('requests')
    .where('req_id', req_id)
    .update({
      status: "completed"
    })
    .returning('*')
    .then(bookingDetails => {
      res.json(bookingDetails[0]);
    })
    .catch(err => res.status(400).json('unable to complete customer'))
  }

module.exports = {
    handleDoneCustomer: handleDoneCustomer
}