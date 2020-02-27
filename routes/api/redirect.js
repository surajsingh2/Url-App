const express = require('express')
const router = express.Router()

const URL = require('../../models/urls')

router.get('/', (req,res) => {
    const hash = req.headers.hash

    URL.findOne({_id: hash})
     .then((doc)=> {
         return res.json({url: doc.url})
     })
     .catch((err)=> {
         return res.status(400).json({error: 'Sorry, this link may have expired'})
     })
})

module.exports = router;