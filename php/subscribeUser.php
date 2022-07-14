<?php
require_once "./bussumsc.php";
require_once "./data.php";

if (isset($_GET["msisdn"]) && !empty($_GET["msisdn"]) && isset($_GET["pname"]) && !empty($_GET["pname"]) && isset($_GET["pvalue"]) && !empty($_GET["pvalue"])) {

    $msisdn = $_GET["msisdn"];
    $pname = $_GET["pname"];
    $pvalue = $_GET["pvalue"];

    $result = subscribeUser($msisdn, $pname, $pvalue);
    if ($result["status"] == "success") {
        $result = array("status" => "success");
        echo json_encode($result);
    } else {
        $result = array("status" => "error");
        echo json_encode($result);
    }
} else {
    echo "Enter All Values Pname,Pvalue,Msisdn";
}
