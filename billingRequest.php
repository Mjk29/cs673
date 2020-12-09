<?php

// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

// echo "string";

$postype = $_POST["POSTTYPE"];
// $postype = "queryForBills";

// echo $postype;

switch ($postype) {
   // creates tsv file for download
	case "getAllICD10":
		getICD10(0);
		break;

   // Switches the transaction to completed
	case "getTopICD10":
	// echo "$$$$$$$$$$$$$$$$$$$";
		getICD10(1);
		// executeQuery($query);
		break;

	case "getTopCPT":
		// "CALL mjk29.getAllCPTCode()"

		getCPT(0);
		break;

	case "getAllCPT":
		// "CALL mjk29.getAllCPTCode()"
		getCPT(1);
		break;

	case "queryForBills":
		getBills($_POST["ARGS"]);
		break;

	case "getBillInfo":
		getBillInfo($_POST["ARGS"]);
		break;

	case "getDataFromGroup5":
		getDataFromGroup5();
		break;

	case 'getPatientInfoFromPatientID':
		getPatientInfoFromPatientID($_POST["ARGS"]);
		break;

	case 'submitBill':
		submitBillFunction($_POST["ARGS"]);
		break;

	case 'changeBillState':
		changeBillState($_POST["ARGS"]);
		break;

}
exit();




function changeBillState($changeStateArgs){

	$queryString = sprintf("CALL mjk29.changeBillState('%s','%s')",$changeStateArgs["bill_id"], $changeStateArgs["new_state"]); 


	try{

	$queryResult =executeQueryInsert($queryString);
		$returnJSON = json_encode($queryResult);
		echo $returnJSON;
	}catch (Exception $e){
 		echo 'Caught exception: ',  $e->getMessage(), "\n";
 		// echo "asdasdasd";
	}


}



