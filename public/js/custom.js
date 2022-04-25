//LIMIT NUMERIC INPUT ONLY
function onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
}

var interval;
//TIMER IN OTP 1 MIN
function countdown() {
    clearInterval(interval);
    interval = setInterval(function() {
        var timer = $(".js-timeout").html();
        timer = timer.split(":");
        var minutes = timer[0];
        var seconds = timer[1];
        seconds -= 1;
        if (minutes < 0) return;
        else if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        } else if (seconds < 10 && length.seconds != 2) seconds = "0" + seconds;

        $(".js-timeout").html(minutes + ":" + seconds);

        if (minutes == 0 && seconds == 0) clearInterval(interval);
    }, 1000);
}

$("#js-startTimer").ready(function() {
    $(".js-timeout").text("1:00");
    countdown();
});

//AUTO SUBMIT OTP ON ENTERING
function submitOTP() {
    document.getElementById("submitotp").submit();
    document.getElementById("otpbtn").disabled = true;
    document.getElementById("otpbtn").style.backgroundColor = "#797979";
}
//RESEND OTP AFTER 1 MIN
window.onload = function() {
    window.setTimeout("resendotp()", 60000);
};

function resendotp() {
    document.getElementById("resendotp").submit();
}

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

let digitValidate = function(ele) {
    console.log(ele.value);
    ele.value = ele.value.replace(/[^0-9]/g, "");
};

let tabChange = function(val) {
    let ele = document.querySelectorAll("input");
    if (ele[val - 1].value != "") {
        ele[val].focus();
    } else if (ele[val - 1].value == "") {
        ele[val - 2].focus();
    }
};