    <?php
    function generateToken()
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "Authorization" => "",
            'grant type'         => 'client_credentials'
        ));
        curl_setopt($curl, CURLOPT_URL, 'https://apimtest.jazz.com.pk/token');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        $result = curl_exec($curl);
        if (!$result) {
            die("Connection Failure");
        }
        curl_close($curl);
        var_dump($result);
        exit;
    }
    function networkCheck($msisdn)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Authorization'         => '',
            'Content-Type'     => 'Application/json',
        ));
        curl_setopt($curl, CURLOPT_URL, 'https://apimtest.jazz.com.pk/generic/v1.0.0/clientele/' . $msisdn);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        $result = curl_exec($curl);
        if (!$result) {
            die("Connection Failure");
        }
        curl_close($curl);
        var_dump($result);
        exit;
    }
    function subscribeUser($msisdn, $pname, $pvalue)
    {
        $curl = curl_init();
        $data = array(
            "msisdn" => $msisdn,
            "transaction_id" => "",
            "data" => [
                "pname" => $pname,
                "pvalue" => $pvalue
            ]
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Authorization'         => '',
            'Content-Type'     => 'Application/json',
        ));
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($curl, CURLOPT_URL, "https://apimtest.jazz.com.pk/generic/v1.0.0/productSubv2");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        $result = curl_exec($curl);
        if (!$result) {
            die("Connection Failure");
        }
        curl_close($curl);
        var_dump($result);
        exit;
    }
    function unsubscribeUser($msisdn, $pname, $pvalue)
    {
        $curl = curl_init();
        $data = array(
            "msisdn" => $msisdn,
            "transaction_id" => "",
            "data" => [
                "pname" => $pname,
                "pvalue" => $pvalue
            ]
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Authorization'         => '',
            'Content-Type'     => 'Application/json',
        ));
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($curl, CURLOPT_URL, "https://apimtest.jazz.com.pk/generic/v1.0.0/productUnsubv2");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        $result = curl_exec($curl);
        if (!$result) {
            die("Connection Failure");
        }
        curl_close($curl);
        var_dump($result);
        exit;
    }
    generateToken();
