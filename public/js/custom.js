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

$(".digit-group")
    .find("input")
    .each(function() {
        $(this).attr("maxlength", 1);
        $(this).on("keyup", function(e) {
            var parent = $($(this).parent());

            if (e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find("input#" + $(this).data("previous"));

                if (prev.length) {
                    $(prev).select();
                }
            } else if (
                (e.keyCode >= 48 && e.keyCode <= 57) ||
                (e.keyCode >= 65 && e.keyCode <= 90) ||
                (e.keyCode >= 96 && e.keyCode <= 105) ||
                e.keyCode === 39
            ) {
                var next = parent.find("input#" + $(this).data("next"));

                if (next.length) {
                    $(next).select();
                } else {
                    if (parent.data("autosubmit")) {
                        parent.submit();
                    }
                }
            }
        });
    });