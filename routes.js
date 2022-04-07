var express = require("express");
var router = express.Router();
const jazzsdk = require("./jazzsdk");
const bussusdk = require("./bussusdk");
const rds = require("./rds");
var functions = require("./functions");
var ip = require("ip");

//Landing Page
router.get("/", function(req, res) {
    res.render("LandingPage");
});

router.get("/:id", function(req, res) {
    str = req.params.id;
    company = str.split("=")[0];
    id = str.split("=")[1];
    functions.hitlogs(company, id);
    res.render("LandingPage", {
        company: company,
        id: id,
    });
});
//Enter MSISDN
router.post("/enternumber", function(req, res) {
    company = req.body.company;
    id = req.body.id;
    console.log(company, id);
    res.render("EnterNumber", {
        company: company,
        id: id,
    });
});
//Verify MSISDN
router.post("/numberverify", function(req, res) {
    msisdn = req.body.msisdn;
    company = req.body.company;
    id = req.body.id;
    msisdn = jazzsdk.parseMSISDN(msisdn);
    if (msisdn == null || !msisdn) {
        res.render("EnterNumber", {
            msisdnerror: "Enter Valid MSISDN",
            type: "error",
        });
    } else {
        jazzsdk.checkNetwork(msisdn, company, id, req, res);
    }
});
//Verify OTP
router.post("/otpverify", function(req, res) {
    company = req.body.company;
    id = req.body.id;
    msisdn = req.body.msisdn;
    networkType = req.body.networkType;
    ist = req.body.ist;
    sec = req.body.sec;
    third = req.body.third;
    fourth = req.body.fourth;
    otp = ist + sec + third + fourth;
    result = rds.verifyOTP(msisdn, otp, networkType, company, id, req, res);
});
//Resend OTP
router.post("/resendotp", function(req, res) {
    msisdn = req.body.msisdn;
    networkType = req.body.networkType;
    jazzsdk.sendOTP(msisdn, networkType, company, id, req, res);
});

router.post("/dailypackage", function(req, res) {
    user_status = req.body.user_status;
    pckg = req.body.daily;
    msisdn = req.body.msisdn;
    bussusdk.createSubscription(msisdn, pckg, user_status, req, res);
});
router.post("/weeklypackage", function(req, res) {
    user_status = req.body.user_status;
    pckg = req.body.weekly;
    msisdn = req.body.msisdn;
    bussusdk.createSubscription(msisdn, pckg, user_status, req, res);
});
router.post("/monthlypackage", function(req, res) {
    user_status = req.body.user_status;
    pckg = req.body.monthly;
    msisdn = req.body.msisdn;
    bussusdk.createSubscription(msisdn, pckg, user_status, req, res);
});

//Change Password API
router.put("/renewpassword", function(req, res) {
    msisdn = req.body.msisdn;
    pwd = req.body.password;
    rds.renewPassword(msisdn, pwd, req, res);
});
//Unsub User
router.delete("/unsubuser", function(req, res) {
    msisdn = req.body.msisdn;
    rds.unSubscribeUser(msisdn, req, res);
    //bussusdk.deleteAccount(msisdn, req, res);
});

router.get("*", function(req, res) {
    res.sendFile("views/404.html", { root: __dirname });
});
module.exports = router;