var express = require("express");
var router = express.Router();
const jazzsdk = require("./jazzsdk");
const bussusdk = require("./bussusdk");
const rds = require("./rds");

//Landing Page
router.get("/", function(req, res) {
    res.render("LandingPage");
});
//Enter MSISDN
router.get("/enternumber", function(req, res) {
    res.render("EnterNumber");
});
//Verify MSISDN
router.post("/numberverify", function(req, res) {
    msisdn = req.body.msisdn;
    msisdn = jazzsdk.parseMSISDN(msisdn);
    if (msisdn == null || !msisdn) {
        res.render("EnterNumber", {
            msisdnerror: "Enter Valid MSISDN",
            type: "error",
        });
    } else {
        jazzsdk.checkNetwork(msisdn, req, res);
    }
});
//Verify OTP
router.post("/otpverify", function(req, res) {
    msisdn = req.body.msisdn;
    networkType = req.body.networkType;
    ist = req.body.ist;
    sec = req.body.sec;
    third = req.body.third;
    fourth = req.body.fourth;
    otp = ist + sec + third + fourth;
    result = rds.verifyOTP(msisdn, otp, networkType, req, res);
});
//Resend OTP
router.post("/resendotp", function(req, res) {
    msisdn = req.body.msisdn;
    networkType = req.body.networkType;
    jazzsdk.sendOTP(msisdn, networkType, req, res);
});

router.post("/dailypackage", function(req, res) {
    pckg = req.body.daily;
    msisdn = req.body.msisdn;
    bussusdk.createSubscription(msisdn, pckg, req, res);
});
router.post("/weeklypackage", function(req, res) {
    pckg = req.body.weekly;
    msisdn = req.body.msisdn;
    bussusdk.createSubscription(msisdn, pckg, req, res);
});
router.post("/monthlypackage", function(req, res) {
    pckg = req.body.monthly;
    msisdn = req.body.msisdn;
    bussusdk.createSubscription(msisdn, pckg, req, res);
});

//Change Password API
router.get("/renewpassword", function(req, res) {
    msisdn = req.body.msisdn;
    pwd = req.body.password;
    rds.renewPassword(msisdn, pwd, req, res);
});

router.get("*", function(req, res) {
    res.sendFile("views/404.html", { root: __dirname });
});
module.exports = router;