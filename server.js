const express = require('express');
const mongoose = require('mongoose');

const path = require('path')
const config = require('config');



const app = express();

//Boduparser middleware
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));
//DB config
const db = config.get('mongoURL');

//connect to mongo
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    })
    .then(() => console.log('connected'))
    .catch(err => console.log(err))

//Use Routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))


// Serve static assets if in production
if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req ,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));