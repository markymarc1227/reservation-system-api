const handleConfirmResched = (req, res, db) => {
    const { user_id, req_id} = req.body;
    if (!user_id || !req_id) {
      return res.status(400).json('incorrect form submission');
    }
    db('requests')
    .where('req_id', req_id)
    .update({
      status: "checked"
    })
    .returning('*')
    .then(bookingDetails => {
      res.json(bookingDetails[0]);
    })
    .catch(err => res.status(400).json('unable to confirm request'))
  }

module.exports = {
  handleConfirmResched: handleConfirmResched
}