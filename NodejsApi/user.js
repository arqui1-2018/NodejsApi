const { Router } = require('express');
const pool = require('./db');
const nodemailer = require('nodemailer');
//const { hash, Session } = require('./helper');

const router = new Router();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'arqui1g2.2018@gmail.com',
         pass: 'arquitectura1Grupo2'
     }
 });
 const mailOptions = {
  from: 'arqui1g2.2018@gmail.com', // sender address
  to: 'lestersantos271@gmail.com', // list of receivers
  subject: 'pruebaGmail', // Subject line
  html: '<p>fotografía modulo de seguridad Arqui 1</p>'// plain text body
};
router.get('/getsecurity', (req, res, next) => {
  console.log('req.body sd', req.body);
  const db = req.db;
  
  /*db.collection('Account').select([
      { name: req.query.id, balance: 5 },
      { name: 'B', balance: 10 }

      I
  ]);*/

  db.collection('sensor').find().toArray(function(e, d) {
    res.json(d);
    //db.close();
  });
 
});

router.get('/security', (req, res, next) => {
  console.log('req.body sd', req.body);
  const db = req.db;
  
  db.collection('Account').insertMany([
      { name: req.query.id, balance: 5 },
      { name: 'B', balance: 10 }

      
  ]);

 /* db.collection('sensor').find().toArray(function(e, d) {
    res.json(d);
    db.close();
  });*/
 
});

router.post('/postsecurity', (req, res, next) => {
  console.log('req.body sd', req.body);
  const db = req.db;
  var myquery = { id: '19c2239a-2f29-fb45-e926-70efd60d404d' };
  var newvalues = { $set: {status: req.body.status} };
  db.collection('sensor').updateOne(myquery,newvalues, function(e, d){
    if (e) throw e;
    console.log("1 document updated");
    res.json(d);
    //db.close();
  });
  
  /*db.collection('sensor').find().toArray(function(e, d) {
    
    db.close();
  });*/
  //res.json(req.body);
});

router.post('/sendPicture', (req, res, next) => {
    console.log('req.body sd', req.body);
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
   res.json(req.body);
  /* pool.query(
    'SELECT * FROM users WHERE username_hash = $1',
    [username_hash],
    (q0_err, q0_res) => {
      if(q0_err) return next(q0_err);

      if(q0_res.rows.length === 0){
        //Insert new username
        pool.query(
          'INSERT INTO users(username_hash, password_hash) VALUES($1, $2)', 
          [username_hash, hash(password)], 
          (q1_err, q1_res) => {
            if(q1_err) return next(q1_err);
            
            //Set cookie
            set_session(username, res).then(() => {
              res.json({
                msg: 'Succesfully created user!'
              });
            })
            .catch(error => next(error));
          }
        )
      }else{
        res.status(409).json({
          type: 'error',
          msg: 'This username has been taken'
        });
      }
    }
  ) */
  
});

    

module.exports = router;