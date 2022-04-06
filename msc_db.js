var mysql = require("mysql");
const date = require("date-and-time");
const isset = require("isset");
const jazzsdk = require("./jazzsdk");
const bussusdk = require("./bussusdk");
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
    var sql = `INSERT INTO subscribers (msisdn, user, subscription_date, password,status, network_type,last_billed_date)VALUES(${msisdn},${user},'${current}','${password}',${1},${network_type},'${current}')`;
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

function unSubscribeUser(msisdn) {
    sql = `UPDATE subscribers SET status = "0" WHERE msisdn = ${msisdn}`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.changedRows != 0) {
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(400).json({ status: "error" });
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
        console.log(result);
    });
}

exports.subscribeUser = subscribeUser;
exports.unSubscribeUser = unSubscribeUser;
exports.addUser = addUser;
exports.setPackageMSC = setPackageMSC;