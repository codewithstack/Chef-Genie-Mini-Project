const express = require('express');
const app = express();
const path = require('path');
const port = 8082;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/images')));


app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/error', (req, res) => {
    res.render('error.ejs');
});

app.get('/thank', (req, res) => {
    res.render('thankyou.ejs');
});
