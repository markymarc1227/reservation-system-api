const handleRescheduleCustomer = (req, res, db) => {
    const { req_id, newReqDate, newReqTime, newBarber} = req.body;
    if (!req_id || !newReqDate || !newReqTime || !newBarber) {
      return res.status(400).json('incorrect form submission');
    }
    db('requests')
    .where('req_id', req_id)
    .update({
      reqdate: newReqDate,
      reqtime: newReqTime,
      barber: newBarber,
      status: "rescheduled"
    })
    .returning('*')
    .then(bookingDetails => {
      res.json(bookingDetails[0]);
    })
    .catch(err => res.status(400).json('unable to reschedule request'))
  }

module.exports = {
  handleRescheduleCustomer: handleRescheduleCustomer
}