var mysql = require("mysql");
const date = require("date-and-time");
const isset = require("isset");
const jazzsdk = require("./jazzsdk");
const bussusdk = require("./bussusdk");
const rds = require("./rds");
const fs = require("fs");
var ip = require("ip");

var con = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "bussu_msc",
});

function addUser(msisdn, user, password, network_type) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    var sql = `INSERT INTO subscribers (msisdn, user, subscription_date, password,status, network_type)VALUES(${msisdn},${user},'${current}','${password}',${1},${network_type})`;
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
}

function subscribeUser(msisdn) {
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
        else {
            ip = req.ip;
            rds.eventsOTP(msisdn, "unsubUser", ip);
            jazzsdk.unsubSms(msisdn);
            return res.status(200).json({ detail: "Unsubscribed Successfully" });
        }
    });
}

function setPackageMSC(msisdn, pckg, req, res) {
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
    });
}

exports.subscribeUser = subscribeUser;
exports.unSubscribeUser = unSubscribeUser;
exports.addUser = addUser;
exports.setPackageMSC = setPackageMSC;