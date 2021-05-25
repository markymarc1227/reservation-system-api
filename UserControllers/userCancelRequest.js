const handleCancelRequest = (req, res, db) => {
    const { user_id, req_id} = req.body;
    if (!user_id || !req_id) {
      return res.status(400).json('incorrect form submission');
    }
    db('requests')
    .where('req_id', req_id)
    .update({
      status: "cancelled"
    })
    .returning('*')
    .then(bookingDetails => {
      res.json({
        req_id: bookingDetails[0].req_id,
      });
    })
    .catch(err => res.status(400).json('unable to confirm request'))
  }

module.exports = {
  handleCancelRequest: handleCancelRequest
}