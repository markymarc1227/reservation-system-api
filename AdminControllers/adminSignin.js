const handleAdminSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('admin_email', 'admin_hash', 'admin_id').from('admin_login')
	.where('admin_email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].admin_hash);
			if (isValid) {
					res.json(data[0].admin_id)
			} else {
				res.status(400).json("wrong credentials")
			}

		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleAdminSignin: handleAdminSignin
}