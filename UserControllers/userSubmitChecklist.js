const handleChecklist = (req, res, db) => {
	const {req_id, sorethroat, bodypain, headache, fever, closecovid, contactwsick, travelledoutcountry, travelledncr} = req.body;
	if (!req_id)
	{
		return res.status(400).json('incorrect form submission');
	}

		db.transaction(trx => {
			trx.insert({
				req_id: req_id,
				sorethroat: sorethroat,
                bodypain: bodypain,
                headache: headache,
                fever: fever,
                closecovid: closecovid,
                contactwsick: contactwsick,
                travelledoutcountry: travelledoutcountry,
                travelledncr: travelledncr,
                confirmed: true
			})
			.into('healthchecklist')
			.returning('req_id')
			.then(req_id => {
				return trx('requests')
                    .returning('*')
                    .where('req_id', '=', req_id[0])
					.update({
						status: "confirmed"
				})
				.then(user => {
					res.json(user[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to submit checklist'))
}

module.exports = {
    handleChecklist: handleChecklist
};