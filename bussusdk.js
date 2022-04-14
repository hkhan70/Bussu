var axios = require("axios");
var querystring = require("querystring");
const var_dump = require("var_dump");
const date = require("date-and-time");
const rds = require("./rds");
const jazzsdk = require("./jazzsdk");
const msc_db = require("./msc_db");
var ip = require("ip");

function createAccount(msisdn, network_type, company, id, req, res) {
    var postData = querystring.stringify({
        user_identifier: msisdn,
        operator: "jazz",
    });
    let axiosConfig = {
        headers: {
            Authorization: "35ad97b75c9040c385ae603f733dc089",
        },
    };
    axios
        .post("https://partners.busuu.com/jazz/registration", postData, axiosConfig)
        .then((response) => {
            obj = {
                username: response.data.username,
                pwd: response.data.password,
            };
            //Existing Deleted User
            if (obj.pwd == null) {
                if (company && id) {
                    rds.conversionTracking(company, id, "no", msisdn);
                }
                rds.subscribeUser(msisdn);
                msc_db.subscribeUser(msisdn);
                res.render("PackageDetails", {
                    user_status: "deleteduser",
                    msisdn: msisdn,
                    network_type: network_type,
                });
            }
            //First Time User
            else {
                uname = obj.username;
                pwd = obj.pwd;
                rds.addSubscriber(msisdn, uname, pwd, network_type);
                msc_db.addUser(msisdn, uname, pwd, network_type);
                if (company && id) {
                    rds.conversionTracking(company, id, "yes", msisdn);
                }
                res.render("PackageDetails", {
                    user_status: "newuser",
                    msisdn: msisdn,
                    network_type: network_type,
                });
            }
        })
        .catch((err) => {
            obj = {
                status: err.response.data.status,
                detail: err.response.data.detail,
            };
            //Existing Active User
            if ((obj.status = 409)) {
                if (company && id) {
                    rds.conversionTracking(company, id, "no", msisdn);
                }
                rds.subscribeUser(msisdn);
                msc_db.subscribeUser(msisdn);
                rds.subscriberCredentials(msisdn, req, res);
            } else {
                res.render("EnterNumber", {
                    apierror: "Error",
                    status: obj.status,
                    detail: obj.detail,
                    type: "error",
                    company: company,
                    id: id,
                });
            }
        });
}

function createSubscription(msisdn, pckg, user_status, req, res) {
    var postData = querystring.stringify({
        user_identifier: msisdn,
        operator: "jazz",
        sku: pckg,
        operation: "subscribe",
    });

    let axiosConfig = {
        headers: {
            Authorization: "35ad97b75c9040c385ae603f733dc089",
        },
    };

    axios
        .post("https://partners.busuu.com/jazz/notification", postData, axiosConfig)
        .then((response) => {
            obj = {
                data: response.data,
            };
            //Successful Subscription
            if (obj.data == "") {
                rds.setPackage(msisdn, pckg);
                msc_db.setPackageMSC(msisdn, pckg);
                //For Indefinite Subscription
                createSubscription(msisdn, pckg, user_status, req, res);
            }
        })
        .catch((err) => {
            obj = {
                data: err.response.data,
            };
            //Indefinite Subscription Exists
            if ((obj.data.status = 422)) {
                var plan;
                var price;
                if (pckg == "jazz-sku-1-day") {
                    plan = "Daily";
                    price = "4";
                }
                if (pckg == "jazz-sku-7-days") {
                    plan = "Weekly";
                    price = "25";
                }
                if (pckg == "jazz-sku-1-month") {
                    plan = "Monthly";
                    price = "75";
                }
                //Existing Deleted User Restore Password
                if (user_status == "deleteduser") {
                    // ip = ip.address;
                    rds.eventsOTP(msisdn, "resubUser", null);
                    jazzsdk.reSubscriptionSms(msisdn, plan, price);
                    rds.subscriberCredentials(msisdn, req, res);
                }
                //New User
                else {
                    jazzsdk.welcomeSms(msisdn, plan, price);
                    rds.subscriberCredentials(msisdn, req, res);
                }
            } else {
                res.render("EnterNumber", {
                    apierror: "Error",
                    status: obj.data.status,
                    detail: obj.data.detail,
                    type: "error",
                });
            }
        });
}

function deleteAccount(msisdn, req, res) {
    axios
        .delete("https://partners.busuu.com/jazz/registration", {
            headers: {
                Authorization: "35ad97b75c9040c385ae603f733dc089",
            },
            data: {
                user_identifier: msisdn,
                operator: "jazz",
            },
        })
        .then((response) => {
            obj = {
                data: response.data,
            };
            // Deleted User
            if (obj.data == "") {
                rds.unSubscribeUser(msisdn, req, res);
            }
        })
        .catch((err) => {
            obj = {
                status: err.response.data.status,
                detail: err.response.data.detail,
            };
            return res.status(obj.status).json({ detail: obj.detail });
        });
}
exports.createAccount = createAccount;
exports.createSubscription = createSubscription;
exports.deleteAccount = deleteAccount;