function submitBillFunction($billFields){
	// echo 'submitBillFunction';
	// var_dump($billFields);


	// echo $billFields["patient_id"];	

	$queryString = sprintf("CALL mjk29.insertNewBillData ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')", 
	$billFields["patient_id"],
	$billFields["patient_first_name"],
	$billFields["patient_middle_name"],
	$billFields["patient_last_name"],
	$billFields["patient_contact_number"],
	$billFields["patient_emailid"],
	$billFields["patient_sex"],
	$billFields["patient_ssn"],
	$billFields["patient_dob"],
	$billFields["patient_address_line_1"],
	$billFields["patient_address_city"],
	$billFields["patient_address_state"],
	$billFields["patient_address_line_2"],
	$billFields["patient_zip_code"],
	$billFields["patient_insurance_id"],
	$billFields["insurance_company_name"],
	$billFields["insurance_group_number"],
	$billFields["insurance_plan_name"],
	$billFields["insurance_contact_number"],
	$billFields["insurance_pharmacy_network"],
	$billFields["billing_notes"],
	$billFields["icd10_input0"],
	$billFields["icd10_price0"],
	$billFields["icd10_input1"],
	$billFields["icd10_price1"],
	$billFields["icd10_input2"],
	$billFields["icd10_price2"],
	$billFields["icd10_input3"],
	$billFields["icd10_price3"],
	$billFields["icd10_input4"],
	$billFields["icd10_price4"],
	$billFields["icd10_input5"],
	$billFields["icd10_price5"],
	$billFields["icd10_input6"],
	$billFields["icd10_price6"],
	$billFields["icd10_input7"],
	$billFields["icd10_price7"],
	$billFields["icd10_input8"],
	$billFields["icd10_price8"],
	$billFields["icd10_input9"],
	$billFields["icd10_price9"],
	$billFields["cpt_input0"],
	$billFields["cpt_price0"],
	$billFields["cpt_input1"],
	$billFields["cpt_price1"],
	$billFields["cpt_input2"],
	$billFields["cpt_price2"],
	$billFields["cpt_input3"],
	$billFields["cpt_price3"],
	$billFields["cpt_input4"],
	$billFields["cpt_price4"],
	$billFields["cpt_input5"],
	$billFields["cpt_price5"],
	$billFields["cpt_input6"],
	$billFields["cpt_price6"],
	$billFields["cpt_input7"],
	$billFields["cpt_price7"],
	$billFields["cpt_input8"],
	$billFields["cpt_price8"],
	$billFields["cpt_input9"],
	$billFields["cpt_price9"],
	$billFields["otherExpense_code0"],
	$billFields["otherExpense_price0"],
	$billFields["otherExpense_code1"],
	$billFields["otherExpense_price1"],
	$billFields["otherExpense_code2"],
	$billFields["otherExpense_price2"],
	$billFields["otherExpense_code3"],
	$billFields["otherExpense_price3"],
	$billFields["otherExpense_code4"],
	$billFields["otherExpense_price4"],
	$billFields["otherExpense_code5"],
	$billFields["otherExpense_price5"],
	$billFields["otherExpense_code6"],
	$billFields["otherExpense_price6"],
	$billFields["otherExpense_code7"],
	$billFields["otherExpense_price7"],
	$billFields["otherExpense_code8"],
	$billFields["otherExpense_price8"],
	$billFields["otherExpense_code9"],
	$billFields["otherExpense_price9"]
	);

	// $queryString = "SELECT NOW()";

	// var_dump($queryString);

	// var_dump(executeQuery("SELECT NOW()"));

	// $getCount = $_POST["COUNT"];
	// if ($allFlag == 0) {
	// 	$queryString = sprintf("CALL mjk29.getTopNCPTCode(%u)", $getCount);
	// 	// echo "ALL FLAG IS 0";
	// }
	// else{
	// 	$queryString = "CALL mjk29.getAllCPTCode()";
	// 	// echo "ALL FLAG IS 1";
	// }
	// // echo $queryString;

	try{

		$queryResult =executeQueryInsert($queryString);
		$returnJSON = json_encode($queryResult);
		echo $returnJSON;
	}catch (Exception $e){
 		echo 'Caught exception: ',  $e->getMessage(), "\n";
 		// echo "asdasdasd";
	}

	// $queryString ="CALL mjk29.getTopNBillsFilterIsPaid(500,1)";


	// try{
	// 	echo "string";
	// 	// $queryResult = executeQuery("CALL mjk29.insertNewBillData ('56','Clint','H','Barton','9994561212','hawk@avenge.com','M','78124565','1971-09-05','Somewhere','New York','NY','','10010','00011211','Avengers','00011211','Universal','4445556541','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','')");

	// }catch{
 // 		// echo 'Caught exception: ',  $e->getMessage(), "\n";
 // 		echo "asdasdasd";
	// }



	// $queryResult = executeQuery("SELECT NOW()");
	// echo "ASOIDNASODIJN";
	// $queryResult = executeQuery($queryString);
	// $returnJSON = json_encode($queryResult);
	// echo $returnJSON;




}




function getPatientInfoFromPatientID($patientID){
	// echo "getPatientInfoFromPatientID FUNCTION";
	
	$echoObject = array();

	$sendData = array(
		"Token" => "xD9NzRSY3e5akTxhum00",
		"Type" => "APIR",
		"Data" => array()
	);

	$url = 'https://web.njit.edu/~as2757/ControlPatientIntake/api.php';
	$data = json_encode($sendData);

	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => $data
		)
	);

	$context  = stream_context_create($options);
	$resultAll = file_get_contents($url, false, $context);
	
	// echo $result->"Status";
	// echo json_decode($result);


	$idExists = checkIfIDExistsInAllPatientData(json_decode($resultAll), $patientID);
	// echo $idExists;

	if ($idExists == 1) {
		$sendData = array(
			"Token" => "xD9NzRSY3e5akTxhum00",
			"Type" => "SPIRBPID",
			"Data" => array(patient_id=>$patientID)
		);

		$url = 'https://web.njit.edu/~as2757/ControlPatientIntake/api.php';
		$data = json_encode($sendData);

		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => $data
			)
		);

		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);



		$insuranceID = json_decode($result)->ReturnData->patient_insurance_id;

		// echo $insuranceID;

		$echoObject["patientIDInfo"] = json_decode($result);
		// echo json_encode($echoObject);



		$sendData = array(
			"Token" => "xD9NzRSY3e5akTxhum00",
			"Type" => "SPIIR",
			"Data" => array(insurance_id =>$insuranceID)
		);

		$url = 'https://web.njit.edu/~as2757/ControlPatientIntake/api.php';
		$data = json_encode($sendData);

		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => $data
			)
		);

		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);

		$echoObject["patientInsuranceInfo"] = json_decode($result);

		echo json_encode($echoObject);




	}


	else{
		echo json_encode(array("error"=>"Unable to locate Patient ID"));

	}

	// $ass = json_decode($result);
 	// echo (json_last_error() == JSON_ERROR_NONE);
 	// var_dump($ass);
 	// echo $ass->ReturnData->patients[0]->patient_emailid;




 	// foreach ($ass->ReturnData->patients as $patient) {
 	// 	if ($patient->patient_id == $patientID) {
 	// 		echo "MATCHING ID".$patient->patient_id;
 	// 		echo($patient);
 	// 	}
 		
 	// 	// echo $patient->patient_id;
 	// 	// echo "  ";
 	// 	// echo "string";
 	// 	// var_dump($patient);
 	// }

	// echo gettype($result);
	// var_dump($result);

	// echo $result->ReturnData;

	// $decodedResult = json_decode($result);


	// echo gettype($decodedResult);

	// echo $decodedResult;

	// echo $decodedResult;

	// echo json_decode($result);

}


