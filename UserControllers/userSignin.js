const handleUserSignin = (req, res, db, bcrypt) => {
	const { signInEmail, signInPassword } = req.body;
	if (!signInEmail || !signInPassword) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('user_id', 'user_email', 'hash').from('user_login')
	.where('user_email', '=', req.body.signInEmail)
		.then(data => {
			const isValid = bcrypt.compareSync(signInPassword, data[0].hash);
			if (isValid) {
				db.select('*').from('requests').where('user_id', '=', data[0].user_id)
				.then(row => {
					if (row.length === 0){
						return db.select('*').from('users').where('user_id',  '=', data[0].user_id)
					} 
					return db('users').join('requests', 'users.user_id', 'requests.user_id')
					.select('*').where('requests.user_id', '=', data[0].user_id)
					.orderBy('requests.req_id', 'desc')
				})
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json("wrong credentials")
			}

		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleUserSignin: handleUserSignin
}