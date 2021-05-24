const handleUserReschedule = (req, res, db) => {
    const { user_id, req_id, newDate, newTime, newBarber} = req.body;
    if (!user_id || !req_id || !newDate || !newTime || !newBarber) {
      return res.status(400).json('incorrect form submission');
    }
    db('requests')
    .where('req_id', req_id)
    .update({
      reqdate: newDate,
      reqtime: newTime,
      barber: newBarber,
      status: "pending"
    })
    .returning('*')
    .then(bookingDetails => {
      res.json(bookingDetails[0]);
    })
    .catch(err => res.status(400).json('unable to reschedule request'))
  }

module.exports = {
    handleUserReschedule: handleUserReschedule
}