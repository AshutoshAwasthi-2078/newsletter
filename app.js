const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email; 

    const data={
        members:[
            {
                email_address :email,
                status :"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsondata = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/d1619c0985";
    const options = {
        method: "POST",
        auth:"ashu2078:67a5bcf64149146ee0329ce9df2a8e71-us6"

    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
        })
    })


    request.write(jsondata);
    request.end();
});
//api -67a5bcf64149146ee0329ce9df2a8e71-us6

//listid-d1619c0985

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 8000,function(){
    console.log("runnning");
})