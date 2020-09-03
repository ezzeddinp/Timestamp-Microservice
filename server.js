const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Root endpoint. Display index file
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

// Handle returning a timestamp
app.get('/api/timestamp/:date?', (req, res) => {
    // Store our date response. This will default to the current datetime
    let date = new Date();

    // Check if the optional date parameter was provided
    if (req.params.date) {
        // TODO: Handle the date parameter
        res.json({ message: 'Date parameter passed', date: req.params.date });
    }

    // Return the unix and UTC time
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Create a listener to handle requests
const listener = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener.address().port));
