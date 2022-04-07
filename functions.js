const fs = require("fs");
const date = require("date-and-time");

function hitlogs(company, id) {
    const now = new Date();
    current = date.format(now, "YYYY-MM-DD HH:mm:ss");
    data = current + " " + company + " " + id + "\n";
    fs.appendFile("files/hitlogs.txt", data, function(err) {
        if (err) throw err;
    });
}

exports.hitlogs = hitlogs;