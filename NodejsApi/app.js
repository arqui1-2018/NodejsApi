
const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const cors = require('cors');
const user = require('./user');
const expressMongoDb = require('express-mongo-db');
const url = 'mongodb://arqui1db-2018:jY4INnddURHmEEJDL05qGHEYGZVQgGvf4EmomytTCqhf3wsxhuxbUPN9CJAzkJWyKvt9MLrfx1TOdxOwhNT1Xw%3D%3D@arqui1db-2018.documents.azure.com:10255/?ssl=true';
const app = express();
const port = process.env.PORT || 3000;



app.use(bodyParser.json());
//app.use(cookieParser());
app.use(expressMongoDb(url));
app.use(cors());
app.use('/user', user);

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  
  res.status(err.statusCode).json({ 
    type: 'error',
    msg: err.message
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));

//module.exports = app;