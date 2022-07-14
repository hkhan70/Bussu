<?php
require_once "./bussumsc.php";

if (isset($_GET["msisdn"]) && !empty($_GET["msisdn"])) {
    $msisdn = $_GET["msisdn"];
    $result = networkCheck($msisdn);
    if ($result["status"] == "success") {
        $result = array("status" => "success", "network_type" => $result["network_type"]);
        echo json_encode($result);
    } else {
        $result = array("status" => "error");
        echo json_encode($result);
    }
} else {
    echo "Enter Valid MSISDN ";
}
