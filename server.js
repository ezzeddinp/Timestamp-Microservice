// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Timestamp microservice API Endpoint
app.get('/api/:date?', function(req, res) {
    const { date } = req.params;

    if (!date) {
        const currentDate = new Date();
        return res.json({
            unix: currentDate.getTime(),
            utc: currentDate.toUTCString()
        });
    }

    let timestamp;
    if (!isNaN(date)) {
        timestamp = new Date(parseInt(date));
    } else {
        timestamp = new Date(date);
    }

    if (isNaN(timestamp)) {
        return res.json({ error: 'Invalid Date' });
    }
    
    return res.json({
        unix: timestamp.getTime(),
        utc: timestamp.toUTCString()
    });
});

// your frist API Endpoint
app.get('/api/hello', function(req, res) {
    res.json({ greetings: 'hello API' });
});

// listen for requests 
var listener = app.listener(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});