function checkIfIDExistsInAllPatientData($patientDataJSON, $patientID){
	foreach ($patientDataJSON->ReturnData->patients as $patient) {
 		if ($patient->patient_id == $patientID) {
 			return 1;
 		}
	}
	return 0;
}




function getDataFromGroup5(){
	$sendData = array(
		"Token" => "xD9NzRSY3e5akTxhum00",
		"Type" => "APIR",
		"Data" => array()
	);
	// echo "testRequestGrp5 PHP ";


	// $sendData = array(
	// 	"Token" => "xD9NzRSY3e5akTxhum00",
	// 	"Type" => "SPIIR",
	// 	"Data" => array("insurance_id" => "95248532")
	// );

// Make $data into a json-string and send POST request to the API
	$url = 'https://web.njit.edu/~as2757/ControlPatientIntake/api.php';
	$data = json_encode($sendData);

	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => $data
		)
	);

	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	echo $result;
}




function getBillInfo($billID){
	
	$queryString = sprintf("CALL mjk29.getBillInspection(%s)", $billID);
	$queryResult = executeQuery($queryString);
	$returnJSON = json_encode($queryResult);
	echo $returnJSON;


}



function getBills($billType){

	// switch ($billType) {  
		// case "IS_PAID_TRUE":			
	$queryString =sprintf("CALL mjk29.getTopNBillsFilterIsPaid(500,'%s')", $billType);
			// break;
	// }



	$queryResult =executeQuery($queryString);
	$returnJSON = json_encode($queryResult);
	echo $returnJSON;




}




function getCPT($allFlag){
// echo "GET TOP CPT FUNCTIOn";
	$getCount = $_POST["COUNT"];
	if ($allFlag == 0) {
		$queryString = sprintf("CALL mjk29.getTopNCPTCode(%u)", $getCount);
		// echo "ALL FLAG IS 0";
	}
	else{
		$queryString = "CALL mjk29.getAllCPTCode()";
		// echo "ALL FLAG IS 1";
	}
	// echo $queryString;

	$queryResult =executeQuery($queryString);
	$returnJSON = json_encode($queryResult);
	echo $returnJSON;
}



	// CALL mjk29.getTopNICDCode(25)


function getICD10($allFlag)
{
	// echo "getICD10 function : ".$allFlag."\n";


	// $sqlQuery = "CALL mjk29.getAllICD10Code()";
	$sqlQuery = "CALL mjk29.getTopNICDCode(25)";


	$queryResult = executeQuery($sqlQuery);

	// echo $queryResult;

	$returnJSON = json_encode($queryResult);
	echo $returnJSON;
}





