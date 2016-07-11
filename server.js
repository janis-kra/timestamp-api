const express = require('express');
const app = express();

const naturalRegexp = /^[A-z]*\s([1-9]|[12][1-9]|30|31),\s(19|20)\d\d$/;
const monthRegexp = /^[A-z]*/;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var isNaturalLanguageDate = function (candidate) {
    var is;
    if (naturalRegexp.test(candidate)) {
        const month = monthRegexp.exec(candidate)[0];
        is = months.some(function (m) {
           return m === month; 
        });
    } else {
        is = false;
    }
    return is;
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
