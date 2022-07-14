<?php

use Medoo\Medoo;

// Initialize
$database = new Medoo([
	'database_type' => 'mysql',
	'database_name' => "bussu",
	'server' => "127.0.0.1:3306",
	'username' => "",
	'password' => "",
]);

date_default_timezone_set('Asia/Karachi');
$date = date('Y-m-d h:i:s');

function findUser($msisdn)
{
	global $database;
	$data = $database->select("subscribers", "*", ["msisdn" => $msisdn]);
	if (sizeof($data) > 0) {
		return $data[0];
	}
	return False;
}


function addUser($msisdn, $user, $password, $method, $type, $network_type)
{
	global $database;
	global $date;
	$check = findUser($msisdn);
	if ($check) {
		return True;
	}
	$data = $database->insert("subscribers", [
		"msisdn" => $msisdn,
		"user" => $user,
		"password" => $password,
		"subscription_method" => $method,
		"subscriber_type" => $type,
		"network_type" => $network_type,
		"status" => "1",
	]);
}

function unsubscribeUser($msisdn)
{
	global $database;
	global $date;
	$data = $database->update("subscribers", ["status" => 2], ["msisdn" => $msisdn])->rowCount();
	if ((int) $data > 0) {
		$data = $database->insert("events", [
			"msisdn" => $msisdn,
			"timestamp" => $date,
			"name" => "unSubscribed",

		]);
	}
	return False;
}

function resubscribeUser($msisdn)
{
	global $database;
	$check = findUser($msisdn);
	if ($check["status"] === "2") {
		$data = $database->update("subscribers", ["status" => 1], ["msisdn" => $msisdn])->rowCount();
	}
	if ((int) $data > 0) {
		postEvent($msisdn);
		return $data;
	}
	return False;
}

function updatePackage($msisdn, $package)
{
	global $database;
	$data = $database->update("subscribers", ["subscriber_type" => $package], ["msisdn" => $msisdn])->rowCount();
	if ((int) $data > 0) {
		return $data;
	}
	return False;
}
