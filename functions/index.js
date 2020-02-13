const functions = require('firebase-functions');
const express = require('express');
const app = express();
var resData = require('./modules/get-firebase-data');

app.get('/', (req, res) => {
    res.redirect('/production');
})

app.get('/production', (req,res) => {
    res.sendFile('/production/index.html', {root: __dirname})
});

app.get('/sap-data-redirect', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    resData.get();
    res.send(JSON.stringify(resData.data));
})

app.get('*', (req, res) =>{ res.render('404', { title: 'Page Not Found'}); });




exports.app = functions.https.onRequest(app);
