const express = require('express')
const router = express.Router()
const {get,post} = require('../controllers/webhook-controllers')

router.get('/',get)
router.post('/webhook',post)

module.exports = router
