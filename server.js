const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

const items = require('./routes/api/items');



const app = express();

//Boduparser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));
//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('connected'))
    .catch(err => console.log(err))

//Use Routes
app.use('/api/items', items)

// Serve static assets if in production
if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req ,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));