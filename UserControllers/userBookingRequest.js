const handleBookingRequest = (req, res, db) => {
    const { user_id, service, resDate, resTime, barber} = req.body;
    if (!user_id || !service || !resDate || !resTime || !barber) {
      return res.status(400).json('incorrect form submission');
    }
    db('requests')
    .returning('*')
    .insert({
      user_id: user_id,
      service: service,
      reqdate: resDate,
      reqtime: resTime,
      barber: barber,
      status: "pending"
    })
    .then(bookingDetails => {
      res.json(bookingDetails[0]);
    })
    .catch(err => res.status(400).json('unable to book request'))
  }

module.exports = {
    handleBookingRequest: handleBookingRequest
}