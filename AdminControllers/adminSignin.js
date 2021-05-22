const handleAdminSignin = (req, res, db, bcrypt) => {
	const { adminEmail, adminPassword } = req.body;
	if (!adminEmail || !adminPassword) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('admin_email', 'admin_hash', 'admin_id').from('admin_login')
	.where('admin_email', '=', req.body.adminEmail)
	.then(data => {
		const isValid = bcrypt.compareSync(adminPassword, data[0].admin_hash);
		if (isValid) {
				res.json({
					admin_id : data[0].admin_id,
					admin_email: data[0].admin_email
				})
		} else {
			res.status(400).json("wrong credentials1")
		}

	})
	.catch(err => res.status(400).json('wrong credentials2'))
}

module.exports = {
    handleAdminSignin: handleAdminSignin
}