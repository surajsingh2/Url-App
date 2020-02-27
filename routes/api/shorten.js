const express = require('express');
const router = express.Router();
const ShortUniqueId = require('short-unique-id')

const uid = new ShortUniqueId();


const URL = require('../../models/urls')

router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})
//Test Api
router.get('/test', (req,res) => res.json({msg: 'API IS WORKING'}))

//Post api/shorten

router.post('/',(req,res) => {
    console.log(req.body)
    if(req.body.url) {
        urlData = req.body.url;
    }
    console.log("URL is:",urlData)
    console.log("PORT IS:",process.env.PORT)
    URL.findOne({url: urlData}, (err,doc) => {
        if(err) {
            console.log(err)
        }
        else if(doc) {
            console.log("Entry Found in Db",doc)
            res.send({
                url: doc.url,
                hash: doc._id,
                status:400,
                statusTxt:'Already Exists'
            })

            //if found in db also get the hash
        } else {
            console.log("New Entry")
            const webaddress = new URL({
                _id: uid.randomUUID(5),
                url: urlData
            })
            webaddress.save((err)=> {
                if(err) {
                    return console.error(err)
                } 
                res.send({
                    url: urlData,
                    hash: webaddress._id,
                    status: 200,
                    statusTxt: 'OK'
                })
            })
        }
    })

});

module.exports = router