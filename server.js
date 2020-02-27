/* eslint-disable no-console */
const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { join } = require("path");
const morgan = require("morgan");
const app = express();

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



//Database Key
const db = require('./config/keys').mongoURI

//Connect DB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(()=> console.log("CONNECTED TO DATABASE."))
    .catch(err=> console.log(err))

//Routes
const shorten = require('./routes/api/shorten')
app.use('/api/shorten',shorten)

const redirect = require('./routes/api/redirect')
app.use('/api/redirect',redirect)

app.get('/:hash', (req,res)=> {
    const id = req.params.hash
    URL.findOne({_id:id}, (err,doc)=> {
        if(doc) {
            console.log(doc.url)
            res.redirect(doc.url)
        } else {
            res.redirect('/');
        }
    })
});


const port = process.env.SERVER_PORT || 5000;

app.use(morgan("dev"));
app.use(express.static(join(__dirname, "build")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
