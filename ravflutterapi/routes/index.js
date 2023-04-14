const express = require('express')
const router = express.Router()
const actions = require('../methods/actions')

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/adduser', actions.addNew)
router.post('/auth', actions.auth)
router.get('/getinfo', actions.getinfo)

module.exports = router