process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require("axios");
const fs = require("fs");
const rds = require("./rds");

async function checkNetwork(msisdn, company, id, req, res) {
    var url = `https://api02.jazzdrive.com.pk/getNetworkAndBalance.php?msisdn=${msisdn}`;
    result = await axios.get(url);
    const obj = {
        status: result.data.status,
        networkType: result.data.networkCode,
    };
    if (obj.status == "error") {
        res.render("EnterNumber", {
            msisdnerror: "For Jazz Users Only",
            type: "error",
        });
    } else {
        networkType = obj.networkType; //Prepaid OR PostPaid
        sendOTP(msisdn, networkType, company, id, req, res);
    }
}

async function sendOTP(msisdn, networkType, company, id, req, res) {
    var otp = Math.floor(1000 + Math.random() * 9000);
    msg = "PIN Code For Bussu is:" + otp;
    var url = `https://pilot.gameland.com.pk/sms.php?msisdn=${msisdn}&message=${msg}`;
    result = await axios.get(url);
    stts = result.data.status;
    //OTP SENT
    if (stts == "success") {
        res.render("OtpVerify", {
            otpsuccess: "OTP Sent",
            msisdn: msisdn,
            networkType: networkType,
            company: company,
            id: id,
        });
        rds.sendOTP(msisdn, otp);
        //Log
        ip = req.connection.remoteAddress;
        rds.eventsOTP(msisdn, "sentOTP", ip);
    }
    //OTP NOT SENT
    else {
        res.render("EnterNumber", {
            msisdnerror: "Error Sending OTP",
            type: "error",
            company: company,
            id: id,
        });
    }
}
async function welcomeSms(msisdn, pckg, price, req, res) {
    msg = `You are successfully subscribed to ${pckg} Plan of Bussu @Rs/${price} plus Tax.To Unsubscribe send UNSUB to 6045`;
    var url = `https://pilot.gameland.com.pk/sms.php?msisdn=${msisdn}&message=${msg}`;
    result = await axios.get(url);
}
async function sendCredentials(msisdn, uname, pwd, req, res) {
    msg = `Credentials For Bussu:\nUser:${uname}\nPassword:${pwd}`;
    var url = `https://pilot.gameland.com.pk/sms.php?msisdn=${msisdn}&message=${msg}`;
    result = await axios.get(url);
    stts = result.data.status;
    if (stts == "success") {
        res.render("Credentials", {
            success: "success",
            uname: uname,
            pwd: pwd,
        });
    } else {
        res.render("EnterNumber", {
            msisdnerror: "Error Sending Credentials",
        });
    }
}

function parseMSISDN(msisdn) {
    var length = msisdn.length;
    if (length >= 10 && length <= 13) {
        if (length == 10 && msisdn[0] == "3") {
            msisdn = "92" + msisdn;
            return msisdn;
        } else if (length == 11 && msisdn.substr(0, 2) == "03") {
            msisdn = "92" + msisdn.substr(1);
            return msisdn;
        } else if (length == 12 && msisdn.substr(0, 3) == "923") {
            return msisdn;
        } else if (length == 13 && substr(msisdn, 0, 4) == "+923") {
            msisdn = msisdn + substr(1);
            return msisdn;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

exports.sendOTP = sendOTP;
exports.sendSMS = sendOTP;
exports.checkNetwork = checkNetwork;
exports.parseMSISDN = parseMSISDN;
exports.sendCredentials = sendCredentials;
exports.welcomeSms = welcomeSms;