const express = require('express');
const app = express();
const user = require('./user.json');
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.send('This is home router');
});

// return all details of user in JSON format
router.get('/profile', (req,res) => {
  res.json(user);
  res.send('This is profile router');
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if(username == user.username && password == user.password){
      res.send({
          status: true,
          message: "User Is valid"
      })
  } else if(username != user.username){
      res.send({
          status: false,
          message: "User Name is invalid" })
  } else if(password != user.password){
      res.send({
          status: false,
          message: "Password is invalid" })
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  const username = req.params.username;

  if (user.username == username){
      res.send(`<b>${username} successfully logout.<b>`);
  } else {
      res.send(`<b>${username} not found.</b>`);
  }
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));