function executeQueryInsert($queryString){

	$host = 'sql2.njit.edu';
	$db   = 'mjk29';
	$user = 'mjk29';
	$pass = 'DeskSeltzer5687!';
	$charset = 'utf8mb4';

	$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
	$options = [
	    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	    PDO::ATTR_EMULATE_PREPARES   => false,
	];
	try {
	     $pdo = new PDO($dsn, $user, $pass, $options);
	} catch (\PDOException $e) {
	     throw new \PDOException($e->getMessage(), (int)$e->getCode());
	}


	try{
		$stmt= $pdo->prepare($queryString);
		$stmt->bindParam(1, $return_value, PDO::PARAM_STR, 4000); 
		$stmt->execute();
		// return "some value"
		return "Bill Successfully submitted";
	}catch (\PDOException $e) {
	     // return ''.\PDOException($e->getMessage().(int)$e->getCode());
	     return "Bill submission unsuccessful.";
	}

	// return $stmt;


}



function executeQuery($queryString){
	// echo "PDO TEST";
	// echo $queryString;
	// $dbConn = new mysqli("sql2.njit.edu", "mjk29", "DeskSeltzer5687!");
	$host = 'sql2.njit.edu';
	$db   = 'mjk29';
	$user = 'mjk29';
	$pass = 'DeskSeltzer5687!';
	$charset = 'utf8mb4';

	$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
	$options = [
	    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	    PDO::ATTR_EMULATE_PREPARES   => false,
	];
	try {
	     $pdo = new PDO($dsn, $user, $pass, $options);
	} catch (\PDOException $e) {
	     throw new \PDOException($e->getMessage(), (int)$e->getCode());
	}



	// $stmt= $pdo->query('CALL mjk29.getTopNICDCode(100)')->fetchAll(PDO::FETCH_ASSOC);
	$stmt= $pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);
	// $stmt= $pdo->query('CALL mjk29.getAllCPTCode()')->fetchAll(PDO::FETCH_ASSOC);
	return $stmt;

	// $stmt= $pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);

	// echo json_encode($stmt);	
	// while ($row = $stmt->fetch())
	// {
	//     // echo $row['name'] . "\n";
	//     var_dump($row);
	// }

}




function executeDBScript($script){   
	// echo "executeDBScriptFunction";
	$dbConn = sqlConnect();
	// $dbConn = new mysqli("sql2.njit.edu", "mjk29", "DeskSeltzer5687!");

	// var_dump($dbConn);

	// $qwe="select count(*) from ICD_10_CODE_TABLE;";
	// $sqlQuery = "CALL mjk29.getAllICD10Code()";
	// $sqlQuery = "CALL mjk29.getTopNICDCode(10)";
	// getTopNICDCode(25)


	// echo "-123123-";
	$result = $dbConn->query($script);
	// echo $result;
	// echo "@@@";
	// return $result;

	if ($result->num_rows > 0) {
  // output data of each row
		while($row = $result->fetch_assoc()) {
			var_dump($row) ;
    // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
		}
	} else {
		echo "0 results";
	}


}





// var_dump(sqlConnect());
// sqlConnect();
// connectTest();

function sqlConnect(){
	$dbConn = new mysqli("sql2.njit.edu", "mjk29", "DeskSeltzer5687!");

    // Check connection
	if ($dbConn->connect_error) {
		echo "Connection to database failed";
		die("Connection failed: " . $conn->connect_error);
	}
	else{
		// echo "Connected successfully";
		return $dbConn;
	}
}





function connectTest()
{
	echo "testDB function2";
	$conn = new mysqli("sql2.njit.edu", "mjk29", "DeskSeltzer5687!");

      // Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	echo "Connected successfully";




	$selectTest = "SELECT * 
	FROM mjk29.BILL_TABLE ";
   // bt 
   // JOIN CPT_BILLING cb on bt.BILL_ID = cb.BILL_ID 
   // JOIN ICD10_BILLING ib on bt.BILL_ID = ib.BILL_ID
   // JOIN ICD_10_CODE_TABLE ict on ib.FULL_CODE =ict.FULL_CODE 
   // JOIN CPT_CODE_TABLE cct on cb.CPT_CODE = cct.CPT_CODE;";


	$result = $conn->query($selectTest);

	if ($result->num_rows > 0) {
  // output data of each row
		while($row = $result->fetch_assoc()) {
			var_dump($row) ;
    // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
		}
	} else {
		echo "0 results";
	}





}







?>




<html>
<body>

   <!--    <form action = "<?php $_PHP_SELF ?>" method = "GET">
         Name: <input type = "text" name = "name" />
         Age: <input type = "text" name = "age" />
         <input type = "submit" />
     </form> -->

 </body>
 </html>