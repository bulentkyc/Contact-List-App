const express = require('express');
const app = express();
const port = 3000;

app.set('views', __dirname + '/view');
app.set('view engine', 'pug');

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(port, ()=>{`Server started on port: ${port}`});
