const express = require('express')
const router = express.Router()

router.post('/save', function(req, res, next) {
	try {
		// throw new Error('Icon is null ')
		
		res.status(200).send({
			success: true,
			message: 'save successfull!'
		})
	} catch (e) {
		res.status(200).send({ success: false, message: e })
	}
})

module.exports = router;