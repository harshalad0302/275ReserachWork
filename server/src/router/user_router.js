const express = require("express");
const sequelize = require('../db/connection.js');
const users = require('../db_models/users');
const router = new express.Router();
const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');

router.post('/signup', async (req, res) => {
console.log(req.body);
var message = []
let result = {}
var authFlag="S"
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (req.body.emailID === "" || re.test(String(req.body.emailID).toLowerCase()) === false) {
    authFlag = "F"
    message.push("Emailid field is empty or invalid")
  }
  if (req.body.phoneNumber === "") {
    authFlag = "F"
    message.unshift("phone number is blank")
  }
   if (req.body.firstName === "") {
    authFlag = "F"
    message.unshift("First name is blank")
  }
  if (req.body.lastName === "") {
    authFlag = "F"
    message.unshift("Last name is blank")
  }
   if (req.body.password === "") {
    authFlag = "F"
    message.unshift("password is blank")
  }

     if (authFlag !== "F") {
     //data can be inserted
     //check if emailid is already present
     console.log("data can be inserted for ",req.body.emailID);
    const found_data = await users.findOne({ where: { emailID: req.body.emailID } });
          
            if(found_data!==null){
                message.push("Emailid is already present")
                result = {
                    authFlag: "F",
                    message: message,
                    message_length: message.length
                }
                res.status(200).send(result);
                
            }else{
                // //inset data
               // //create hash
              const salt = await bcrypt.genSalt(10);
             const hashPassword = await bcrypt.hash(req.body.password, salt);
                //insert data
                await users.create({ emailID: req.body.emailID, firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, password: hashPassword ,type :"Employee"});
                const data_after_insert = await users.findOne({ where: { emailID: req.body.emailID } });
                message.push("data inserted")
                    result = {
                        authFlag: "S",
                        message: message,
                        message_length: message.length,
                        userID: data_after_insert.userID,
                        firstName: data_after_insert.firstName,
                        lastName: data_after_insert.lastName,
                        emailID: data_after_insert.emailID
                     
                    }
                    res.status(200).send(result);
              
                }
    
     }
    
    else{
         result = {
             authFlag: authFlag,
             message: message,
             message_length: message.length
            }
            res.status(200).send(result);   
    }


});

router.post('/login', async (req, res) => {
console.log(req.body);
var message = []
let result = {}
var authFlag="S"
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (req.body.emailID === "" || re.test(String(req.body.emailID).toLowerCase()) === false) {
    authFlag = "F"
    message.push("Emailid field is empty or invalid")
  }
   if (req.body.password === "") {
    authFlag = "F"
    message.unshift("password is blank")
  }

     if (authFlag !== "F") 
    {

     //check if login is there
        console.log("checking login for",req.body.emailID);
        const found_data_login = await users.findOne({where:{ emailID: req.body.emailID }});
        if(found_data_login){
            //email id is there have to compare password
                const validPassword = await bcrypt.compare(
                req.body.password,
                found_data_login.password
            )
            if(validPassword){
                //password is correct
                message.push("login successfull")
                result = {
                    authFlag: "S",
                    message: message,
                    message_length: message.length,
                    userID: found_data_login.userID,
                    emailID: found_data_login.emailID,
                    firstName: found_data_login.firstName,
                    lastName: found_data_login.lastName,
                    type: found_data_login.type               
                }
                res.status(200).send(result);
          }
        else{
            authFlag = "F"
                message.push("Incorrect Password")
                    result = {
                    authFlag: authFlag,
                    message: message,
                    message_length: message.length
                    }
            res.status(200).send(result);   
            }

        }
    }

     else{
            result = {
                authFlag: authFlag,
                message: message,
                message_length: message.length
                }
            res.status(200).send(result);   
     }


});

//getDetails to get the deatisl of user currently unused

router.post('/getDetails', async (req, res) => {
console.log("getDetails ----------",req.body);
var message = []
let result = {}
var authFlag="S"
if(req.body.userID === ""){
    authFlag = "F"
    message.push("userID is blank")
    result = {
                authFlag: authFlag,
                message: message,
                message_length: message.length
                }
            res.status(200).send(result);  

}else{
    //get details
    const found_data = await users.findOne({ where: { userID: req.body.userID } });
    if(found_data){
        message.push("data found")
        result = {
            authFlag: "S",
            message: message,
            message_length: message.length,
            userID: found_data.userID,
            emailID: found_data.emailID,
            firstName: found_data.firstName,
            lastName: found_data.lastName,
            phoneNumber: found_data.phoneNumber,
            type: found_data.type
        }
        res.status(200).send(result);
    }else{
        authFlag = "F"
        message.push("data not found")
        result = {
            authFlag: authFlag,
            message: message,
            message_length: message.length
        }
        res.status(200).send(result);
    }

}
});

module.exports = router
