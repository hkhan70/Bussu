var mysql = require("mysql");
const date = require("date-and-time");
const isset = require("isset");
const jazzsdk = require("./jazzsdk");
const bussusdk = require("./bussusdk");
const msc_db = require("./msc_db");
const fs = require("fs");

var con = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "bussu",
});

function sendOTP(msisdn, otp) {
    const now = new Date();
    expireAfter = 2; //minutes
    const after = date.addMinutes(now, expireAfter);
    var expiry = date.format(after, "YYYY-MM-DD HH:mm:ss");
    var sql = `INSERT INTO otps (msisdn,pin,expiry) VALUES (${msisdn},'${otp}','${expiry}')`;
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
}

function verifyOTP(msisdn, otp, networkType, company, id, req, res) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    var sql = `SELECT * FROM otps WHERE msisdn=${msisdn} AND pin=${otp} AND expiry >= '${current}' ORDER BY id DESC LIMIT 1`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        else {
            result = JSON.parse(JSON.stringify(result));
            //OTP Verified
            if (isset(result[0])) {
                ip = req.connection.remoteAddress;
                eventsOTP(msisdn, "verifiedOTP", ip);
                bussusdk.createAccount(msisdn, networkType, company, id, req, res);
            }
            //NOT Verified OTP
            else {
                res.render("OtpVerify", {
                    otperror: "Invalid OTP",
                    msisdn: msisdn,
                    networkType: networkType,
                    company: company,
                    id: id,
                });
                eventsOTP(msisdn, "invalidOTP");
                jazzsdk.sendOTP(msisdn, networkType, company, id, req, res);
            }
        }
    });
}

function addSubscriber(msisdn, user, password, network_type) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    var sql = `INSERT INTO subscribers (msisdn, user, subscription_date, password,status, network_type)VALUES(${msisdn},${user},'${current}','${password}',${1},${network_type})`;
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
}

function eventsOTP(msisdn, event, ip) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    var sql = `INSERT INTO events (name,msisdn,timestamp,ip)VALUES("${event}",${msisdn},'${current}',"${ip}")`;
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
}

function subscriberCredentials(msisdn, req, res) {
    var sql = `SELECT * FROM subscribers WHERE msisdn=${msisdn}`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        //Exists In Our DB
        if (result[0]) {
            uname = result[0].user;
            pwd = result[0].password;
            jazzsdk.sendCredentials(msisdn, uname, pwd, req, res);
        } else {
            res
                .writeHead(301, {
                    Location: "https://www.busuu.com/en/forgot-password?type=phone",
                })
                .end();
        }
    });
}

function renewPassword(msisdn, pwd, req, res) {
    sql = `UPDATE subscribers SET password = "${pwd}" WHERE msisdn = ${msisdn}`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        //Password Updated and User Existed
        if (result.changedRows != 0) {
            var obj = {
                status: "success",
            };
            return res.status(200).json({ status: "success" });
            // subscriberCredentials(msisdn, req, res);
        }
        //Error Changing Password
        else {
            var obj = {
                status: "error",
            };
            return res.status(404).json({ status: "error" });
        }
    });
}

function subscribeUser(msisdn) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    //sql = `UPDATE subscribers SET status = "1",subscription_date="${current}" WHERE msisdn = ${msisdn}`;
    sql = `UPDATE subscribers SET status = "1" WHERE msisdn = ${msisdn}`;
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
}

function unSubscribeUser(msisdn, req, res) {
    sql = `UPDATE subscribers SET status = "0" WHERE msisdn = ${msisdn}`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.changedRows != 0) {
            var obj = {
                status: "success",
            };
            msc_db.unSubscribeUser(msisdn);
            return res.status(200).json({ status: "success" });
        }
        //Error Changing Password
        else {
            var obj = {
                status: "error",
            };
            return res.status(400).json({ status: "error" });
        }
    });
}

function setPackage(msisdn, pckg, req, res) {
    var plan;
    if (pckg == "jazz-sku-1-day") {
        plan = "daily";
    }
    if (pckg == "jazz-sku-7-days") {
        plan = "weekly";
    }
    if (pckg == "jazz-sku-1-month") {
        plan = "monthly";
    }

    sql = `UPDATE subscribers SET subscriber_type = "${plan}" WHERE msisdn = "${msisdn}"`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function conversionTracking(company, id, yesno, msisdn) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    var sql = `INSERT INTO conversion_tracking (tracking_id, time, conversion, partner,msisdn)VALUES("${id}","${current}",'${yesno}','${company}',"${msisdn}")`;
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
}
exports.addSubscriber = addSubscriber;
exports.subscriberCredentials = subscriberCredentials;
exports.subscribeUser = subscribeUser;
exports.unSubscribeUser = unSubscribeUser;
exports.renewPassword = renewPassword;
exports.setPackage = setPackage;
exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
exports.eventsOTP = eventsOTP;
exports.conversionTracking = conversionTracking;