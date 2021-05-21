const saltRounds = 10;

const handleUserRegister = (req, res, db, bcrypt) => {
	const { email, password, firstName, lastName, age, gender, contactNum, address} = req.body;
	if (!email || !password || !firstName || !lastName || !age || !gender || !contactNum || !address)
	{
		return res.status(400).json('incorrect form submission');
	}
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				user_email: email
			})
			.into('user_login')
			.returning(['user_email','user_id'])
			.then(loginDetails => {
				return trx('users')
					.returning('*')
					.insert({
						user_email: loginDetails[0].user_email,
						user_id: loginDetails[0].user_id,
						firstname: firstName,
						lastname: lastName,
						age: age,
						gender: gender,
						contact: contactNum,
						address: address
				})
				.then(user => {
					res.json(user[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleUserRegister: handleUserRegister
};