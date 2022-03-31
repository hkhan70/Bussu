var axios = require("axios");
var querystring = require("querystring");
const var_dump = require("var_dump");
const date = require("date-and-time");
const rds = require("./rds");

function createAccount(msisdn, network_type, req, res) {
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
                rds.subscribeUser(msisdn);
                res
                    .writeHead(301, {
                        Location: "https://www.busuu.com/en/forgot-password?type=phone",
                    })
                    .end();
            }
            //First Time User
            else {
                rds.addSubscriber(msisdn, uname, pwd, network_type, req, res);
                res.render("PackageDetails", {
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
                rds.subscribeUser(msisdn);
                rds.subscriberCredentials(msisdn, req, res);
            } else {
                res.render("EnterNumber", {
                    apierror: "Error",
                    status: obj.status,
                    detail: obj.detail,
                    type: "error",
                });
            }
        });
}

function createSubscription(msisdn, pckg, req, res) {
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
                //Indefinite Subscription
                createSubscription(msisdn, pckg, req, res);
            }
        })
        .catch((err) => {
            obj = {
                data: err.response.data,
            };
            //Indefinite Subscription
            if ((obj.data.status = 422)) {
                rds.subscriberCredentials(msisdn, req, res);
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
                var_dump("Deleted");
            }
        })
        .catch((err) => {
            obj = {
                status: err.response.data.status,
                detail: err.response.data.detail,
            };
            var_dump("Not Deleted", obj);
        });
}
exports.createAccount = createAccount;
exports.createSubscription = createSubscription;
exports.deleteAccount = deleteAccount;