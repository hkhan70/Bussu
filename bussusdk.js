var axios = require("axios");
var querystring = require("querystring");
const var_dump = require("var_dump");
const date = require("date-and-time");
const rds = require("./rds");
const jazzsdk = require("./jazzsdk");
const msc_db = require("./msc_db");

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
                pwd: response.data.pwd,
            };
            //Existing Deleted User
            if (obj.pwd == null) {
                if (company && id) {
                    rds.conversionTracking(company, id, "existinguser", msisdn);
                }
                console.log(network_type);
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
                ip = req.connection.remoteAddress;
                rds.eventsOTP(msisdn, "newUser", ip);
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
                ip = req.connection.remoteAddress;
                if (company && id) {
                    rds.conversionTracking(company, id, "existinguser", msisdn);
                }
                rds.eventsOTP(msisdn, "existingUser", ip);
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
                //Indefinite Subscription
                createSubscription(msisdn, pckg, user_status, req, res);
            }
        })
        .catch((err) => {
            obj = {
                data: err.response.data,
            };
            //Indefinite Subscription
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
                jazzsdk.welcomeSms(msisdn, plan, price);
                if (user_status == "deleteduser") {
                    res
                        .writeHead(301, {
                            Location: "https://www.busuu.com/en/forgot-password?type=phone",
                        })
                        .end();
                } else {
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
        .delete(
            "https://partners.busuu.com/jazz/registration",
            postData,
            axiosConfig
        )
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