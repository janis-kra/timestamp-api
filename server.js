const express = require('express');
const app = express();

var isNaturalLanguageDate = function (candidate) {
    return false;
}

var isUnixDate = function (candidate) {
    return false;
}

var createNaturalDate = function (date) {
    return new Date(date);
}

var createUnixTimestamp = function (date) {
    return new Date(date);
}

app.get('/', function(req, res) {
    res.send('Timestamp Microservice - Do a GET call with a timestamp parameter to try it!');
});

app.get('/:timestamp', function (req, res) {
    var unixDate, naturalDate;
    var t = req.params.timestamp;
    if (isNaturalLanguageDate(t)) {
        naturalDate = t;
        unixDate = createUnixTimestamp(t);
    } else if (isUnixDate(t)) {
        unixDate = t;
        naturalDate = createNaturalDate(t);
    } else {
        unixDate = naturalDate = null;
    }
    res.send({ unix: unixDate, natural: naturalDate });
});

app.listen(process.env.PORT, function () {
   console.log('Timestamp Microservice running on port ' + process.env.PORT); 
});
