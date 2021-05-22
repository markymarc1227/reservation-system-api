const saltRounds = 10;

const handleAdminRegister = (req, res, db, bcrypt) => {
	const { email, password} = req.body;
	if (!email || !password)
	{
		return res.status(400).json('incorrect form submission');
	}
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	
		db.transaction(trx => {
			trx.insert({
				admin_hash: hash,
				admin_email: email
			})
			.into('admin_login')
			.returning(['admin_id','admin_email'])
			.then(user => {
				res.json(user[0]);
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleAdminRegister: handleAdminRegister
};