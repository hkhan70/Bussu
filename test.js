var axios = require("axios");
var querystring = require("querystring");
const var_dump = require("var_dump");
const date = require("date-and-time");
var md5 = require("md5");
const rds = require("./rds");
const bussusdk = require("./bussusdk");
const msc_db = require("./msc_db");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017";

// var obj = {};
// var postData = querystring.stringify({
//     user_identifier: 923315701405,
//     operator: "jazz",
// });

// let axiosConfig = {
//     headers: {
//         Authorization: "35ad97b75c9040c385ae603f733dc089",
//     },
// };

// axios
//     .post("https://partners.busuu.com/jazz/registration", postData, axiosConfig)
//     .then((response) => {
//         // obj["user"] = res.data.username;
//         // obj["password"] = res.data.password;
//         console.log("RESPONSE RECEIVED: ", response.data);
//     })
//     .catch((err) => {
//         console.log(err.response.data);
//     });
//=============================================================================================//
// var postData = querystring.stringify({
//     user_identifier: 923315701354,
//     operator: "jazz",
//     sku: "jazz-sku-1-month",
//     operation: "subscribe",
// });

// let axiosConfig = {
//     headers: {
//         Authorization: "35ad97b75c9040c385ae603f733dc089",
//     },
// };
// axios
//     .post("https://partners.busuu.com/jazz/notification", postData, axiosConfig)
//     .then((res) => {
//         console.log("Success: ", res.response.data);
//     })
//     .catch((err) => {
//         console.log("Error", err.response.data);
//     });
//=======================================================================================//
// var postData = querystring.stringify({
//     user_identifier: 923315701454,
//     operator: "jazz",
// });

// let axiosConfig = {
//     headers: {
//         Authorization: "35ad97b75c9040c385ae603f733dc089",
//     },
// };

// axios
//     .delete("https://partners.busuu.com/jazz/registration", postData, axiosConfig)
//     .then((res) => {
//         console.log("RESPONSE RECEIVED: ", res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//-----------------------------------------------------------------------------------------------------//

// var nodemailer = require("nodemailer");
// var fs = require("fs");

// var date = new Date().toISOString().slice(0, 10);
// function sendmail() {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "hkhan7017@gmail.com",
//       pass: "",
//     },
//   });
//   var otp = Math.floor(Math.random() * 100000);
//   var mailOptions = {
//     from: "Switch Solutions'khan7017@gmail.com",
//     to: "hkhan7017@gmail.com",
//     subject: "MYSQL File",
//     text:
//       "Enter OTP:" +
//       otp +
//       "\n" +
//       "\n" +
//       "If you find this email wrong inform us",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }
// sendmail();

// function checkNetwork(msisdn, req, res) {
//     var url =
//         "https://api02.jazzdrive.com.pk/getNetworkAndBalance.php" +
//         "?msisdn=" +
//         msisdn;
//     axios
//         .get(url)
//         .then((response) => {
//             if (response.data.status == "error") {
//                 res.render("EnterNumber", {
//                     error: "Only For Jazz User",
//                 });
//             } else {
//                 const now = new Date();
//                 var datetime = date.format(now, "YYYY/MM/DD HH:mm:ss");
//                 var balance = response.data.balance / 100;
//                 data = datetime + " " + msisdn + " " + balance + "\n";
//                 fs.appendFile("files/log.txt", data, function(err) {
//                     if (err) throw err;
//                     console.log("Saved!");
//                 });
//                 //mongo.mongouser(msisdn, balance);
//                 //mysql.mysqluser(msisdn, balance);
//                 res.render("OtpVerify", { otp: balance });
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//             res.render("EnterNumber", {
//                 error: error,
//             });
//         });
// }

// function mongouser(msisdn, balance) {
//     subId = md5(msisdn);
//     timestamp = new Date().toISOString().split("/").join("-");
//     MongoClient.connect(url, function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("jdportal");
//       var myobj = {
//         name: "Hamza",
//         msisdn: msisdn,
//         subId: subId,
//         balance: balance,
//         timestamp: timestamp,
//       };
//       dbo.collection("user").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted Mongo");
//         db.close();
//       });
//     });
//   }