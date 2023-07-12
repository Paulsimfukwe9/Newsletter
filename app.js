//jshint esversion:6

  const express = require("express");
  const bodyParser = require("body-Parser");
  const https = require("https");
  //const request = require("request");

  const app = express();

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended:true}));

  app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
  })


  app.post("/",function(req,res){

      const firstName = req.body.fName
      const lastName = req.body.lName
      const email = req.body.email

      const data = {
        members:[
          {
            email_address: email,
            status: "subscribed",
            merge_fields:{
              FNAME:firstName,
              LNAME:lastName
            }
          }
        ]
      };

      const jsonData = JSON.stringify(data);

      const url = "https://us21.api.mailchimp.com/3.0/lists/cdf44bdfba";

      const options = {
        method:"POST",
        auth: "paul9:d37337eb78990512c97a463ff38238e1-us21"
      }
      const request = https.request(url, options, function(response){

          if(response.statusCode === 200){
            res.sendFile(__dirname + "/succes.html");
          }else{
            res.sendFile(__dirname + "/failure.html");
          }

          response.on("data", function(data){
          console.log(JSON.parse(data));
        })
      })

      request.write(jsonData);
      request.end()
  })

    app.post("/failure", function(req,res){
      res.redirect("/");
    });


    app.listen(3000, function(){
      console.log("Server is running on port 3000");
    })


//MailChimp API apiKey
//d37337eb78990512c97a463ff38238e1-us21

//Audience or list // ID
// cdf44bdfba
